// Bitrix24 task delivery. Webhook credentials never leave the server after saving.
export const BITRIX_PORTAL='https://b24-hdamjr.bitrix24.kz';
const APP_URL='https://br-wandering-hat-b9hqnoxc-ideafixapp.compute.c-7.eu-central-1.aws.neon.tech/';
export function webhookBase(value){let u;try{u=new URL(value)}catch{throw Object.assign(new Error('Введите URL входящего вебхука Битрикс24'),{status:400})}if(u.origin!==BITRIX_PORTAL||u.username||u.password||u.search||u.hash||!/^\/rest\/[1-9]\d*\/[A-Za-z0-9_-]+\/?$/.test(u.pathname))throw Object.assign(new Error('Нужен входящий вебхук вашего портала: https://b24-hdamjr.bitrix24.kz/rest/…/…/'),{status:400});return u.href.replace(/\/?$/,'/')}
export async function bitrixCall(base,method,payload={},transport=fetch){
 let response,data;try{response=await transport(webhookBase(base)+method+'.json',{method:'POST',redirect:'error',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(12000)});data=await response.json()}catch{throw Object.assign(new Error('Нет подтверждения от Битрикс24. Проверьте задачу в портале перед повторной отправкой.'),{status:502,uncertain:true})}
 if(data?.error)throw Object.assign(new Error('Битрикс24 отклонил запрос. Проверьте права вебхука и обязательные поля задач.'),{status:502,definite:true});
 if(!response.ok||!data||!('result'in data))throw Object.assign(new Error('Битрикс24 не подтвердил результат запроса'),{status:502,uncertain:true});return data;
}
export function taskFields(ticket,recipient,actor){const w=ticket.workflow||{};const plain=s=>String(s||'').replace(/\[/g,'(').replace(/\]/g,')');return {TITLE:`IdeaFix #${ticket.id}: ${plain(w.proposal||ticket.title).replace(/\s+/g,' ').slice(0,170)}`,RESPONSIBLE_ID:Number(recipient),DESCRIPTION:`Предложение из IdeaFix #${ticket.id}\n${ticket.offering_name?'Продукт / услуга: '+plain(ticket.offering_name)+'\n':''}\n${plain(w.proposal||ticket.body)}${w.benefit?'\n\nПольза для компании: '+plain(w.benefit):''}\n\nОтправил: ${plain(actor.name)}\nОтдел: ${plain(ticket.department)}\n\nIdeaFix: ${APP_URL}`,PRIORITY:ticket.priority==='high'?2:1,...(/^\d{4}-\d{2}-\d{2}$/.test(w.deadline||'')?{DEADLINE:w.deadline+'T18:00:00+05:00'}:{})}}
export async function handleBitrix(ctx){const {url,req,u,body,send,fail,query,pool,event,manage}=ctx;
 const config=async(db=query)=>{const row=(await db('SELECT webhook FROM ideafix.bitrix_config WHERE id=1')).rows[0];return row?.webhook||process.env.BITRIX_WEBHOOK_URL||''};
 if(url.pathname==='/api/bitrix/status'){if(req.method!=='GET')fail(405,'Метод недоступен');return send({configured:!!await config(),portal:BITRIX_PORTAL}),true}
 if(url.pathname==='/api/bitrix/config'){
  if(u.role!=='director')fail(403,'Подключение настраивает директор');if(req.method!=='PUT')fail(405,'Метод недоступен');const b=await body(req),base=webhookBase(b.webhook);
  await bitrixCall(base,'user.get',{FILTER:{ACTIVE:true},start:0});await bitrixCall(base,'tasks.task.getFields');
  await query('INSERT INTO ideafix.bitrix_config(id,webhook) VALUES(1,$1) ON CONFLICT(id) DO UPDATE SET webhook=excluded.webhook',[base]);return send({ok:true,configured:true,portal:BITRIX_PORTAL}),true;
 }
 if(url.pathname==='/api/bitrix/users'){
  if(req.method!=='GET')fail(405,'Метод недоступен');const base=await config();if(!base)fail(503,'Сначала подключите Битрикс24 в разделе «Управление»');const start=Number(url.searchParams.get('start')||0);if(!Number.isInteger(start)||start<0||start>100000)fail(400,'Неверная страница');const search=(url.searchParams.get('search')||'').trim().slice(0,100);
  const data=await bitrixCall(base,'user.get',{FILTER:{ACTIVE:true,USER_TYPE:'employee',...(search?{NAME_SEARCH:search}:{})},sort:'LAST_NAME',order:'ASC',start});
  return send({users:(Array.isArray(data.result)?data.result:[]).filter(v=>/^[1-9]\d*$/.test(String(v.ID))).map(v=>({id:String(v.ID),name:[v.LAST_NAME,v.NAME,v.SECOND_NAME].filter(Boolean).join(' ')||'ID '+v.ID,position:v.WORK_POSITION||''})),next:Number.isInteger(data.next)?data.next:null}),true;
 }
 const match=url.pathname.match(/^\/api\/tickets\/(\d+)\/bitrix$/);if(!match)return false;if(req.method!=='POST')fail(405,'Метод недоступен');
 const b=await body(req);let recipient;
 const own=(await query('SELECT webhook FROM ideafix.bitrix_accounts WHERE app_user=$1',[u.id])).rows[0];if(!own?.webhook)fail(409,'Сначала подключите «Мой Битрикс»');
 // A row lock serializes a sender's concurrent requests. The committed pending record
 // prevents duplicates even when the remote service accepts a request but times out.
 const client=await pool.connect();let t,existing;
 try{await client.query('BEGIN');t=(await client.query('SELECT * FROM ideafix.tickets WHERE id=$1 FOR UPDATE',[Number(match[1])])).rows[0];if(!t)fail(404,'Инсайт не найден');if(!manage(u,t)&&(t.anonymous||t.author!==u.id))fail(403,'Отправка доступна автору и руководителю');if(t.stage!=='proposal')fail(409,'Отправить предложение в Битрикс можно только на стадии «Предложение»'); if(!/^[1-9]\d*$/.test(String(b.recipient_id||'')))fail(400,'Выберите сотрудника Битрикс24');recipient=Number(b.recipient_id);if(!Number.isSafeInteger(recipient))fail(400,'Выберите сотрудника Битрикс24');
 existing=(await client.query('SELECT * FROM ideafix.bitrix_deliveries WHERE ticket=$1 AND recipient=$2',[t.id,recipient])).rows[0];
 if(existing?.status==='sent'){await client.query('COMMIT');return send({ok:true,already_sent:true,task_id:existing.task_id,task_url:`${BITRIX_PORTAL}/company/personal/user/${recipient}/tasks/task/view/${existing.task_id}/`}),true}
 if(existing&&existing.status!=='failed')fail(409,'Отправка уже выполняется или ожидает проверки. Проверьте задачу в Битрикс24; повтор не создаётся.');
 const base=own.webhook;
 const people=await bitrixCall(base,'user.get',{FILTER:{ID:recipient,ACTIVE:true,USER_TYPE:'employee'}});const person=people.result?.find(v=>Number(v.ID)===recipient);if(!person)fail(400,'Сотрудник не найден или больше не активен');
 const name=[person.LAST_NAME,person.NAME,person.SECOND_NAME].filter(Boolean).join(' ')||'ID '+recipient;
 await client.query("INSERT INTO ideafix.bitrix_deliveries(ticket,recipient,recipient_name,status) VALUES($1,$2,$3,'pending') ON CONFLICT(ticket,recipient) DO UPDATE SET status='pending',recipient_name=excluded.recipient_name",[t.id,recipient,name]);await client.query('COMMIT');
 let taskId;try{const created=await bitrixCall(base,'tasks.task.add',{fields:taskFields(t,recipient,u)});taskId=Number(created.result?.task?.id);if(!Number.isSafeInteger(taskId)||taskId<1)throw Object.assign(new Error('Битрикс24 не вернул номер задачи. Проверьте портал перед повторной отправкой.'),{status:502});}catch(e){await client.query('UPDATE ideafix.bitrix_deliveries SET status=$1 WHERE ticket=$2 AND recipient=$3',[e.definite?'failed':'unknown',t.id,recipient]);throw e}
 await client.query('BEGIN');await client.query("UPDATE ideafix.bitrix_deliveries SET status='sent',task_id=$1 WHERE ticket=$2 AND recipient=$3",[taskId,t.id,recipient]);await event(t.id,u,`Предложение отправлено в Битрикс24. Исполнитель: ${name} (ID ${recipient}). Задача #${taskId}`,false,client);await client.query('COMMIT');return send({ok:true,task_id:taskId,task_url:`${BITRIX_PORTAL}/company/personal/user/${recipient}/tasks/task/view/${taskId}/`}),true;
 }catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}
}

