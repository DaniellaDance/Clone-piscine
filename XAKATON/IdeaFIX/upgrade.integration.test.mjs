import {test} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID,randomBytes,createHash} from 'node:crypto';
import pg from 'pg';
import {addBusinessMinutes,sweepOverdue,processOutbox} from './upgrade.mjs';
test('complete upgrade workflow on isolated Neon branch',{skip:!process.env.TEST_DATABASE_URL},async()=>{
 process.env.NEON_FUNCTION='1';process.env.DATABASE_URL=process.env.TEST_DATABASE_URL;
 const {init,closeUpgrade}=await import('./server.mjs');console.log('Upgrade test: initializing isolated schema');try{await init()}catch(e){await closeUpgrade();throw e}console.log('Upgrade test: schema ready');
 const adapter=(await import('./function-adapter.mjs')).default;
 const db=new pg.Pool({connectionString:process.env.TEST_DATABASE_URL,connectionTimeoutMillis:15000,query_timeout:30000});const users={};const prefix='upgrade-test-'+randomUUID();
 try{
  const exact=(await db.query("SELECT ideafix.business_due('2026-11-13T18:58:00.123456Z',14400) AS due")).rows[0].due;assert.equal(exact.toISOString(),'2026-11-27T18:58:00.123Z');
  for(const [name,role,department] of [['director','director','Руководство'],['lead','lead','ИТ'],['backup','lead','ИТ'],['author','employee','ИТ'],['peer','employee','ИТ'],['outsider','employee','HR']]){
   const id=prefix+name,token=randomBytes(32).toString('hex');await db.query('INSERT INTO ideafix.users(id,login,name,password,role,department) VALUES($1,$1,$2,$3,$4,$5)',[id,'UPGRADE TEST '+name,'disabled-test-password',role,department]);await db.query("INSERT INTO ideafix.sessions VALUES($1,$2,now()+interval '1 hour')",[createHash('sha256').update(token).digest('hex'),id]);users[name]={id,token};
  }
  const call=async(name,path,data,method=data?'POST':'GET')=>{const r=await adapter.fetch(new Request('https://test.invalid/api'+path,{method,headers:{cookie:'if_session='+users[name].token,...(data?{'content-type':'application/json'}:{})},...(data?{body:JSON.stringify(data)}:{})}));return {status:r.status,data:await r.json()}};
  await db.query('INSERT INTO ideafix.translations(user_id,language,source_hash,translated) VALUES($1,$2,$3,$4)',[users.author.id,'en',createHash('sha256').update('v1\0Пилот склада').digest('hex'),'Warehouse pilot']);
  const translated=await call('author','/translate',{language:'en',texts:['Пилот склада']});assert.equal(translated.status,200);assert.deepEqual(translated.data.translations,['Warehouse pilot']);
  const rule=await call('director','/upgrade/routing',{department:'ИТ',kind:'problem',owner:users.lead.id,backup:users.backup.id,response_days:2,resolution_days:10},'PUT');assert.equal(rule.status,200);
  await call('director','/upgrade/availability',{user_id:users.lead.id,until:new Date(Date.now()+86400000).toISOString()},'PUT');
  const created=await call('author','/tickets',{body:'На тестовом складе остатки не совпадают с учетом товаров',kind:'problem',department:'ИТ',visibility:'leaders',entry_type:'request'});assert.equal(created.status,201);
  let ticket=(await call('author','/tickets/'+created.data.id)).data;assert.equal(ticket.assignee_id,users.backup.id);assert.match(ticket.assignment_reason,/Замещающий/);assert.ok(ticket.version>=1);assert.equal(new Date(ticket.due).toISOString(),addBusinessMinutes(ticket.created,14400).toISOString());
  assert.equal((await call('outsider','/tickets/'+ticket.id)).status,403);
  let invalid=await call('backup','/tickets/'+ticket.id,{version:ticket.version,status:'reject',result:''},'PATCH');assert.equal(invalid.status,400);
  const clarify=await call('backup','/tickets/'+ticket.id,{version:ticket.version,status:'clarify',result:'Уточните номер складской позиции'},'PATCH');assert.equal(clarify.status,200);
  const stale=await call('backup','/tickets/'+ticket.id,{version:ticket.version,status:'work',result:'Из старой вкладки'},'PATCH');assert.equal(stale.status,409);
  assert.equal((await call('author','/tickets/'+ticket.id+'/comment',{text:'Позиция складского учета 42'})).status,200);
  ticket=(await call('backup','/tickets/'+ticket.id)).data;assert.equal((await call('backup','/tickets/'+ticket.id,{version:ticket.version,status:'reject',result:'Не требуется отдельная разработка: учет исправлен в существующей системе'},'PATCH')).status,200);
  const result=(await call('author','/tickets/'+ticket.id)).data;assert.match(result.result,/учет исправлен/);assert.ok(result.resolved_at);assert.ok(result.events.length>=4);
  const notices=await call('author','/upgrade/notifications');assert.equal(notices.status,200);assert.ok(notices.data.some(n=>n.ticket===ticket.id&&n.kind==='status'));
  const priv=await call('author','/tickets',{body:'Полностью личная тестовая идея сотрудника',kind:'idea',visibility:'private'});assert.equal((await call('director','/tickets/'+priv.data.id)).status,403);
  const shared=await call('author','/tickets',{body:'На тестовом складе остатки не совпадают с учетом товаров повтор',kind:'idea',department:'ИТ',visibility:'department'});assert.equal(shared.status,201);
  const similar=await call('peer','/upgrade/similar',{text:'На тестовом складе остатки не совпадают с учетом товаров'});assert.equal(similar.status,200);assert.ok(similar.data.some(t=>t.id===shared.data.id));assert.ok(!similar.data.some(t=>t.id===priv.data.id));
  assert.equal((await call('peer','/upgrade/tickets/'+shared.data.id+'/join',{})).status,200);assert.equal((await call('outsider','/upgrade/tickets/'+shared.data.id+'/join',{})).status,404);
  const overdue=await call('author','/tickets',{body:'Проверка эскалации просроченного тестового обращения',kind:'problem',visibility:'leaders',entry_type:'request'});await db.query("UPDATE ideafix.tickets SET due=now()-interval '1 hour',first_response_due=now()-interval '1 hour' WHERE id=$1",[overdue.data.id]);await sweepOverdue((s,p)=>db.query(s,p));await sweepOverdue((s,p)=>db.query(s,p));
  const n=(await db.query("SELECT count(*)::int AS n FROM ideafix.ticket_audit WHERE ticket=$1 AND event='overdue'",[overdue.data.id])).rows[0].n;assert.equal(n,1);
  const analytics=await call('director','/upgrade/analytics');assert.equal(analytics.status,200);assert.equal(analytics.data.timeZone,'Asia/Almaty');assert.equal((await call('author','/upgrade/analytics')).status,403);
  const badFile=await call('author','/tickets/'+ticket.id+'/files',{filename:'payload.html',mime:'text/html',base64:'aGVsbG8='});assert.equal(badFile.status,400);
  await processOutbox((s,p)=>db.query(s,p));const outbox=await call('director','/upgrade/integration-log');assert.equal(outbox.status,200);assert.equal(outbox.data.mode,'simulation');assert.ok(outbox.data.items.some(x=>x.status==='simulated'));
  const thread=await call('backup','/discussions/topics',{ticket_id:shared.data.id});assert.equal(thread.status,201);
  const uploaded=await call('backup','/discussions/topics/'+thread.data.id+'/files',{filename:'test-report.txt',mime:'text/plain',base64:Buffer.from('Discussion test file').toString('base64')});assert.equal(uploaded.status,201);
  const messages=await call('backup','/discussions/topics/'+thread.data.id+'/messages');assert.ok(messages.data.some(m=>Number(m.file_id)===Number(uploaded.data.id)&&m.filename==='test-report.txt'));
  assert.equal((await call('outsider','/discussions/topics/'+thread.data.id+'/files')).status,403);
  assert.equal((await call('backup','/discussions/topics/'+thread.data.id+'/close',{})).status,200);
  assert.equal((await call('backup','/discussions/topics/'+thread.data.id+'/files')).data.length,1);
  assert.equal((await call('backup','/discussions/topics/'+thread.data.id+'/files',{filename:'late.txt',mime:'text/plain',base64:'aGVsbG8='})).status,409);
  console.log('Verified: routing backup, business SLA, full author loop, stale edit conflict, privacy, duplicate join, escalation once, notifications, analytics and safe files.');
 }finally{await db.end();await closeUpgrade()}
});
