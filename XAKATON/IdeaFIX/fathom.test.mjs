import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {verifyFathom,normalizeFathom,handleFathom,receiveFathom} from './fathom.mjs';
const secret='whsec_'+Buffer.from('test-secret-long-enough').toString('base64');
const raw=JSON.stringify({recording_id:42,title:'Real meeting',default_summary:{markdown_formatted:'Summary'},transcript:[{speaker:{display_name:'Dani'},timestamp:'00:01:02',text:'An idea'}]});
const ts=String(Math.floor(Date.now()/1000));
const headers={'webhook-id':'msg_test','webhook-timestamp':ts};
headers['webhook-signature']='v1,'+createHmac('sha256',Buffer.from(secret.slice(6),'base64')).update(`msg_test.${ts}.${raw}`).digest('base64');
const fail=(status,message)=>{throw Object.assign(new Error(message),{status})};
test('authentic raw webhook accepted; tampering, old timestamps and missing headers rejected',()=>{
 assert.equal(verifyFathom(secret,headers,raw),true);
 assert.equal(verifyFathom(secret,headers,raw+' '),false);
 assert.equal(verifyFathom(secret,headers,raw,Date.now()+3600000),false);
 assert.equal(verifyFathom(secret,{},raw),false);
 assert.equal(verifyFathom(secret,{...headers,'webhook-signature':'v1,a'},raw),false);
});
test('normalization preserves summary and speakers, permits absent premium actions and rejects unsafe links',()=>{
 const b=normalizeFathom({...JSON.parse(raw),url:'javascript:alert(1)'});
 assert.equal(b.summary,'Summary');assert.equal(b.transcript[0].speaker,'Dani');assert.deepEqual(b.action_items,[]);assert.equal(b.source_url,'');
 assert.throws(()=>normalizeFathom({title:'No id'}));
});
test('unauthenticated or employee accounts cannot browse recordings',async()=>{
 for(const u of [null,{role:'employee'}])await assert.rejects(handleFathom({url:new URL('http://x/api/fathom/recordings'),req:{method:'GET'},u,fail}),{status:403});
});
test('signature is checked before database insert',async()=>{
 const writes=[];const query=async(sql)=>{writes.push(sql);return {rows:[{owner:'a',secret}]}};
 const req={method:'POST',headers:{},async *[Symbol.asyncIterator](){yield raw}};
 await assert.rejects(receiveFathom({url:new URL('http://x/api/fathom/webhook/'+'a'.repeat(48)),req,query,fail}),{status:401});assert.equal(writes.length,1);
});
test('signed receipt upserts by owner and recording, without creating tasks or ideas',async()=>{
 const writes=[];const query=async(sql,p)=>{writes.push([sql,p]);return {rows:[{owner:'a',secret}]}};
 let sent;await receiveFathom({url:new URL('http://x/api/fathom/webhook/'+'a'.repeat(48)),req:{method:'POST',headers,async *[Symbol.asyncIterator](){yield raw}},query,fail,send:v=>sent=v});
 assert.equal(sent.ok,true);assert.match(writes[1][0],/ON CONFLICT\(owner,recording_id\)/);assert.equal(writes[1][1][0],'a');assert.equal(writes.length,3);
});
test('recordings owned by other users are not returned',async()=>{
 await assert.rejects(handleFathom({url:new URL('http://x/api/fathom/recordings/3'),req:{method:'GET'},u:{role:'lead',id:'b'},query:async(sql,p)=>{assert.equal(p[1],'b');return {rows:[]}},fail}),{status:404});
});
test('saving an idea requires explicit publication and keeps transaction atomic',async()=>{
 const log=[];let released=false;
 const client={query:async(sql,p)=>{log.push([sql,p]);return {rows:sql.includes('INSERT INTO ideafix.tickets')?[{id:8}]:[]}},release(){released=true}};
 let sent;
 await handleFathom({url:new URL('http://x/api/fathom/recordings/3/save'),req:{method:'POST'},u:{role:'lead',id:'a',department:'ИТ'},body:async()=>({kind:'idea',title:'Новая идея',description:'Цитата с совещания'}),query:async()=>({rows:[{id:3,owner:'a',title:'Meeting',source_url:'https://fathom.video/x'}]}),pool:{connect:async()=>client},send:v=>sent=v,fail});
 const insert=log.find(([sql])=>sql.includes('INSERT INTO ideafix.tickets'));assert.equal(insert[1][4],false);assert.equal(log[0][0],'BEGIN');assert.match(log[1][0],/FOR UPDATE/);assert.equal(log.at(-1)[0],'COMMIT');assert.equal(sent.id,8);assert.equal(released,true);
});
test('repeat save returns original result without another task',async()=>{
 const log=[];const client={query:async(sql)=>{log.push(sql);return {rows:sql.includes('SELECT target_id')?[{target_id:9}]:[]}},release(){}};
 let sent;await handleFathom({url:new URL('http://x/api/fathom/recordings/3/save'),req:{method:'POST'},u:{role:'lead',id:'a'},body:async()=>({kind:'task',title:'Follow up',description:'Source',planned_for:'2026-11-13'}),query:async()=>({rows:[{id:3,owner:'a',title:'Meeting',source_url:''}]}),pool:{connect:async()=>client},send:v=>sent=v,fail});
 assert.equal(sent.already_saved,true);assert.equal(sent.id,9);assert.equal(log.some(s=>s.includes('INSERT INTO ideafix.planner_tasks')),false);
});
