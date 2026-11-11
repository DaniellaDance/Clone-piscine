import {bitrixCall,BITRIX_PORTAL,taskFields} from './bitrix.mjs';
export function pilotTaskFields(t,config,actor){return {...taskFields(t,config.pilot_recipient,actor),GROUP_ID:Number(config.pilot_group),TITLE:`${t.title.startsWith('ДЕМО')?'ДЕМО ':''}Пилот IdeaFix #${t.id}: ${t.title}`.slice(0,200),DESCRIPTION:`Пилотный проект IdeaFix #${t.id}\n\nИдея: ${t.body}\n\nПлан проверки: ${t.workflow.pilot}\nОтветственный в IdeaFix: ${t.workflow.owner}\nСрок: ${t.workflow.deadline}\n\n${t.workflow.benefit||''}\n\nIdeaFix: https://br-wandering-hat-b9hqnoxc-ideafixapp.compute.c-7.eu-central-1.aws.neon.tech/`}}
export async function syncPilot({ticket,u,query,event,call=bitrixCall}){
 const config=(await query('SELECT * FROM ideafix.bitrix_config WHERE id=1')).rows[0];
 if(!config?.webhook||!config.pilot_group||!config.pilot_recipient)return {status:'not_configured',message:'Пилот сохранён. Для передачи подключите Битрикс24 и выберите проект и исполнителя пилотов.'};
 const reserved=await query(`INSERT INTO ideafix.pilot_bitrix_deliveries(ticket,status) VALUES($1,'pending') ON CONFLICT(ticket) DO UPDATE SET status='pending' WHERE ideafix.pilot_bitrix_deliveries.status='failed' RETURNING ticket`,[ticket.id]);
 if(!reserved.rowCount){const row=(await query('SELECT status,task_id FROM ideafix.pilot_bitrix_deliveries WHERE ticket=$1',[ticket.id])).rows[0];return {...row,task_url:row?.task_id?`${BITRIX_PORTAL}/workgroups/group/${config.pilot_group}/tasks/task/view/${row.task_id}/`:undefined,message:row?.status==='sent'?'Пилот уже передан в Битрикс24':'Передача ожидает сверки с Битрикс24; дубликат не создаётся.'}}
 let task;
 try{const data=await call(config.webhook,'tasks.task.add',{fields:pilotTaskFields(ticket,config,u)});task=Number(data.result?.task?.id);if(!Number.isSafeInteger(task)||task<1)throw new Error('Missing task id');}
 catch(e){const status=e.definite?'failed':'unknown';await query('UPDATE ideafix.pilot_bitrix_deliveries SET status=$1 WHERE ticket=$2',[status,ticket.id]);return {status,message:e.definite?'Битрикс24 отклонил пилот. Проверьте права проекта и исполнителя.':'Результат передачи не подтверждён. Сверьте задачи в Битрикс24 перед повтором.'}}
 await query("UPDATE ideafix.pilot_bitrix_deliveries SET status='sent',task_id=$1 WHERE ticket=$2",[task,ticket.id]);await event(ticket.id,u,`Пилот передан в проект «Пилотные проекты» Битрикс24. Задача #${task}`);return {status:'sent',task_id:task,message:'Пилот передан в Битрикс24'};
}
export async function handlePilotConfig({url,req,u,body,send,fail,query,manage,event}){
 if(url.pathname==='/api/bitrix/pilot-config'){
  if(!['director','admin','lead'].includes(u.role))fail(403,'Нет доступа');
  const c=(await query('SELECT * FROM ideafix.bitrix_config WHERE id=1')).rows[0];
  if(req.method==='GET'){send({configured:!!(c?.webhook&&c.pilot_group&&c.pilot_recipient),group_id:c?.pilot_group||null,recipient_id:c?.pilot_recipient||null});return true}
  if(req.method!=='PUT')fail(405,'Метод недоступен');if(u.role!=='director')fail(403,'Настраивает директор');if(!c?.webhook)fail(503,'Сначала подключите Битрикс24');
  const b=await body(req),group=Number(b.group_id),recipient=Number(b.recipient_id);if(!Number.isSafeInteger(group)||group<1||!Number.isSafeInteger(recipient)||recipient<1)fail(400,'Выберите проект и исполнителя');
  const groups=await bitrixCall(c.webhook,'sonet_group.get',{FILTER:{ID:group,ACTIVE:'Y',CLOSED:'N'}});if(!groups.result?.some(g=>Number(g.ID)===group&&g.NAME==='Пилотные проекты'))fail(400,'Выберите активный проект «Пилотные проекты»');
  const users=await bitrixCall(c.webhook,'user.get',{FILTER:{ID:recipient,ACTIVE:true,USER_TYPE:'employee'}});if(!users.result?.some(v=>Number(v.ID)===recipient))fail(400,'Исполнитель не найден');
  await query('UPDATE ideafix.bitrix_config SET pilot_group=$1,pilot_recipient=$2 WHERE id=1',[group,recipient]);send({ok:true});return true;
 }
 if(url.pathname==='/api/bitrix/pilot-projects'){
  if(u.role!=='director')fail(403,'Настраивает директор');if(req.method!=='GET')fail(405,'Метод недоступен');const c=(await query('SELECT webhook FROM ideafix.bitrix_config WHERE id=1')).rows[0];if(!c?.webhook)fail(503,'Сначала подключите Битрикс24');const data=await bitrixCall(c.webhook,'sonet_group.get',{FILTER:{NAME:'Пилотные проекты',ACTIVE:'Y',CLOSED:'N'}});send({groups:(data.result||[]).filter(g=>g.NAME==='Пилотные проекты').map(g=>({id:g.ID,name:g.NAME}))});return true;
 }
 const match=url.pathname.match(/^\/api\/tickets\/(\d+)\/pilot-sync$/);if(!match)return false;
 const t=(await query('SELECT * FROM ideafix.tickets WHERE id=$1',[+match[1]])).rows[0];if(!t)fail(404,'Обращение не найдено');if(!manage(u,t))fail(403,'Нет доступа');if(t.stage!=='pilot')fail(409,'Обращение не на этапе пилота');
 if(req.method==='POST'){send(await syncPilot({ticket:t,u,query,event}));return true}
 if(req.method!=='GET')fail(405,'Метод недоступен');const d=(await query('SELECT status,task_id FROM ideafix.pilot_bitrix_deliveries WHERE ticket=$1',[t.id])).rows[0];send(d||{status:'not_configured'});return true;
}
