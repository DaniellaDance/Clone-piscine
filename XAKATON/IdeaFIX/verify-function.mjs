import assert from 'node:assert/strict';
import pg from 'pg';
export async function verifyDeployment(app){
const db=new pg.Pool({connectionString:process.env.DATABASE_URL});const prefix='qa_'+Date.now();let uid=[];
async function call(path,data,cookie='',method){const r=await app.fetch(new Request('https://verification.invalid/api'+path,{method:method||(data?'POST':'GET'),headers:{'Content-Type':'application/json',Cookie:cookie},body:data?JSON.stringify(data):undefined}));return {status:r.status,data:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]||cookie}}
try{
assert.equal((await call('/health')).status,200);
assert.equal((await call('/tickets')).status,401);
const a=await call('/register',{login:prefix+'a',password:'test-pass-123',name:'Тест A',department:'ИТ'}),b=await call('/register',{login:prefix+'b',password:'test-pass-123',name:'Тест B',department:'Продажи'});assert.equal(a.status,200);assert.equal(b.status,200);uid=[a.data.id,b.data.id];
assert.equal((await call('/me',null,a.cookie)).data.role,'employee');
assert.equal((await call('/tickets',{body:'Некорректная область для проверки',vendor_id:'unknown'},a.cookie)).status,400);
const t=await call('/tickets',{body:'Тестовая идея по улучшению формы заявки',kind:'idea',entry_type:'proposal',vendor_id:'v1',industry_id:'meditsina',technical_id:'fire'},a.cookie);assert.equal(t.status,201);
assert.equal((await call('/tickets/'+t.data.id,null,b.cookie)).status,403);
assert.equal((await call('/tickets/'+t.data.id,{status:'done',result:'Попытка обхода'},a.cookie,'PATCH')).status,403);
assert.equal((await call('/users',null,a.cookie)).status,403);
await db.query("UPDATE ideafix.users SET role='director' WHERE id=$1",[b.data.id]);
assert.equal((await call('/tickets/'+t.data.id,{status:'done',result:'',published:true},b.cookie,'PATCH')).status,400);
assert.equal((await call('/tickets/'+t.data.id,{status:'work',published:true},b.cookie,'PATCH')).status,200);
await call('/tickets/'+t.data.id+'/comment',{text:'Закрытая заметка',internal:true},b.cookie);
assert.ok(!(await call('/tickets/'+t.data.id,null,a.cookie)).data.events.some(e=>e.internal));
await call('/tickets/'+t.data.id+'/vote',{},a.cookie);await call('/tickets/'+t.data.id+'/vote',{},a.cookie);
assert.equal((await call('/tickets',null,a.cookie)).data.find(x=>x.id===t.data.id).votes,1);
const anon=await call('/tickets',{body:'Анонимное сообщение для проверки конфиденциальности',anonymous:true},a.cookie);assert.equal(anon.status,201);assert.ok(anon.data.code);
assert.equal((await call('/tickets/'+anon.data.id,null,a.cookie)).status,403);
assert.equal((await call('/track',{id:anon.data.id,code:'wrong'})).status,403);
assert.equal((await call('/track',{id:anon.data.id,code:anon.data.code})).status,200);
assert.equal((await call('/tickets/'+t.data.id+'/bitrix',{},b.cookie)).status,409);
assert.equal((await call('/tickets/'+t.data.id+'/bitrix',{},a.cookie)).status,403);
const w={insight:'Не хватает полей в заявке',proposal:'Добавить поля в шаблон',benefit:'Меньше ошибок',discussion:'Коллеги согласовали изменение',cost:'2 часа',effect:'Меньше возвратов',feasibility:'Можно выполнить силами ИТ',decision:'approved',reason:'Согласовано руководителем',pilot:'Один отдел на неделю',pilotResult:'Тест успешно завершён',owner:'Руководитель ИТ',deadline:'2026-12-01',implementation:'Шаблон обновлён',before:'10 возвратов',after:'2 возврата',result:'Добавлены обязательные поля в шаблон'};
assert.equal((await call('/tickets/'+t.data.id+'/workflow',{...w,stage:'result'},a.cookie,'PUT')).status,403);
assert.equal((await call('/tickets/'+t.data.id+'/workflow',{...w,stage:'result'},b.cookie,'PUT')).status,400);
for(const stage of ['discussion','evaluation','decision','pilot','implementation','result'])assert.equal((await call('/tickets/'+t.data.id+'/workflow',{...w,stage},b.cookie,'PUT')).status,200,stage);
assert.equal((await call('/tickets/'+t.data.id,null,a.cookie)).data.workflow.after,'2 возврата');
assert.equal((await call('/login',{login:prefix+'a',password:'wrong'})).status,401);
const fresh=await call('/login',{login:prefix+'a',password:'test-pass-123'});assert.equal((await call('/tickets/'+t.data.id,null,fresh.cookie)).data.status,'done');const saved=(await call('/tickets/'+t.data.id,null,fresh.cookie)).data;assert.equal(saved.vendor_id,'v1');assert.equal(saved.industry_id,'meditsina');assert.equal(saved.technical_id,'fire');assert.equal(saved.entry_type,'proposal');
await call('/logout',{},fresh.cookie);assert.equal((await call('/me',null,fresh.cookie)).status,401);
// Remove only fixtures created by this test, including the anonymous fixture.
await db.query('DELETE FROM ideafix.events WHERE ticket=$1',[anon.data.id]);await db.query('DELETE FROM ideafix.tickets WHERE id=$1',[anon.data.id]);
}finally{
if(uid.length){await db.query('DELETE FROM ideafix.events WHERE ticket IN (SELECT id FROM ideafix.tickets WHERE author=ANY($1))',[uid]);await db.query('DELETE FROM ideafix.votes WHERE voter=ANY($1) OR ticket IN(SELECT id FROM ideafix.tickets WHERE author=ANY($1))',[uid]);await db.query('DELETE FROM ideafix.tickets WHERE author=ANY($1)',[uid]);await db.query('DELETE FROM ideafix.sessions WHERE user_id=ANY($1)',[uid]);await db.query('DELETE FROM ideafix.users WHERE id=ANY($1)',[uid])}await db.end();}
}
