import {test} from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID,randomBytes,createHash} from 'node:crypto';
import pg from 'pg';
test('department access, director privacy, messaging and demo finance API on isolated Postgres', {skip:!process.env.TEST_DATABASE_URL},async()=>{
 process.env.NEON_FUNCTION='1';process.env.DATABASE_URL=process.env.TEST_DATABASE_URL;
 const {init}=await import('./server.mjs');await init();
 const adapter=(await import('./function-adapter.mjs')).default;
 const db=new pg.Pool({connectionString:process.env.TEST_DATABASE_URL});
 const users={};
 try{
  for(const [name,role,department] of [['d','director','Руководство'],['l','lead','ИТ'],['e','employee','ИТ'],['peer','employee','ИТ'],['ol','lead','Продажи'],['oe','employee','Продажи']]){
   const id=randomUUID(),token=randomBytes(32).toString('hex');
   await db.query('INSERT INTO ideafix.users(id,login,name,password,role,department) VALUES($1,$1,$2,$3,$4,$5)',[id,'TEST '+name,'test-only-disabled',role,department]);
   await db.query("INSERT INTO ideafix.sessions(token,user_id,expires) VALUES($1,$2,now()+interval '1 hour')",[createHash('sha256').update(token).digest('hex'),id]);users[name]={id,token};
  }
  const api=async(name,path,data,method=data?'POST':'GET')=>{
   const r=await adapter.fetch(new Request('https://test.invalid/api'+path,{method,headers:{cookie:'if_session='+users[name].token,...(data?{'content-type':'application/json'}:{})},...(data?{body:JSON.stringify(data)}:{})}));
   const text=await r.text();return {status:r.status,data:(r.headers.get('content-type')||'').includes('application/json')?JSON.parse(text):text};
  };
  const create=(name,data={})=>api(name,'/tickets',{body:'Тестовая идея для проверки доступа отдела',kind:'idea',department:name==='oe'?'Продажи':'ИТ',...data});
  const own=await create('e',{recipient_id:users.l.id});assert.equal(own.status,201);
  const other=await create('oe');assert.equal(other.status,201);
  assert.equal((await api('e','/tickets/'+other.data.id)).status,403);
  assert.equal((await api('l','/tickets/'+other.data.id)).status,403);
  assert.equal((await api('d','/tickets/'+other.data.id)).status,200);
  assert.equal((await create('e',{recipient_id:users.d.id})).status,403);
  assert.equal((await create('e',{recipient_id:users.peer.id})).status,201);
  assert.equal((await create('l',{recipient_id:users.d.id})).status,201);
  assert.equal((await create('l',{recipient_id:users.oe.id})).status,403);
  assert.equal((await create('d',{recipient_id:users.oe.id,kind:'problem'})).status,201);
  const directory=await api('e','/directory');assert.equal(directory.data.some(u=>u.id===users.d.id||u.id===users.oe.id),false);
  const idea=await create('d');assert.equal(idea.status,201);
  assert.equal((await api('l','/tickets/'+idea.data.id)).status,403);
  assert.equal((await api('d','/profile/idea-visibility',{audience:'leaders'},'PUT')).status,200);
  assert.equal((await api('l','/tickets/'+idea.data.id)).status,200);
  assert.equal((await api('ol','/tickets/'+idea.data.id)).status,200);
  assert.equal((await api('e','/tickets/'+idea.data.id)).status,403);
  assert.equal((await api('d','/profile/idea-visibility',{audience:'all'},'PUT')).status,200);
  assert.equal((await api('oe','/tickets/'+idea.data.id)).status,200);
  assert.equal((await api('d','/profile/idea-visibility',{audience:'private'},'PUT')).status,200);
  for(const name of ['e','l','oe','ol'])assert.equal((await api(name,'/tickets')).data.some(t=>t.id===idea.data.id),false);
  assert.equal((await api('e','/leadership-chat')).status,403);
  assert.equal((await api('l','/leadership-chat',{text:'Только ИТ',department:'ИТ'})).status,201);
  assert.equal((await api('ol','/leadership-chat')).data.some(m=>m.text==='Только ИТ'),false);
  assert.equal((await api('l','/leadership-chat',{text:'Нельзя',department:'Продажи'})).status,403);
  const meeting=(await db.query("INSERT INTO ideafix.meetings(title,starts_at,department,owner) VALUES('TEST Meeting',now(),'ИТ',$1) RETURNING id",[users.d.id])).rows[0];
  const result=(await db.query(`INSERT INTO ideafix.fathom_recordings(owner,recording_id,title,summary,transcript,meeting_id) VALUES($1,$2,'TEST result','Итог','[{"text":"Предлагаю пилот"}]',$3) RETURNING id`,[users.d.id,randomUUID(),meeting.id])).rows[0];
  assert.equal((await api('l','/meeting-results/'+result.id+'/transcript')).status,200);
  assert.equal((await api('e','/meeting-results/'+result.id+'/transcript')).status,403);
  assert.equal((await api('ol','/meeting-results/'+result.id+'/transcript')).status,404);
  const sharedIdea=await api('l','/fathom/recordings/'+result.id+'/save',{kind:'idea',title:'Новая идея ИТ',description:'Предлагаю пилот',publish:false});assert.equal(sharedIdea.status,201);
  assert.equal((await api('ol','/tickets/'+sharedIdea.data.id)).status,403);
  const demo=await api('d','/project-finances/demo');assert.equal(demo.status,200);assert.equal(demo.data.length,8);assert.equal(demo.data.every(r=>r.is_demo&&r.currency==='KZT'),true);
  assert.equal((await api('e','/project-finances/demo')).status,403);
  assert.equal((await api('e','/media-messages',{media_type:'audio',recipient_id:users.d.id,transcript:'Текст'})).status,403);
 }finally{await db.end()}
});
