import * as webpush from 'web-push';
const configured=()=>!!(process.env.PUSH_VAPID_PUBLIC&&process.env.PUSH_VAPID_PRIVATE);
const subject='https://br-wandering-hat-b9hqnoxc-ideafixapp.compute.c-7.eu-central-1.aws.neon.tech/';
export function validateSubscription(s){
 let u;try{u=new URL(s?.endpoint)}catch{throw Object.assign(new Error('Некорректная подписка'),{status:400})}
 const allowed=u.hostname==='fcm.googleapis.com'||u.hostname==='updates.push.services.mozilla.com'||u.hostname==='web.push.apple.com'||/^[a-z0-9.-]+\.notify\.windows\.com$/i.test(u.hostname);
 if(u.protocol!=='https:'||u.port||u.username||u.password||!allowed||u.href.length>2000||!s.keys||!/^[A-Za-z0-9_-]{80,100}={0,2}$/.test(s.keys.p256dh||'')||!/^[A-Za-z0-9_-]{20,26}={0,2}$/.test(s.keys.auth||''))throw Object.assign(new Error('Браузер вернул неподдерживаемую подписку'),{status:400});
 return {endpoint:s.endpoint,keys:{p256dh:s.keys.p256dh,auth:s.keys.auth}};
}
export async function notifyUsers(query,ids,payload,sender=webpush.sendNotification.bind(webpush)){
 if(!configured()||!ids.length)return {sent:0,failed:0};
 const rows=(await query('SELECT endpoint,subscription FROM ideafix.push_subscriptions WHERE user_id=ANY($1)',[[...new Set(ids)]])).rows;
 const results=await Promise.all(rows.map(async r=>{try{await sender(r.subscription,JSON.stringify(payload),{vapidDetails:{subject,publicKey:process.env.PUSH_VAPID_PUBLIC,privateKey:process.env.PUSH_VAPID_PRIVATE},TTL:3600,urgency:payload.urgent?'high':'normal',timeout:7000});return true}catch(e){if([404,410].includes(e.statusCode))await query('DELETE FROM ideafix.push_subscriptions WHERE endpoint=$1',[r.endpoint]);return false}}));return {sent:results.filter(Boolean).length,failed:results.filter(x=>!x).length};
}
export async function notifyTicket({query,ticketId,recipient,department,actor}){const ids=recipient?[recipient]:(await query("SELECT id FROM ideafix.users WHERE role='director' OR (role='lead' AND department=$1)",[department])).rows.map(r=>r.id);return notifyUsers(query,ids.filter(id=>id!==actor),{title:'Новый инсайт в IdeaFix',body:`Вам поступило обращение №${ticketId}`,tag:'ticket-'+ticketId,url:'/#ticket/'+ticketId})}
export async function notifyUrgentChat({query,messageId,actor}){const ids=(await query("SELECT id FROM ideafix.users WHERE (role IN ('director','admin') OR (role='lead' AND department=(SELECT department FROM ideafix.leadership_chat WHERE id=$2))) AND id<>$1",[actor,messageId])).rows.map(r=>r.id);return notifyUsers(query,ids,{title:'Срочно · IdeaFix',body:'Новое срочное сообщение директора в чате руководителей',tag:'urgent-'+messageId,url:'/#chat',urgent:true})}
export async function handlePush({url,req,u,body,send,fail,query}){
 if(!url.pathname.startsWith('/api/push/'))return false;
 if(url.pathname==='/api/push/key'&&req.method==='GET'){send({configured:configured(),publicKey:process.env.PUSH_VAPID_PUBLIC||null});return true}
 if(url.pathname==='/api/push/subscription'){
  if(req.method==='POST'){if(!configured())fail(503,'Push ещё не настроен');const s=validateSubscription(await body(req));await query('INSERT INTO ideafix.push_subscriptions(endpoint,user_id,subscription) VALUES($1,$2,$3) ON CONFLICT(endpoint) DO UPDATE SET user_id=excluded.user_id,subscription=excluded.subscription',[s.endpoint,u.id,JSON.stringify(s)]);send({ok:true});return true}
  if(req.method==='DELETE'){const b=await body(req);if(typeof b.endpoint!=='string')fail(400,'Укажите подписку');await query('DELETE FROM ideafix.push_subscriptions WHERE endpoint=$1 AND user_id=$2',[b.endpoint,u.id]);send({ok:true});return true}
 }
 if(url.pathname==='/api/push/test'&&req.method==='POST'){const result=await notifyUsers(query,[u.id],{title:'ДЕМО · IdeaFix',body:'Проверка системного уведомления на вашем устройстве',tag:'ideafix-test',url:'/'});send(result);return true}
 fail(405,'Метод недоступен');
}
