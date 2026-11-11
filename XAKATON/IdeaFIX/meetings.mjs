import {mirrorIdea} from './bitrix-events.mjs';
const managers=u=>['director','admin','lead'].includes(u.role);
const top=u=>['director','admin'].includes(u.role);
export const canManageMeeting=(u,m)=>top(u)||(u.role==='lead'&&m.department===u.department);
export const canSeeMeeting=(u,m)=>top(u)||!m.department||m.department===u.department;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function buildSpeech(meeting,tickets){
 const date=new Intl.DateTimeFormat('ru-RU',{timeZone:'Asia/Almaty',dateStyle:'long',timeStyle:'short'}).format(new Date(meeting.starts_at));
 const lines=[`Материалы для выступления: ${meeting.title}`,`${date} · время Казахстана (UTC+5)`,meeting.location?`Место / подключение: ${meeting.location}`:'',`Подготовлено по ${tickets.length} обращениям.`, '', 'Коллеги, предлагаю рассмотреть поступившие идеи и обращения, согласовать решения и следующие шаги.'];
 const labels={new:'новое',review:'на рассмотрении',work:'в работе',clarify:'нужно уточнение',done:'реализовано',reject:'отклонено'};
 tickets.forEach((t,i)=>{const w=t.workflow||{};lines.push('',`${i+1}. Обращение №${t.id}: ${t.title}`,`Подразделение: ${t.department}. Статус: ${labels[t.status]||t.status}.`,t.body);if(w.proposal&&w.proposal!==t.body)lines.push(`Предложение: ${w.proposal}`);if(w.benefit)lines.push(`Ожидаемая польза: ${w.benefit}`);if(w.reason)lines.push(`Обоснование решения: ${w.reason}`);if(t.result)lines.push(`Зафиксированный результат: ${t.result}`);lines.push('На обсуждение: решение, ответственный и срок следующего шага.');});
 if(!tickets.length)lines.push('Повестка пока не содержит доступных обращений. Добавьте идеи или включите новые обращения.');
 lines.push('','В завершение предлагаю зафиксировать принятые решения, назначить ответственных и согласовать сроки. Результаты внесём в IdeaFix.','','Рабочий проект выступления: проверьте формулировки перед использованием.');return lines.filter(x=>x!==undefined).join('\n');
}
export async function handleMeetings({url,req,res,u,body,send,fail,query,manage,event,catalog}){
 if(!url.pathname.startsWith('/api/meetings'))return false;
 const clean=(s,max,min=0)=>{if(typeof s!=='string'||s.trim().length<min||s.length>max)fail(400,'Проверьте поля совещания');return s.trim()};
 const deps=['ИТ','Закупки','Продажи','Склад','Логистика','HR','Руководство'];
 const validate=b=>{const title=clean(b.title,150,3),location=clean(b.location||'',500),department=clean(b.department||'',100);if(department&&!deps.includes(department))fail(400,'Выберите отдел');if(!top(u)&&department!==u.department)fail(403,'Руководитель планирует встречи своего отдела');if(!['meeting','forum','call','conference'].includes(b.kind))fail(400,'Выберите тип встречи');const starts=new Date(b.starts_at);if(!Number.isFinite(starts.getTime())||starts.getUTCFullYear()<2020||starts.getUTCFullYear()>2100)fail(400,'Укажите дату и время');const vendor=clean(b.vendor_id||'',40);if(vendor&&!catalog.vendors.some(v=>v.id===vendor))fail(400,'Выберите вендора');return {title,location,department,kind:b.kind,starts_at:starts.toISOString(),vendor_id:vendor}};
 if(url.pathname==='/api/meetings'){
  if(req.method==='POST'){if(!managers(u))fail(403,'Планирование доступно руководителям');const b=validate(await body(req));const m=(await query('INSERT INTO ideafix.meetings(title,kind,starts_at,department,location,owner,vendor_id) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[b.title,b.kind,b.starts_at,b.department,b.location,u.id,b.vendor_id])).rows[0];send({...m,canManage:true},201);return true}
  if(req.method!=='GET')fail(405,'Метод недоступен');
  const month=url.searchParams.get('month');let from,to;
  if(month){if(!/^\d{4}-(0[1-9]|1[0-2])$/.test(month))fail(400,'Месяц: ГГГГ-ММ');from=new Date(month+'-01T00:00:00+05:00');const [year,number]=month.split('-').map(Number);to=new Date(Date.UTC(year,number,1)-5*3600000)}else{from=new Date(Date.now()-3600000);to=new Date(Date.now()+366*86400000)}
  const rows=(await query(`SELECT m.*, (SELECT count(*)::int FROM ideafix.meeting_agenda a JOIN ideafix.tickets t ON t.id=a.ticket_id WHERE a.meeting_id=m.id AND ($4 OR (t.department=$3 AND $5))) agenda_count FROM ideafix.meetings m WHERE starts_at >= $1 AND starts_at < $2 AND ($4 OR department='' OR department=$3) ORDER BY starts_at LIMIT 500`,[from,to,u.department,top(u),u.role==='lead'])).rows;
  send(rows.map(m=>({...m,owner:undefined,canManage:canManageMeeting(u,m),canAddAgenda:managers(u)&&canSeeMeeting(u,m)})));return true;
 }
 const match=url.pathname.match(/^\/api\/meetings\/(\d+)(?:\/(agenda|speech|print))?$/);if(!match)fail(404,'Встреча не найдена');
 const m=(await query('SELECT * FROM ideafix.meetings WHERE id=$1',[Number(match[1])])).rows[0];if(!m)fail(404,'Встреча не найдена');if(!canSeeMeeting(u,m))fail(403,'Нет доступа к встрече');
 if(!match[2]&&req.method==='PUT'){if(!canManageMeeting(u,m))fail(403,'Нет доступа к планированию');const b=validate(await body(req));const updated=(await query('UPDATE ideafix.meetings SET title=$1,kind=$2,starts_at=$3,department=$4,location=$5,vendor_id=$7 WHERE id=$6 RETURNING *',[b.title,b.kind,b.starts_at,b.department,b.location,m.id,b.vendor_id])).rows[0];send({...updated,owner:undefined,canManage:true});return true}
 if(match[2]==='agenda'&&req.method==='POST'){
  if(!managers(u)||!canSeeMeeting(u,m))fail(403,'План совещания доступен директору и руководителям');
  const b=await body(req);if(!Number.isSafeInteger(b.ticket_id)||b.ticket_id<1)fail(400,'Укажите номер обращения');const t=(await query('SELECT * FROM ideafix.tickets WHERE id=$1',[b.ticket_id])).rows[0];if(!t)fail(404,'Обращение не найдено');if(!manage(u,t))fail(403,'Нет доступа к обращению');
  const added=await query('INSERT INTO ideafix.meeting_agenda(meeting_id,ticket_id,added_by) VALUES($1,$2,$3) ON CONFLICT DO NOTHING RETURNING ticket_id',[m.id,t.id,u.id]);if(added.rowCount)await event(t.id,u,`Включено в повестку: ${m.title}`);const bitrix_sync=await mirrorIdea({query,ticket:t,u,kind:'discussion',meeting:m});send({ok:true,alreadyAdded:!added.rowCount,bitrix_sync});return true;
 }
 if(req.method!=='GET')fail(405,'Метод недоступен');
 if(!managers(u))fail(403,'Материалы доступны руководителям');
 const includeNew=url.searchParams.get('include_new')==='1';
 const rows=(await query(`SELECT t.* FROM ideafix.tickets t WHERE ($2 OR (t.department=$3 AND $4)) AND (EXISTS(SELECT 1 FROM ideafix.meeting_agenda a WHERE a.meeting_id=$1 AND a.ticket_id=t.id) OR ($5 AND t.status='new' AND ($6='' OR t.department=$6))) ORDER BY t.created,t.id`,[m.id,top(u),u.department,u.role==='lead',includeNew,m.department])).rows;
 if(match[2]==='speech'||match[2]==='print'){
  const text=buildSpeech(m,rows);
  if(match[2]==='speech'){send({meeting:{...m,owner:undefined,canManage:canManageMeeting(u,m),canAddAgenda:managers(u)&&canSeeMeeting(u,m)},text,ticket_ids:rows.map(t=>t.id),include_new:includeNew});return true}
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});res.end(`<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(m.title)} — IdeaFix</title><link rel="stylesheet" href="/assets/print.css"><script defer src="/assets/print.js"></script><body><nav><button id="print">Распечатать / сохранить PDF</button><span>Текст можно отредактировать перед печатью. Изменения остаются в этом окне.</span></nav><article contenteditable="true" aria-label="Текст выступления">${escape(text)}</article></body></html>`);return true;
 }
 send({meeting:{...m,owner:undefined,canManage:canManageMeeting(u,m),canAddAgenda:managers(u)&&canSeeMeeting(u,m)},tickets:rows.map(({id,title,body,department,status})=>({id,title,body,department,status}))});return true;
}
