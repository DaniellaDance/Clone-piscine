import {createHmac,createHash,randomBytes,timingSafeEqual} from 'node:crypto';
import {autoAttach} from './meeting-results.mjs';
const leader=u=>u&&['director','admin','lead'].includes(u.role);
const text=(v,n=100000)=>typeof v==='string'?v.slice(0,n):'';
export function verifyFathom(secret,headers,raw,now=Date.now()){
 const id=headers['webhook-id'],ts=headers['webhook-timestamp'],sig=headers['webhook-signature'];
 if(!secret?.startsWith('whsec_')||typeof id!=='string'||typeof ts!=='string'||!/^\d+$/.test(ts)||typeof sig!=='string'||Math.abs(now/1000-Number(ts))>300)return false;
 const expected=createHmac('sha256',Buffer.from(secret.slice(6),'base64')).update(`${id}.${ts}.${raw}`).digest();
 return sig.split(' ').some(s=>{if(!s.startsWith('v1,'))return false;const b=Buffer.from(s.slice(3),'base64');return b.length===expected.length&&timingSafeEqual(b,expected)});
}
export function normalizeFathom(b){
 if(!b||typeof b!=='object'||!Number.isSafeInteger(b.recording_id)||b.recording_id<1)throw Object.assign(new Error('Нет recording_id Fathom'),{status:400});
 let source='';try{const u=new URL(b.url||b.share_url);if(u.protocol==='https:'&&['fathom.video','fathom.ai','www.fathom.ai'].includes(u.hostname))source=u.href}catch{}
 const transcript=Array.isArray(b.transcript)?b.transcript.slice(0,20000).map(t=>({speaker:text(t?.speaker?.display_name,200),timestamp:text(t?.timestamp,30),text:text(t?.text,10000)})):[];
 return {recording_id:String(b.recording_id),title:text(b.meeting_title||b.title,300)||'Совещание Fathom',source_url:source,summary:text(b.default_summary?.markdown_formatted||b.summary?.markdown_formatted),transcript,action_items:Array.isArray(b.action_items)?b.action_items.slice(0,300).map(t=>({description:text(t?.description,5000),assignee:text(t?.assignee?.name,200),timestamp:text(t?.recording_timestamp,30)})):[]};
}
export async function receiveFathom({url,req,query,send,fail}){
 const match=url.pathname.match(/^\/api\/fathom\/webhook\/([a-f0-9]{48})$/);if(!match)return false;
 if(req.method!=='POST')fail(405,'Используйте POST');
 const config=(await query('SELECT owner,secret FROM ideafix.fathom_connections WHERE route=$1 AND enabled',[match[1]])).rows[0];
 if(!config?.secret)fail(404,'Подключение недоступно');
 const chunks=[];let size=0;for await(const c of req){const b=Buffer.from(c);size+=b.length;if(size>3000000)fail(413,'Запись слишком велика');chunks.push(b)}
 const raw=Buffer.concat(chunks).toString('utf8');if(!verifyFathom(config.secret,req.headers,raw))fail(401,'Неверная подпись Fathom');
 let payload;try{payload=JSON.parse(raw)}catch{fail(400,'Некорректный JSON')}
 const b=normalizeFathom(payload);
 const start=Date.parse(payload.scheduled_start_time||payload.recording_start_time);
 const scheduled=Number.isFinite(start)?new Date(start).toISOString():null;
 const meetingUrl=typeof payload.meeting_url==='string'?payload.meeting_url.slice(0,1000):'';
 await query(`INSERT INTO ideafix.fathom_recordings(owner,recording_id,title,source_url,summary,transcript,action_items) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT(owner,recording_id) DO UPDATE SET title=excluded.title,summary=CASE WHEN excluded.summary='' THEN ideafix.fathom_recordings.summary ELSE excluded.summary END,transcript=CASE WHEN excluded.transcript='[]'::jsonb THEN ideafix.fathom_recordings.transcript ELSE excluded.transcript END,action_items=CASE WHEN excluded.action_items='[]'::jsonb THEN ideafix.fathom_recordings.action_items ELSE excluded.action_items END`,[config.owner,b.recording_id,b.title,b.source_url,b.summary,JSON.stringify(b.transcript),JSON.stringify(b.action_items)]);
 const saved=(await query('UPDATE ideafix.fathom_recordings SET scheduled_start=$1,meeting_url=$2 WHERE owner=$3 AND recording_id=$4 RETURNING id,owner,title,meeting_id,scheduled_start,meeting_url',[scheduled,meetingUrl,config.owner,b.recording_id])).rows[0];
 if(saved?.id&&saved.scheduled_start)await autoAttach(query,saved);
 send({ok:true});return true;
}
export async function handleFathom({url,req,u,body,query,pool,send,fail}){
 if(!url.pathname.startsWith('/api/fathom/'))return false;
 if(!leader(u))fail(403,'Материалы Fathom доступны руководителям');
 if(url.pathname==='/api/fathom/connection'){
  if(req.method==='PUT'){
   const b=await body(req);if(b.enabled===false){await query('UPDATE ideafix.fathom_connections SET enabled=false WHERE owner=$1',[u.id]);send({enabled:false});return true}
   if(typeof b.secret!=='string'||!/^whsec_[A-Za-z0-9+/=_-]{20,200}$/.test(b.secret))fail(400,'Введите секрет подписи вебхука whsec_…');
   await query('INSERT INTO ideafix.fathom_connections(owner,route,secret,enabled) VALUES($1,$2,$3,true) ON CONFLICT(owner) DO UPDATE SET secret=excluded.secret,enabled=true',[u.id,randomBytes(24).toString('hex'),b.secret]);
  }else if(req.method!=='GET')fail(405,'Метод недоступен');
  await query('INSERT INTO ideafix.fathom_connections(owner,route) VALUES($1,$2) ON CONFLICT DO NOTHING',[u.id,randomBytes(24).toString('hex')]);
  const c=(await query('SELECT route,enabled,secret IS NOT NULL AS configured FROM ideafix.fathom_connections WHERE owner=$1',[u.id])).rows[0];send({path:'/api/fathom/webhook/'+c.route,enabled:c.enabled,configured:c.configured});return true;
 }
 if(url.pathname==='/api/fathom/recordings'&&req.method==='GET'){send((await query('SELECT id,title,created,summary<>\'\' AS has_summary FROM ideafix.fathom_recordings WHERE owner=$1 ORDER BY created DESC LIMIT 100',[u.id])).rows);return true}
 const match=url.pathname.match(/^\/api\/fathom\/recordings\/(\d+)(?:\/(transcript|save))?$/);if(!match)fail(404,'Запись не найдена');
 const r=(await query('SELECT id,recording_id,title,source_url,summary,action_items FROM ideafix.fathom_recordings WHERE id=$1 AND owner=$2',[match[1],u.id])).rows[0];if(!r)fail(404,'Запись не найдена');
 if(req.method==='GET'&&!match[2]){send(r);return true}
 if(req.method==='GET'&&match[2]==='transcript'){send({transcript:(await query('SELECT transcript FROM ideafix.fathom_recordings WHERE id=$1 AND owner=$2',[r.id,u.id])).rows[0].transcript});return true}
 if(req.method!=='POST'||match[2]!=='save')fail(405,'Метод недоступен');
 const b=await body(req);if(!['task','idea'].includes(b.kind)||typeof b.title!=='string'||b.title.trim().length<3||b.title.length>150||typeof b.description!=='string'||b.description.length>5000)fail(400,'Проверьте заголовок и описание');
 if(b.kind==='task'&&(!/^\d{4}-\d{2}-\d{2}$/.test(b.planned_for||'')||!Number.isFinite(Date.parse(b.planned_for))||new Date(b.planned_for).toISOString().slice(0,10)!==b.planned_for))fail(400,'Выберите дату плана');
 const key=createHash('sha256').update(JSON.stringify([b.kind,b.title.trim(),b.description,b.kind==='task'?b.planned_for:null,b.kind==='idea'&&b.publish===true])).digest('hex');
 const client=await pool.connect();try{
  await client.query('BEGIN');await client.query('SELECT id FROM ideafix.fathom_recordings WHERE id=$1 AND owner=$2 FOR UPDATE',[r.id,u.id]);
  const old=(await client.query('SELECT target_id FROM ideafix.fathom_outputs WHERE recording=$1 AND output_key=$2',[r.id,key])).rows[0];
  if(old){await client.query('COMMIT');send({id:old.target_id,already_saved:true});return true}
  const description=(b.description+'\n\nИсточник: '+r.title+'\n'+r.source_url).slice(0,5500);let saved;
  if(b.kind==='task')saved=(await client.query(`INSERT INTO ideafix.planner_tasks(owner,title,description,planned_for,source) VALUES($1,$2,$3,$4,'fathom') RETURNING id`,[u.id,b.title.trim(),description,b.planned_for])).rows[0];
  else saved=(await client.query(`INSERT INTO ideafix.tickets(author,title,body,kind,department,priority,due,entry_type,published,published_at,workflow) VALUES($1,$2,$3,'idea',$4,'medium',now()+interval '72 hours','insight',$5,CASE WHEN $5 THEN now() ELSE NULL END,$6) RETURNING id`,[u.id,b.title.trim(),description,u.department,b.publish===true,JSON.stringify({insight:description,proposal:description})])).rows[0];
  await client.query('INSERT INTO ideafix.fathom_outputs(recording,output_key,target_id,kind) VALUES($1,$2,$3,$4)',[r.id,key,saved.id,b.kind]);await client.query('COMMIT');send({id:saved.id},201);return true;
 }catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}
}
