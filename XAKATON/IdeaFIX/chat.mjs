import {mirrorChat} from './chat-channels.mjs';
export async function handleChat({url,req,u,body,query,send,fail}){
 if(url.pathname!=='/api/leadership-chat')return false;
 if(!['director','lead'].includes(u.role))fail(403,'Чат доступен директору и руководителям отделов');
 if(req.method==='POST'){const b=await body(req);if(typeof b.text!=='string'||b.text.trim().length<1||b.text.length>3000)fail(400,'Сообщение: от 1 до 3000 символов');const row=(await query('INSERT INTO ideafix.leadership_chat(author,text,urgent) VALUES($1,$2,$3) RETURNING id,created',[u.id,b.text.trim(),!!b.urgent])).rows[0];const delivery=await mirrorChat({message:{...row,text:b.text.trim(),urgent:!!b.urgent,name:u.name,role:u.role},query});send({...row,delivery},201);return true}
 if(req.method!=='GET')fail(405,'Метод недоступен');const after=Number(url.searchParams.get('after')||0);if(!Number.isSafeInteger(after)||after<0)fail(400,'Неверный номер сообщения');
 const rows=(await query(`SELECT c.id,c.author,c.text,c.urgent,c.created,(SELECT coalesce(json_agg(json_build_object('provider',d.provider,'status',d.status)),'[]') FROM ideafix.chat_deliveries d WHERE d.message_id=c.id) AS delivery,u.name,u.department,u.role FROM ideafix.leadership_chat c JOIN ideafix.users u ON u.id=c.author WHERE c.id>$1 ORDER BY c.id ${after?'ASC':'DESC'} LIMIT 100`,[after])).rows;
 send(after?rows:rows.reverse());return true;
}
