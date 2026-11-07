import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';

test('Real Neon HTTP journey survives process restart', {skip: !process.env.DATABASE_URL && 'DATABASE_URL not configured'}, async () => {
  const port = 34000 + Math.floor(Math.random()*1000);
  const base = 'http://127.0.0.1:' + port;
  const credentials = {'staff-1':'IntegrationStaffPassword123!', 'manager-1':'IntegrationManagerPassword123!', 'client-1':'IntegrationClientPassword123!'};
  let child, output = '';
  const launch = async () => {
    output = '';
    child = spawn(process.execPath,['server.mjs'],{
      cwd:new URL('.',import.meta.url),
      env:{...process.env,PORT:String(port),DEMO_ACCOUNT_PASSWORDS:JSON.stringify(credentials)},
      stdio:'pipe'
    });
    child.stdout.on('data',d=>output+=d);
    child.stderr.on('data',d=>output+=d);
    for(let i=0;i<100;i++){
      try {const r=await fetch(base+'/health');if(r.status===200){const h=await r.json();assert.equal(h.database,'neon','Production DB must be connected');return}}catch{}
      await delay(180);
    }
    throw Error('Neon test server not ready: '+output);
  };
  const stop=async()=>{if(!child)return;const proc=child;child=null;if(proc.exitCode===null){proc.kill('SIGTERM');await Promise.race([new Promise(resolve=>proc.once('exit',resolve)),delay(3000)])}};
  const request=async(path,method='GET',body,cookie='')=>{
    const r=await fetch(base+path,{method,headers:{...(body?{'content-type':'application/json'}:{}),...(cookie?{cookie}:{})},body:body?JSON.stringify(body):undefined});
    return {status:r.status,data:await r.json(),cookie:r.headers.get('set-cookie')?.split(';')[0]||''};
  };
  const login=async(id,password)=>{const r=await request('/api/login','POST',{userId:id,password});assert.equal(r.status,200,JSON.stringify(r.data));assert.ok(r.cookie);return r.cookie};
  try {
    await launch();
    let staff=await login('staff-1',credentials['staff-1']);
    let manager=await login('manager-1',credentials['manager-1']);
    let client=await login('client-1',credentials['client-1']);
    const marker='[ТЕСТ NEON] Проверка сохранения после перезапуска';
    let list=await request('/api/tickets','GET',undefined,staff);
    assert.equal(list.status,200);
    let ticket=list.data.find(t=>t.title===marker);
    let id=ticket?.id;
    if(!id){
      const created=await request('/api/tickets','POST',{title:marker,description:'Контрольная тестовая заявка. Не требует обработки.',department:'Сервисный центр',type:'Идея',priority:'normal'},staff);
      assert.equal(created.status,201,JSON.stringify(created.data));
      id=created.data.id;
    }
    assert.equal((await request('/api/tickets/'+id,'PATCH',{status:'resolved',detail:'Попытка сотрудника'},staff)).status,403);
    assert.ok(!(await request('/api/tickets','GET',undefined,client)).data.some(t=>t.id===id));
    const changed=await request('/api/tickets/'+id,'PATCH',{status:'work',detail:'[ТЕСТ] Руководитель подтвердил обработку'},manager);
    assert.equal(changed.status,200,JSON.stringify(changed.data));
    await stop();
    await launch();
    staff=await login('staff-1',credentials['staff-1']);
    list=await request('/api/tickets','GET',undefined,staff);
    ticket=list.data.find(t=>t.id===id);
    assert.ok(ticket,'Ticket must survive full server process restart in Neon');
    assert.equal(ticket.status,'work');
    assert.ok(ticket.history.some(h=>h.detail==='[ТЕСТ] Руководитель подтвердил обработку'));
  }finally{await stop()}
});
