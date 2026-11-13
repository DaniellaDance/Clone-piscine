// Upgrade primitives shared by API, scheduler, and deterministic tests.
export const companyTimeZone='Asia/Almaty';
const offset=5*3600000,day=86400000;
const weekday=ms=>new Date(ms+offset).getUTCDay();
export function addBusinessMinutes(start,minutes){
 let ms=+new Date(start),remaining=Number(minutes)*60000;
 if(!Number.isFinite(ms)||!Number.isFinite(remaining)||remaining<0||remaining>365*1440*60000)throw new RangeError('Invalid business duration');
 while(remaining>0){const local=new Date(ms+offset),w=local.getUTCDay();if(w===0||w===6){local.setUTCHours(0,0,0,0);ms=+local-offset+(w===6?2:1)*day;continue}const end=Date.UTC(local.getUTCFullYear(),local.getUTCMonth(),local.getUTCDate()+1)-offset;const part=Math.min(remaining,end-ms);ms+=part;remaining-=part;}
 if(minutes>0&&(weekday(ms)===0||weekday(ms)===6)){const local=new Date(ms+offset);local.setUTCHours(0,0,0,0);ms=+local-offset+(weekday(ms)===6?2:1)*day;}
 return new Date(ms);
}
export function businessDaysBetween(start,end){let a=+new Date(start),b=+new Date(end),total=0;if(!Number.isFinite(a)||!Number.isFinite(b)||b<a)return null;while(a<b){const d=new Date(a+offset),next=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()+1)-offset,stop=Math.min(next,b);if(![0,6].includes(d.getUTCDay()))total+=stop-a;a=stop}return Math.round(total/day*100)/100}
export const median=values=>{const a=values.filter(Number.isFinite).sort((a,b)=>a-b),n=a.length;return n?Math.round((n%2?a[(n-1)/2]:(a[n/2-1]+a[n/2])/2)*100)/100:null};
const stop=new Set(['который','которые','будет','этого','чтобы','нужно','необходимо','предлагаю','также','очень','для','или','как','при','это','что','все','the','and','with','from','this']);
export const tokens=s=>new Set(String(s||'').toLocaleLowerCase('ru').replace(/ё/g,'е').match(/[\p{L}\p{N}]{3,}/gu)?.filter(w=>!stop.has(w)).map(w=>w.length>5?w.replace(/(?:иями|ами|ого|ому|ение|ения|ить|ать|ов|ах|ях|ый|ий|ая|ые|ой|ом|ам|ям|ы|и|а|я|е|у)$/u,''):w)||[]);
export function similarity(a,b){const x=tokens(a),y=tokens(b);if(!x.size||!y.size)return 0;return [...x].filter(w=>y.has(w)).length/Math.sqrt(x.size*y.size)}
export function clusters(rows){const groups=[];for(const row of rows){const group=groups.find(g=>similarity(g[0].body,row.body)>=.42);if(group)group.push(row);else groups.push([row])}return groups.filter(g=>g.length>1).map(g=>({title:g[0].title,count:g.length,ids:g.map(x=>x.id),departments:[...new Set(g.map(x=>x.department))]})).sort((a,b)=>b.count-a.count).slice(0,10)}
export function analytics(rows,now=new Date()){
 const closed=rows.filter(t=>['done','reject'].includes(t.status)&&t.result?.trim()),overdue=t=>!['done','reject'].includes(t.status)&&(+new Date(t.due)<+now||(!t.first_response&&+new Date(t.first_response_due)<+now));
 const groups=key=>[...new Set(rows.map(t=>t[key]))].map(name=>{const a=rows.filter(t=>t[key]===name);return {name,total:a.length,overdue:a.filter(overdue).length,firstResponseMedian:median(a.filter(t=>t.first_response).map(t=>businessDaysBetween(t.created,t.first_response))),resolutionMedian:median(a.filter(t=>t.resolved_at).map(t=>businessDaysBetween(t.created,t.resolved_at)))}}).sort((a,b)=>b.overdue-a.overdue||b.total-a.total);
 return {total:rows.length,reviewed:closed.length,reviewedPercent:rows.length?Math.round(closed.length/rows.length*100):0,overdue:rows.filter(overdue).length,firstResponseMedian:median(rows.filter(t=>t.first_response).map(t=>businessDaysBetween(t.created,t.first_response))),resolutionMedian:median(rows.filter(t=>t.resolved_at).map(t=>businessDaysBetween(t.created,t.resolved_at))),departments:groups('department'),categories:groups('kind'),clusters:clusters(rows),timeZone:companyTimeZone,calendar:'Будни, 24 часа в день; суббота и воскресенье исключены. Праздники не настроены.'};
}
export async function sweepOverdue(query){
 // Durable, idempotent escalation. Never escalate private draft insights.
 return query(`WITH due AS (SELECT id FROM ideafix.tickets WHERE status NOT IN ('done','reject') AND escalated_at IS NULL AND coalesce(workflow->>'visibility','')<>'private' AND (due<now() OR (first_response IS NULL AND first_response_due<now())) ORDER BY id FOR UPDATE SKIP LOCKED LIMIT 100) UPDATE ideafix.tickets t SET escalated_at=now(),controlled=true FROM due WHERE t.id=due.id RETURNING t.id`);
}
export async function handleUpgrade({url,req,u,query,pool,body,send,fail,visible,manage,ticket,ticketVisibilitySql}){
 const top=['director','admin'].includes(u.role);
 const scoped=async(order='created')=>{const rows=(await query(`SELECT t.*,(SELECT name FROM ideafix.users WHERE id=t.author AND NOT t.anonymous) AS author_name FROM ideafix.tickets t WHERE ${ticketVisibilitySql('t',{viewer:'$1',top:'$2',department:'$3',lead:'$4'})} ORDER BY ${order==='completed'?'t.resolved_at DESC NULLS LAST,t.created DESC,t.id DESC':'t.created DESC,t.id DESC'} LIMIT 5000`,[u.id,top,u.department,u.role==='lead'])).rows;return rows.filter(t=>visible(u,t))};
 if(url.pathname==='/api/upgrade/similar'){
  if(req.method!=='POST')fail(405,'Используйте POST');const b=await body(req);const text=String(b.text||'').slice(0,5000);if(text.length<10)return send([]);
  const rows=await scoped();return send(rows.filter(t=>t.published&&!t.anonymous).map(t=>({id:t.id,title:t.title,score:similarity(text,t.body),canJoin:true})).filter(x=>x.score>=.3).sort((a,b)=>b.score-a.score).slice(0,5));
 }
 const join=url.pathname.match(/^\/api\/upgrade\/tickets\/(\d+)\/join$/);
 if(join){if(req.method!=='POST')fail(405,'Используйте POST');const t=await ticket(+join[1]);if(!visible(u,t)||!t.published||t.anonymous)fail(404,'Обращение недоступно для присоединения');await query('INSERT INTO ideafix.ticket_followers(ticket,user_id) VALUES($1,$2) ON CONFLICT DO NOTHING',[t.id,u.id]);return send({ok:true,message:'Вы присоединились. Изменения появятся в уведомлениях.'})}
 if(url.pathname==='/api/upgrade/analytics'){if(req.method!=='GET')fail(405,'Используйте GET');if(!['director','admin','lead'].includes(u.role))fail(403,'Аналитика доступна руководителям');await sweepOverdue(query);return send(analytics(await scoped()))}
 if(url.pathname==='/api/upgrade/improvements'){if(req.method!=='GET')fail(405,'Используйте GET');const rows=sortImprovements((await scoped('completed')).filter(t=>t.published&&t.status==='done'&&t.result)).map(t=>({id:t.id,title:t.title,result:t.result,department:t.department,author:t.anonymous?'Анонимно':t.author_name,created:t.created,resolved_at:t.resolved_at,days:t.resolved_at?businessDaysBetween(t.created,t.resolved_at):null}));return send({items:rows,total:rows.length,quarter:rows.filter(t=>{const d=new Date(t.resolved_at),n=new Date();return d.getFullYear()===n.getFullYear()&&Math.floor(d.getMonth()/3)===Math.floor(n.getMonth()/3)}).length})}
 if(url.pathname==='/api/upgrade/notifications'){
  if(req.method==='POST'){await query('UPDATE ideafix.inbox_events SET read_at=now() WHERE user_id=$1 AND read_at IS NULL',[u.id]);return send({ok:true})}if(req.method!=='GET')fail(405,'Метод недоступен');
  await sweepOverdue(query);const rows=(await query('SELECT n.id AS notification_id,n.ticket,n.kind AS notification_kind,n.title AS notification_title,n.created AS notification_created,n.read_at,t.* FROM ideafix.inbox_events n JOIN ideafix.tickets t ON t.id=n.ticket WHERE n.user_id=$1 ORDER BY n.id DESC LIMIT 100',[u.id])).rows;
  return send(rows.filter(t=>visible(u,t)).map(t=>({id:t.notification_id,ticket:t.ticket,kind:t.notification_kind,title:t.notification_title,created:t.notification_created,read_at:t.read_at})));
 }
 if(url.pathname==='/api/upgrade/routing'){
  if(!top)fail(403,'Правила маршрутизации доступны руководству');
  if(req.method==='PUT'){const b=await body(req);if(!['ИТ','Закупки','Продажи','Склад','Логистика','HR','Руководство'].includes(b.department)||!['*','idea','problem','praise'].includes(b.kind))fail(400,'Выберите отдел и категорию');for(const k of ['response_days','resolution_days'])if(!Number.isInteger(+b[k])||+b[k]<1||+b[k]>90)fail(400,'Срок: от 1 до 90 рабочих дней');
   for(const id of [b.owner,b.backup].filter(Boolean)){const person=(await query('SELECT * FROM ideafix.users WHERE id=$1',[id])).rows[0];if(!person||!['lead','director','admin'].includes(person.role)||(person.role==='lead'&&person.department!==b.department))fail(400,'Ответственный должен быть руководителем выбранного отдела')}
   await query('INSERT INTO ideafix.routing_rules(department,kind,owner,backup,response_days,resolution_days) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(department,kind) DO UPDATE SET owner=excluded.owner,backup=excluded.backup,response_days=excluded.response_days,resolution_days=excluded.resolution_days',[b.department,b.kind,b.owner||null,b.backup||null,+b.response_days,+b.resolution_days]);return send({ok:true});
  }if(req.method!=='GET')fail(405,'Метод недоступен');return send({rules:(await query('SELECT r.*,u.name AS owner_name,b.name AS backup_name FROM ideafix.routing_rules r LEFT JOIN ideafix.users u ON u.id=r.owner LEFT JOIN ideafix.users b ON b.id=r.backup ORDER BY r.department,r.kind')).rows,people:(await query("SELECT id,name,role,department,unavailable_until FROM ideafix.users WHERE role IN ('lead','director','admin') ORDER BY department,name")).rows});
 }
 if(url.pathname==='/api/upgrade/availability'){
  if(req.method!=='PUT')fail(405,'Используйте PUT');const b=await body(req),id=b.user_id||u.id;if(id!==u.id&&!top)fail(403,'Можно менять только своё отсутствие');const until=b.until?new Date(b.until):null;if(until&&(!Number.isFinite(+until)||+until>Date.now()+366*86400000))fail(400,'Проверьте дату отсутствия');await query('UPDATE ideafix.users SET unavailable_until=$1 WHERE id=$2',[until,id]);return send({ok:true})
 }
 const assign=url.pathname.match(/^\/api\/upgrade\/tickets\/(\d+)\/assign$/);
 if(assign){if(req.method!=='PUT')fail(405,'Используйте PUT');const t=await ticket(+assign[1]);if(!manage(u,t))fail(403,'Нет доступа');const b=await body(req),p=(await query('SELECT * FROM ideafix.users WHERE id=$1',[b.assignee_id])).rows[0];if(!p||!['director','admin','lead'].includes(p.role)||(p.role==='lead'&&p.department!==t.department))fail(400,'Выберите руководителя этого отдела');const updated=await query("UPDATE ideafix.tickets SET assignee_id=$1,assignment_reason='Назначено руководителем' WHERE id=$2 AND version=$3 RETURNING id",[p.id,t.id,b.version]);if(!updated.rowCount)fail(409,'Заявка изменилась. Откройте её заново.');return send({ok:true})}
 if(url.pathname==='/api/upgrade/integration-log'){
  if(!top)fail(403,'Журнал доступен руководству');if(req.method!=='GET')fail(405,'Используйте GET');return send({mode:'simulation',message:'Журнал событий для интеграции. Внешняя отправка не включена; события не передаются в Битрикс24 автоматически.',items:(await query('SELECT o.id,o.ticket,o.event,o.status,o.attempts,o.created FROM ideafix.integration_outbox o ORDER BY o.id DESC LIMIT 100')).rows.filter(o=>Number.isInteger(o.ticket))})
 }
 return false;
}

// Durable outbox with leased claims and bounded retry. The default transport is
// an explicit simulation: no network requests or employee messages are sent.
export async function processOutbox(query,transport=async()=>({mode:'simulated'})){
 const jobs=(await query(`WITH ready AS (SELECT id FROM ideafix.integration_outbox WHERE (status='prepared' OR (status='processing' AND locked_until<now())) AND next_attempt_at<=now() AND attempts<5 ORDER BY id FOR UPDATE SKIP LOCKED LIMIT 20) UPDATE ideafix.integration_outbox o SET status='processing',locked_until=now()+interval '2 minutes',attempts=attempts+1 FROM ready WHERE o.id=ready.id RETURNING o.id,o.ticket,o.event,o.attempts`)).rows;
 for(const job of jobs){try{const outcome=await transport(job);await query("UPDATE ideafix.integration_outbox SET status=$2,locked_until=NULL,last_error='' WHERE id=$1 AND status='processing'",[job.id,outcome.mode==='simulated'?'simulated':'sent'])}catch{await query("UPDATE ideafix.integration_outbox SET status=CASE WHEN attempts>=5 THEN 'failed' ELSE 'prepared' END,locked_until=NULL,last_error='Временная ошибка транспорта',next_attempt_at=now()+($2 * interval '1 second') WHERE id=$1",[job.id,Math.min(3600,30*2**job.attempts)])}}
 return {processed:jobs.length,mode:transport.name||'simulation'};
}

// Known completion dates lead; undated legacy records follow, newest creation first.
export function sortImprovements(rows){return [...rows].sort((a,b)=>{const x=a.resolved_at?Date.parse(a.resolved_at):NaN,y=b.resolved_at?Date.parse(b.resolved_at):NaN;if(Number.isFinite(x)!==Number.isFinite(y))return Number.isFinite(x)?-1:1;if(Number.isFinite(x)&&x!==y)return y-x;return (Date.parse(b.created)||0)-(Date.parse(a.created)||0)||Number(b.id)-Number(a.id)})}

