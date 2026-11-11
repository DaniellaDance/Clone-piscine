export async function handleMediaMessages({url,req,u,body,query,send,fail}) {
 const path=url.pathname;
 if(path==='/api/media-messages') {
  if(req.method==='GET') {
   const rows=await query("SELECT id,sender_id,recipient_id,media_type,media_url,transcript_status,created_at FROM ideafix.media_messages WHERE recipient_id=$1 ORDER BY created_at DESC LIMIT 100",[u.id]);
   return send(rows.rows);
  }
  if(req.method!=='POST')fail(405,'Метод недоступен');
  const b=await body(req);
  if(!['audio','video'].includes(b.media_type))fail(400,'Неверный тип обращения');
  if(typeof b.recipient_id!=='string')fail(400,'Выберите получателя');
  const recipient=await query('SELECT id FROM ideafix.users WHERE id=$1',[b.recipient_id]);
  if(!recipient.rowCount)fail(404,'Получатель не найден');
  if(typeof b.transcript!=='string'||b.transcript.trim().length<1||b.transcript.length>20000)fail(400,'Добавьте текст речи');
  const mediaUrl=b.media_url==null?null:String(b.media_url);
  if(mediaUrl&&(!mediaUrl.startsWith('/')||mediaUrl.startsWith('//')||mediaUrl.length>2000))fail(400,'Недопустимая ссылка на медиа');
  const saved=await query("INSERT INTO ideafix.media_messages(sender_id,recipient_id,media_type,media_url,transcript,transcript_status) VALUES($1,$2,$3,$4,$5,'ready') RETURNING id",[u.id,b.recipient_id,b.media_type,mediaUrl,b.transcript.trim()]);
  return send({id:saved.rows[0].id},201);
 }
 const match=path.match(/^\/api\/media-messages\/(\d+)\/transcript$/);
 if(match){
  if(req.method!=='GET')fail(405,'Метод недоступен');
  const result=await query('SELECT transcript,transcript_status FROM ideafix.media_messages WHERE id=$1 AND (recipient_id=$2 OR sender_id=$2)',[match[1],u.id]);
  if(!result.rowCount)fail(404,'Обращение не найдено');
  return send(result.rows[0]);
 }
 return false;
}
