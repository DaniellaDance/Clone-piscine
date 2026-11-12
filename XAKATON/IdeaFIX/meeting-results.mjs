import {canReadMeetingResult} from './access.mjs';
const canManageMeeting=(u,m)=>['director','admin'].includes(u.role)||(u.role==='lead'&&m.department===u.department);
export const normalizeTitle=s=>String(s||'').toLowerCase().replace(/\s+/g,' ').trim();
export function matchMeeting(recording,meetings){
 const start=Date.parse(recording.scheduled_start);if(!Number.isFinite(start))return null;
 const near=meetings.filter(m=>Math.abs(Date.parse(m.starts_at)-start)<=10*60000);
 const byUrl=recording.meeting_url?near.filter(m=>m.location?.trim()===recording.meeting_url.trim()):[];
 if(byUrl.length===1)return byUrl[0].id;if(byUrl.length>1)return null;
 const byTitle=near.filter(m=>normalizeTitle(m.title)===normalizeTitle(recording.title));return byTitle.length===1?byTitle[0].id:null;
}
// Extract source passages only: this does not call paid AI or invent ideas.
export function meetingIdeas(r){
 const result=[];let inside=false;
 for(const line of String(r.summary||'').split('\n')){
  if(/^#{1,6}\s/.test(line)){inside=/иде[яиюй]|предложени|ideas?|suggestions?|proposals?|recommendations?/i.test(line);continue}
  const s=line.replace(/^\s*[-*•]\s*/, '').trim();
  if(s&&(inside||/предлага[юе]|предложили|идея\s|suggest(?:ion|ed)?\b|propos(?:e|al|ed)\b|we could\b/i.test(s)))result.push({text:s,source:'Итоги Fathom'});
 }
 if(!result.length)for(const t of r.transcript||[]){if(/предлагаю|предлагаем|моя идея|есть идея|i suggest|i propose|my idea|we could/i.test(t.text||''))result.push({text:t.text,source:[t.timestamp,t.speaker].filter(Boolean).join(' · ')})}
 return result.slice(0,100);
}
export async function autoAttach(query,recording){
 if(recording.meeting_id)return recording.meeting_id;
 const meetings=(await query(`SELECT m.id,m.title,m.starts_at,m.location FROM ideafix.meetings m JOIN ideafix.users u ON u.id=$1 WHERE (m.owner=u.id OR u.role IN ('director','admin')) AND m.starts_at BETWEEN $2::timestamptz-interval '10 minutes' AND $2::timestamptz+interval '10 minutes'`,[recording.owner,recording.scheduled_start])).rows;
 const id=matchMeeting(recording,meetings);if(id)await query('UPDATE ideafix.fathom_recordings SET meeting_id=$1 WHERE id=$2 AND meeting_id IS NULL',[id,recording.id]);return id;
}
export function resultFile(r,kind){
 if(kind==='transcript')return (r.transcript||[]).map(t=>[t.timestamp,t.speaker,t.text].filter(Boolean).join(' · ')).join('\n')||'Расшифровка пока не передана Fathom.';
 if(kind==='summary')return r.summary||'Краткое описание пока не передано Fathom.';
 const ideas=meetingIdeas(r);return 'Идеи и предложения: выдержки из совещания, проверьте перед добавлением.\n\n'+(ideas.length?ideas.map((x,i)=>`${i+1}. ${x.text}\nИсточник: ${x.source}`).join('\n\n'):'Явно сформулированные идеи не найдены. Проверьте полную расшифровку.');
}
export async function handleMeetingResults({url,req,res,u,query,body,send,fail}){
 if(!url.pathname.startsWith('/api/meeting-results'))return false;
 if(!['director','admin','lead'].includes(u.role))fail(403,'Итоги доступны руководителям');
 if(url.pathname==='/api/meeting-results'&&req.method==='GET'){
  const own=(await query('SELECT id,owner,title,meeting_id,scheduled_start,meeting_url FROM ideafix.fathom_recordings WHERE owner=$1 AND meeting_id IS NULL ORDER BY created DESC LIMIT 100',[u.id])).rows;
  for(const r of own)if(r.scheduled_start)await autoAttach(query,r);
  const meeting=url.searchParams.get('meeting');if(meeting&&!/^\d+$/.test(meeting))fail(400,'Неверный номер встречи');
  send((await query(`SELECT r.id,r.title,r.created,r.meeting_id,m.title AS calendar_title,m.starts_at,m.department,r.summary<>'' AND jsonb_array_length(r.transcript)>0 AS ready FROM ideafix.fathom_recordings r LEFT JOIN ideafix.meetings m ON m.id=r.meeting_id WHERE ($2 OR (m.id IS NULL AND r.owner=$1) OR (m.id IS NOT NULL AND $3 AND m.department=$4)) AND ($5::integer IS NULL OR r.meeting_id=$5) ORDER BY coalesce(m.starts_at,r.created) DESC LIMIT 200`,[u.id,['director','admin'].includes(u.role),u.role==='lead',u.department,meeting||null])).rows);return true;
 }
 const match=url.pathname.match(/^\/api\/meeting-results\/(\d+)(?:\/(transcript|summary|ideas|link))?$/);if(!match)fail(404,'Итоги не найдены');
 const r=(await query('SELECT r.*,m.department AS meeting_department FROM ideafix.fathom_recordings r LEFT JOIN ideafix.meetings m ON m.id=r.meeting_id WHERE r.id=$1',[match[1]])).rows[0];
 if(!r||!canReadMeetingResult(u,r))fail(404,'Итоги не найдены');
 if(match[2]==='link'&&req.method==='POST'){
  if(r.owner!==u.id)fail(403,'Привязку меняет владелец записи');const b=await body(req);
  if(!Number.isSafeInteger(b.meeting_id)||b.meeting_id<1)fail(400,'Выберите встречу');
  const m=(await query('SELECT * FROM ideafix.meetings WHERE id=$1',[b.meeting_id])).rows[0];if(!m||!canManageMeeting(u,m))fail(403,'Нет доступа к встрече');
  await query('UPDATE ideafix.fathom_recordings SET meeting_id=$1 WHERE id=$2 AND owner=$3',[m.id,r.id,u.id]);send({ok:true});return true;
 }
 if(req.method!=='GET')fail(405,'Метод недоступен');
 if(match[2]){const content=[r.title,'',resultFile(r,match[2])].join('\n');res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8','Content-Disposition':`attachment; filename="meeting-${r.id}-${match[2]}.txt"`,'Cache-Control':'private, no-store'});res.end('\uFEFF'+content);return true}
 send({id:r.id,title:r.title,summary:r.summary,ideas:meetingIdeas(r),action_items:r.action_items,meeting_id:r.meeting_id,canLink:r.owner===u.id,canSave:canReadMeetingResult(u,r),ready:!!r.summary&&r.transcript.length>0,source_url:r.source_url});return true;
}
