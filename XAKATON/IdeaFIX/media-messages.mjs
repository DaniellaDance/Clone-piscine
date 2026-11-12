import {canMessageRecipient,isTop} from './access.mjs';
export async function handleMediaMessages({url,req,u,body,query,send,fail}) {
 const path=url.pathname;
 if(path==='/api/media-messages') {
  if(req.method==='GET') {
   const rows=await query("SELECT m.id,m.sender_id,m.recipient_id,m.media_type,m.media_url,m.transcript_status,m.created_at FROM ideafix.media_messages m JOIN ideafix.users s ON s.id=m.sender_id WHERE ($2 OR (m.recipient_id=$1 AND (s.department=$3 OR s.role IN ('director','admin')))) ORDER BY m.created_at DESC LIMIT 100",[u.id,isTop(u),u.department]);
   send(rows.rows);return true;
  }
  if(req.method!=='POST')fail(405,'Метод недоступен');
  const b=await body(req);
  if(!['audio','video'].includes(b.media_type))fail(400,'Неверный тип обращения');
  if(typeof b.recipient_id!=='string')fail(400,'Выберите получателя');
  const recipient=await query('SELECT id,role,department FROM ideafix.users WHERE id=$1',[b.recipient_id]);
  if(!recipient.rowCount)fail(404,'Получатель не найден');if(!canMessageRecipient(u,recipient.rows[0]))fail(403,'Получатель недоступен для вашей роли и отдела');
  if(typeof b.transcript!=='string'||b.transcript.trim().length<1||b.transcript.length>20000)fail(400,'Добавьте текст речи');
  const mediaUrl=b.media_url==null?null:String(b.media_url);
  if(mediaUrl&&(!mediaUrl.startsWith('/')||mediaUrl.startsWith('//')||mediaUrl.length>2000))fail(400,'Недопустимая ссылка на медиа');
  const saved=await query("INSERT INTO ideafix.media_messages(sender_id,recipient_id,media_type,media_url,transcript,transcript_status) VALUES($1,$2,$3,$4,$5,'ready') RETURNING id",[u.id,b.recipient_id,b.media_type,mediaUrl,b.transcript.trim()]);
  send({id:saved.rows[0].id},201);return true;
 }
 const match=path.match(/^\/api\/media-messages\/(\d+)\/transcript$/);
 if(match){
  if(req.method!=='GET')fail(405,'Метод недоступен');
  const result=await query(`SELECT m.transcript,m.transcript_status FROM ideafix.media_messages m JOIN ideafix.users s ON s.id=m.sender_id JOIN ideafix.users r ON r.id=m.recipient_id WHERE m.id=$1 AND ($3 OR ((m.recipient_id=$2 OR m.sender_id=$2) AND ((s.department=$4 AND r.department=$4) OR s.role IN ('director','admin') OR (r.role IN ('director','admin') AND s.department=$4))))`,[match[1],u.id,isTop(u),u.department]);
  if(!result.rowCount)fail(404,'Обращение не найдено');
  send(result.rows[0]);return true;
 }
 return false;
}
