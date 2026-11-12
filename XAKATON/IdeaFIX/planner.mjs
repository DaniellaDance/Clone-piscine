import {canSeeTicket} from './access.mjs';
import {calendarDay} from './day-calendar.mjs';
import {syncDayTask} from './planner-bitrix.mjs';
import {bitrixCall,BITRIX_PORTAL} from './bitrix.mjs';
export function dayWindow(now=new Date(),selected){
 const day=selected||new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Almaty',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
 if(!/^20\d{2}-(0[1-9]|1[0-2])-([012]\d|3[01])$/.test(day)||!Number.isFinite(new Date(day+'T12:00:00Z').getTime())||new Date(day+'T12:00:00Z').toISOString().slice(0,10)!==day)throw Object.assign(new Error('Проверьте дату плана'),{status:400});
 const from=new Date(day+'T00:00:00+05:00'),to=new Date(from.getTime()+86400000);
 return {day,from:from.toISOString(),to:to.toISOString()};
}
export async function bitrixDayPage({base,person,field,start,window,call=bitrixCall}){
 const fields={deadline:'DEADLINE',start:'START_DATE_PLAN',end:'END_DATE_PLAN'};if(!fields[field])throw Object.assign(new Error('Неизвестная дата задачи'),{status:400});
 const data=await call(base,'tasks.task.list',{order:{ID:'ASC'},filter:{RESPONSIBLE_ID:person,['>='+fields[field]]:window.from,['<'+fields[field]]:window.to},select:['ID','TITLE','STATUS','DEADLINE','START_DATE_PLAN','END_DATE_PLAN','RESPONSIBLE_ID'],start});
 const tasks=(data.result?.tasks||[]).filter(t=>Number(t.responsibleId??t.RESPONSIBLE_ID)===Number(person)).filter(t=>{const v={deadline:t.deadline??t.DEADLINE,start:t.startDatePlan??t.START_DATE_PLAN,end:t.endDatePlan??t.END_DATE_PLAN}[field];const d=new Date(v);return Number.isFinite(d.getTime())&&d>=new Date(window.from)&&d<new Date(window.to)}).map(t=>{const id=String(t.id??t.ID);if(!/^[1-9]\d*$/.test(id))return null;const state=String(t.status??t.STATUS);return {id:'bitrix-'+id,title:String(t.title??t.TITLE??'Задача'),status:state==='5'?'done':state==='3'?'work':'new',due_at:t.deadline??t.DEADLINE??t.startDatePlan??t.START_DATE_PLAN??null,source:'bitrix',url:`${BITRIX_PORTAL}/company/personal/user/${person}/tasks/task/view/${id}/`}}).filter(Boolean);
 return {tasks,next:Number.isInteger(data.next)&&data.next>start?data.next:null};
}
export async function handlePlanner({url,req,u,body,send,fail,query,pool}){
 if(!url.pathname.startsWith('/api/planner/'))return false;const window=dayWindow(new Date(),url.searchParams.get('date')||undefined);
 if(url.pathname==='/api/planner/today'&&req.method==='GET'){
  const tasks=(await query('SELECT id,title,description,due_at,status,is_demo,source,work_task,sync_status,bitrix_task,duration_minutes FROM ideafix.planner_tasks WHERE owner=$1 AND planned_for=$2 ORDER BY due_at NULLS LAST,id',[u.id,window.day])).rows.map(t=>({...t,id:'local-'+t.id,local_id:t.id,source:t.is_demo?'demo':t.source||'local'}));
  const tickets=(await query(`SELECT id,title,status,stage,due,workflow,department,author,anonymous,recipient,published,kind,idea_audience,entry_type FROM ideafix.tickets WHERE recipient=$1 AND ($5 OR department=$6) AND ((due >= $2 AND due < $3) OR workflow->>'deadline'=$4) ORDER BY due,id`,[u.id,window.from,window.to,window.day,['director','admin'].includes(u.role),u.department])).rows.filter(t=>canSeeTicket(u,t));
  tasks.push(...tickets.map(t=>({id:'ticket-'+t.id,ticket_id:t.id,title:(t.stage==='pilot'?'Пилот: ':'Обращение: ')+t.title,status:['done','reject'].includes(t.status)?'done':t.status==='new'?'new':'work',due_at:t.workflow?.deadline===window.day?null:t.due,source:'ideafix'})));
  const link=(await query('SELECT bitrix_user,bitrix_name FROM ideafix.planner_bitrix_links WHERE app_user=$1',[u.id])).rows[0];const config=(await query('SELECT webhook FROM ideafix.bitrix_config WHERE id=1')).rows[0];
  const personal=(await query('SELECT app_user FROM ideafix.bitrix_accounts WHERE app_user=$1',[u.id])).rows.length;
  for(const task of tasks)if(task.bitrix_task&&link)task.url=BITRIX_PORTAL+'/company/personal/user/'+link.bitrix_user+'/tasks/task/view/'+task.bitrix_task+'/';
  send({day:window.day,tasks,bitrix:{configured:!!(personal||config?.webhook||process.env.BITRIX_WEBHOOK_URL),linked:!!link,person:link?.bitrix_name||null},canLink:u.role==='director'});return true;
 }
 if(url.pathname==='/api/planner/bitrix'&&req.method==='GET'){
  const link=(await query('SELECT bitrix_user FROM ideafix.planner_bitrix_links WHERE app_user=$1',[u.id])).rows[0];if(!link)fail(409,'Личный аккаунт Bitrix24 ещё не привязан');
  const config=(await query('SELECT webhook FROM ideafix.bitrix_config WHERE id=1')).rows[0];const personal=(await query('SELECT webhook FROM ideafix.bitrix_accounts WHERE app_user=$1',[u.id])).rows[0];const base=personal?.webhook||config?.webhook||process.env.BITRIX_WEBHOOK_URL;if(!base)fail(503,'Битрикс24 ещё не подключён');
  const start=Number(url.searchParams.get('start')||0),field=url.searchParams.get('field')||'deadline';if(!Number.isSafeInteger(start)||start<0||start>10000000)fail(400,'Неверная страница');
  send(await bitrixDayPage({base,person:link.bitrix_user,field,start,window}));return true;
 }
 if(url.pathname==='/api/planner/tasks'&&req.method==='POST'){
  const b=await body(req);if(typeof b.title!=='string'||b.title.trim().length<2||b.title.length>200||typeof (b.description||'')!=='string'||(b.description||'').length>2000)fail(400,'Укажите задачу: 2–200 символов');const day=dayWindow(new Date(),b.date||window.day).day;if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(b.time||''))fail(400,'Выберите время начала');const duration=Number(b.duration_minutes||30);if(![15,30,60,90,120,240].includes(duration))fail(400,'Выберите длительность');if(!['work','personal'].includes(b.kind))fail(400,'Выберите рабочую или личную задачу');
  const task=(await query("INSERT INTO ideafix.planner_tasks(owner,title,description,planned_for,due_at,status,work_task,sync_status,duration_minutes) VALUES($1,$2,$3,$4,$5,'new',$6,$7,$8) RETURNING *",[u.id,b.title.trim(),(b.description||'').trim(),day,day+'T'+b.time+':00+05:00',b.kind==='work',b.kind==='work'?'queued':'personal',duration])).rows[0];const sync=await syncDayTask(query,task);send({ok:true,id:task.id,day,sync},201);return true;
 }
 if(url.pathname==='/api/planner/sync'&&req.method==='POST'){
  const tasks=(await query("SELECT * FROM ideafix.planner_tasks WHERE owner=$1 AND work_task AND sync_status IN ('queued','failed') ORDER BY id LIMIT 20",[u.id])).rows;const results=[];
  for(const task of tasks)results.push(await syncDayTask(query,task));send({results});return true;
 }
 if(url.pathname==='/api/planner/calendar/preview'&&req.method==='POST'){
  const b=await body(req),range=dayWindow(new Date(),b.date||window.day);send({day:range.day,events:calendarDay(b.content,range)});return true;
 }
 if(url.pathname==='/api/planner/calendar/import'&&req.method==='POST'){
  const b=await body(req),range=dayWindow(new Date(),b.date||window.day);if(!Array.isArray(b.events)||b.events.length>200)fail(400,'Выберите до 200 событий');
  for(const e of b.events)if(typeof e.title!=='string'||!e.title.trim()||e.title.length>200||typeof e.description!=='string'||e.description.length>2000||!/^[a-f0-9]{64}$/.test(e.source_key||'')||(e.due_at!==null&&(!Number.isFinite(new Date(e.due_at).getTime())||new Date(e.due_at)<new Date(range.from)||new Date(e.due_at)>=new Date(range.to))))fail(400,'Проверьте события календаря');
  let added=0;const client=await pool.connect();try{await client.query('BEGIN');for(const e of b.events){const r=await client.query("INSERT INTO ideafix.planner_tasks(owner,title,description,planned_for,due_at,status,source,external_key) VALUES($1,$2,$3,$4,$5,'new','calendar',$6) ON CONFLICT(owner,external_key) WHERE external_key IS NOT NULL DO NOTHING RETURNING id",[u.id,e.title.trim(),e.description,range.day,e.due_at,e.source_key]);added+=r.rowCount}await client.query('COMMIT')}catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}send({ok:true,added,day:range.day});return true;
 }
 if(url.pathname==='/api/planner/demo'&&req.method==='POST'){
  const plan=[['Проверить новые предложения','09:30','done'],['Подготовить план ближайшего совещания','11:00','work'],['Оценить результаты пилотного проекта','14:00','new'],['Обсудить решение с поставщиком','15:00','new'],['Подвести итоги рабочего дня','17:00','new']];
  const client=await pool.connect();try{await client.query('BEGIN');for(const [title,time,status]of plan)await client.query("INSERT INTO ideafix.planner_tasks(owner,title,description,planned_for,due_at,status,is_demo) VALUES($1,$2,'Пример личной задачи. Не отправлялся в Bitrix24 или сотрудникам.',$3,$4,$5,true) ON CONFLICT(owner,title,planned_for) WHERE is_demo DO NOTHING",[u.id,'ДЕМО · '+title,window.day,window.day+'T'+time+':00+05:00',status]);await client.query('COMMIT')}catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}send({ok:true});return true;
 }
 const match=url.pathname.match(/^\/api\/planner\/tasks\/(\d+)$/);
 if(match&&req.method==='PATCH'){const b=await body(req);if(!['new','work','done'].includes(b.status))fail(400,'Неизвестный статус');const r=await query('UPDATE ideafix.planner_tasks SET status=$1 WHERE id=$2 AND owner=$3 RETURNING id',[b.status,+match[1],u.id]);if(!r.rowCount)fail(404,'Личная задача не найдена');send({ok:true});return true}
 if(url.pathname==='/api/planner/identity'&&req.method==='PUT'){
  if(u.role!=='director')fail(403,'Соответствие аккаунтов настраивает директор');const b=await body(req),person=Number(b.bitrix_user_id);if((await query('SELECT app_user FROM ideafix.bitrix_accounts WHERE app_user=$1',[b.app_user_id])).rows.length)fail(409,'Пользователь подключил личный Битрикс. Изменить его может сам пользователь.');if(!Number.isSafeInteger(person)||person<1||typeof b.app_user_id!=='string')fail(400,'Выберите сотрудника');if(!(await query('SELECT id FROM ideafix.users WHERE id=$1',[b.app_user_id])).rows.length)fail(400,'Аккаунт IdeaFix не найден');
  const config=(await query('SELECT webhook FROM ideafix.bitrix_config WHERE id=1')).rows[0],base=config?.webhook||process.env.BITRIX_WEBHOOK_URL;if(!base)fail(503,'Сначала подключите Битрикс24');const people=await bitrixCall(base,'user.get',{FILTER:{ID:person,ACTIVE:true,USER_TYPE:'employee'}}),p=people.result?.find(p=>Number(p.ID)===person);if(!p)fail(400,'Сотрудник Bitrix24 не найден');const name=[p.LAST_NAME,p.NAME,p.SECOND_NAME].filter(Boolean).join(' ')||'ID '+person;
  const duplicate=(await query('SELECT app_user FROM ideafix.planner_bitrix_links WHERE bitrix_user=$1',[person])).rows[0];if(duplicate&&duplicate.app_user!==b.app_user_id)fail(409,'Этот сотрудник Bitrix24 уже привязан к другому аккаунту IdeaFix');
  await query('INSERT INTO ideafix.planner_bitrix_links(app_user,bitrix_user,bitrix_name) VALUES($1,$2,$3) ON CONFLICT(app_user) DO UPDATE SET bitrix_user=excluded.bitrix_user,bitrix_name=excluded.bitrix_name',[b.app_user_id,person,name]);send({ok:true});return true;
 }
 fail(405,'Метод недоступен');
}

