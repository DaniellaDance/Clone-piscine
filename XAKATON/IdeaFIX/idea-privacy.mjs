import {isTop} from './access.mjs';
export async function handleIdeaPrivacy({url,req,u,body,query,send,fail}){
 if(url.pathname!=='/api/profile/idea-visibility')return false;
 if(!isTop(u))fail(403,'Видимость собственных идей настраивает директор');
 if(req.method==='PUT'){
  const b=await body(req);if(!['private','leaders','all'].includes(b.audience))fail(400,'Выберите, кому показывать собственные идеи');
  await query(`WITH preference AS (UPDATE ideafix.users SET idea_audience=$1 WHERE id=$2 RETURNING id) UPDATE ideafix.tickets SET idea_audience=$1,published=($1<>'private'),published_at=CASE WHEN $1<>'private' THEN coalesce(published_at,now()) ELSE published_at END WHERE author IN (SELECT id FROM preference) AND kind='idea' AND NOT anonymous`,[b.audience,u.id]);send({audience:b.audience});return true;
 }
 if(req.method!=='GET')fail(405,'Метод недоступен');
 const r=(await query('SELECT idea_audience FROM ideafix.users WHERE id=$1',[u.id])).rows[0];send({audience:r?.idea_audience||'private'});return true;
}
