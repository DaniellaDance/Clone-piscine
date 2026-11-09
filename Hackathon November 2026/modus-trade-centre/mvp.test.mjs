import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
const port=32000+Math.floor(Math.random()*2000),base='http://127.0.0.1:'+port;
const credentials={'staff-1':'TestStaffPassword123!','manager-1':'TestManagerPassword123!','client-1':'TestClientPassword123!'};
const child=spawn(process.execPath,['server.mjs'],{cwd:new URL('.',import.meta.url),env:{...process.env,PORT:String(port),DATABASE_URL:'',DEMO_ACCOUNT_PASSWORDS:JSON.stringify(credentials)},stdio:'pipe'});
let output='';child.stdout.on('data',d=>output+=d);child.stderr.on('data',d=>output+=d);
async function req(path,method='GET',body,session=''){const r=await fetch(base+path,{method,headers:{...(body?{'content-type':'application/json'}:{}),...(session?{cookie:session}:{})},body:body?JSON.stringify(body):undefined});let data=await r.json();return {status:r.status,data,cookie:r.headers.get('set-cookie')?.split(';')[0]||''}}
async function login(userId,password){return req('/api/login','POST',{userId,password})}
test('MVP: login, access isolation, tickets, status updates',async()=>{
try{
let ready=false;for(let i=0;i<60;i++){try{let r=await req('/health');if(r.status===200){ready=true;break}}catch{}await delay(150)}assert.ok(ready,'Server did not start: '+output);
assert.equal((await req('/api/tickets')).status,401);
assert.equal((await login('staff-1','bad')).status,401);
const staff=await login('staff-1',credentials['staff-1']);assert.equal(staff.status,200);assert.ok(staff.cookie);
const manager=await login('manager-1',credentials['manager-1']);assert.equal(manager.status,200);
const client=await login('client-1',credentials['client-1']);assert.equal(client.status,200);
const payload={title:'Тестовая идея для хакатона',description:'Предлагаю улучшить процесс обратной связи',department:'Сервисный центр',type:'Идея',priority:'normal'};
const created=await req('/api/tickets','POST',payload,staff.cookie);assert.equal(created.status,201);assert.ok(created.data.id);
const id=created.data.id;
assert.ok((await req('/api/tickets','GET',undefined,staff.cookie)).data.some(t=>t.id===id));
assert.ok(!(await req('/api/tickets','GET',undefined,client.cookie)).data.some(t=>t.id===id),'Client must not see staff ticket');
assert.equal((await req('/api/tickets/'+id,'PATCH',{status:'resolved',detail:'Закрыто'},staff.cookie)).status,403);
const updated=await req('/api/tickets/'+id,'PATCH',{status:'work',detail:'Назначен ответственный'},manager.cookie);assert.equal(updated.status,200);
const ticket=(await req('/api/tickets','GET',undefined,staff.cookie)).data.find(t=>t.id===id);assert.equal(ticket.status,'work');assert.ok(ticket.history.some(h=>h.detail==='Назначен ответственный'));
const clientCreated=await req('/api/tickets','POST',{title:'Клиентская заявка',description:'Проверка приватности',department:'Сервисный центр',type:'Сервисная заявка'},client.cookie);
assert.equal(clientCreated.status,201);
const clientId=clientCreated.data.id;
assert.equal((await req('/api/tickets/'+clientId,'PATCH',{status:'work',detail:'Внутреннее обсуждение, секретная информация',audience:'internal'},manager.cookie)).status,200);
let clientView=(await req('/api/tickets','GET',undefined,client.cookie)).data.find(t=>t.id===clientId);
assert.equal(clientView.status,'work');
assert.ok(!JSON.stringify(clientView).includes('секретная информация'),'Internal message must not reach client API');
assert.equal((await req('/api/tickets/'+clientId,'PATCH',{status:'resolved',detail:'Ваша заявка выполнена',audience:'client'},manager.cookie)).status,200);
clientView=(await req('/api/tickets','GET',undefined,client.cookie)).data.find(t=>t.id===clientId);
assert.ok(JSON.stringify(clientView).includes('Ваша заявка выполнена'),'Client-directed message must be visible');
assert.equal((await req('/api/integrations','GET',undefined,staff.cookie)).status,403);
assert.equal((await req('/api/logout','POST',undefined,staff.cookie)).status,200);
assert.equal((await req('/api/tickets','GET',undefined,staff.cookie)).status,401);
}finally{child.kill('SIGTERM')}
});
