import {notifyUrgentChat} from './push.mjs';
import {departments,isTop} from './access.mjs';
export async function handleChat({url,req,u,body,query,send,fail}){
 if(url.pathname!=='/api/leadership-chat')return false;
 if(!['director','admin','lead'].includes(u.role))fail(403,'Чат доступен директору и руководителям отделов');
 if(req.method==='POST'){
  const b=await body(req);if(typeof b.text!=='string'||b.text.trim().length<1||b.text.length>3000)fail(400,'Сообщение: от 1 до 3000 символов');
  const department=isTop(u)?b.department:u.department;
  if(!departments.includes(department))fail(400,'Выберите отдел чата');
  if(!isTop(u)&&b.department&&b.department!==u.department)fail(403,'Нет доступа к чату другого отдела');
  const row=(await query('INSERT INTO ideafix.leadership_chat(author,text,urgent,department) VALUES($1,$2,$3,$4) RETURNING id,created',[u.id,b.text.trim(),!!b.urgent,department])).rows[0];
  if(b.urgent&&isTop(u))await notifyUrgentChat({query,messageId:row.id,actor:u.id}).catch(()=>{});
  // Shared external groups have no verified department membership. Keep text internal.
  send({...row,department,delivery:[]},201);return true;
 }
 if(req.method!=='GET')fail(405,'Метод недоступен');const after=Number(url.searchParams.get('after')||0);if(!Number.isSafeInteger(after)||after<0)fail(400,'Неверный номер сообщения');
 const department=isTop(u)?url.searchParams.get('department'):u.department;
 if(department&&!departments.includes(department))fail(400,'Выберите отдел чата');
 const rows=(await query(`SELECT c.id,c.author,c.text,c.urgent,c.created,c.department,u.name,u.role,'[]'::json AS delivery FROM ideafix.leadership_chat c JOIN ideafix.users u ON u.id=c.author WHERE c.id>$1 AND (($2 AND $3::text IS NULL) OR c.department=$3) ORDER BY c.id ${after?'ASC':'DESC'} LIMIT 100`,[after,isTop(u),department||null])).rows;
 send(after?rows:rows.reverse());return true;
}
