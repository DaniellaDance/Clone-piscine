import {test} from 'node:test';
import assert from 'node:assert/strict';
import {addBusinessMinutes,businessDaysBetween,median,similarity,clusters,analytics,handleUpgrade} from './upgrade.mjs';
test('business SLA skips Saturday/Sunday in Almaty and preserves minute precision',()=>{
 assert.equal(addBusinessMinutes('2026-11-13T12:00:00Z',1440).toISOString(),'2026-11-16T12:00:00.000Z');
 assert.equal(addBusinessMinutes('2026-11-13T18:58:00Z',5).toISOString(),'2026-11-15T19:03:00.000Z');
 assert.equal(addBusinessMinutes('2026-11-14T12:00:00Z',5).toISOString(),'2026-11-15T19:05:00.000Z');
 assert.equal(businessDaysBetween('2026-11-13T12:00:00Z','2026-11-16T12:00:00Z'),1);
 assert.throws(()=>addBusinessMinutes('bad',5));
});
test('median and analytics distinguish missing historical dates from zero',()=>{
 assert.equal(median([]),null);assert.equal(median([3,1,2,8]),2.5);
 const a=analytics([{id:1,title:'Настройка склада',body:'Остатки склада не совпадают с учетом',department:'Склад',kind:'problem',created:'2026-11-12T10:00Z',first_response:'2026-11-13T10:00Z',due:'2026-11-18T10:00Z',status:'done',result:'Настроен учет',resolved_at:null}],new Date('2026-11-17T10:00Z'));
 assert.equal(a.reviewedPercent,100);assert.equal(a.resolutionMedian,null);assert.equal(a.firstResponseMedian,1);
});
test('similarity normalizes tokens; clusters count departments and omit unrelated topics',()=>{
 assert(similarity('Предлагаю настроить учет остатков на складе','Настроить учет остатков склада')>.4);
 assert.equal(similarity('','something'),0);
 const a=clusters([{id:1,body:'Учет остатков склада не совпадает',title:'Учет склада',department:'Склад'},{id:2,body:'Не совпадает учет остатков склада',title:'Остатки',department:'ИТ'},{id:3,body:'Нужно обучение английскому языку',department:'HR'}]);assert.equal(a.length,1);assert.equal(a[0].count,2);assert.equal(a[0].departments.length,2);
});
const base={url:new URL('https://test/api/upgrade/analytics'),req:{method:'GET'},u:{id:'employee',role:'employee',department:'ИТ'},fail:(status,message)=>{throw Object.assign(new Error(message),{status})},query:async()=>{throw Error('Should not query before access check')},send:x=>x};
test('analytics, routing and outbox enforce server-side roles before data access',async()=>{
 for(const path of ['analytics','routing','integration-log'])await assert.rejects(handleUpgrade({...base,url:new URL('https://test/api/upgrade/'+path)}),e=>e.status===403);
});
test('joining a duplicate cannot reveal an inaccessible ticket',async()=>{
 await assert.rejects(handleUpgrade({...base,url:new URL('https://test/api/upgrade/tickets/7/join'),req:{method:'POST'},ticket:async()=>({id:7,published:true}),visible:()=>false}),e=>e.status===404);
});

test('outbox retries failures with bounded backoff and never pretends delivery succeeded',async()=>{
 const {processOutbox}=await import('./upgrade.mjs');const writes=[];
 const query=async(sql,p)=>{writes.push({sql,p});return {rows:sql.includes('WITH ready')?[{id:7,ticket:1,event:'status',attempts:2}]:[]}};
 await processOutbox(query,async()=>{throw Error('transport unavailable')});assert.ok(writes[1].sql.includes("THEN 'failed' ELSE 'prepared'"));assert.equal(writes[1].p[1],120);assert.ok(!writes[1].sql.includes("status='sent'"));
});

test('improvements use completion time, with undated legacy rows last and stable tie breaks',async()=>{
 const {sortImprovements}=await import('./upgrade.mjs');
 const rows=[{id:1,created:'2026-11-13',resolved_at:null},{id:2,created:'2026-10-01',resolved_at:'2026-11-12T12:00Z'},{id:3,created:'2026-09-01',resolved_at:'2026-11-13T12:00Z'},{id:4,created:'2026-11-12',resolved_at:null}];
 assert.deepEqual(sortImprovements(rows).map(x=>x.id),[3,2,1,4]);assert.deepEqual(rows.map(x=>x.id),[1,2,3,4]);
});
