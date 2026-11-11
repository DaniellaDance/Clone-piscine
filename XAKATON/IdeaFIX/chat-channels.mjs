import {bitrixCall} from './bitrix.mjs';
const providers=['bitrix','telegram','max','whatsapp'];
async function jsonFetch(url,options={}){const r=await fetch(url,{...options,redirect:'error',signal:AbortSignal.timeout(12000)});let data;try{data=await r.json()}catch{throw Object.assign(new Error('Нет подтверждения канала'),{uncertain:true})}if(!r.ok||data.ok===false||data.error)throw Object.assign(new Error('Канал отклонил запрос. Проверьте токен, права и выбранный чат.'),{definite:true});return data}
const post=(url,payload,token)=>jsonFetch(url,{method:'POST',headers:{'Content-Type':'application/json',...(token?{Authorization:token}:{})},body:JSON.stringify(payload)});
export async function verifyChannel(provider,c,query){
 if(provider==='telegram'){
  if(!/^\d+:[\w-]{20,}$/.test(c.token||'')||!/^(-\d+|@[A-Za-z0-9_]{5,})$/.test(c.chat_id||''))throw new Error('Укажите токен бота и ID закрытого группового чата руководителей');
  const d=await post(`https://api.telegram.org/bot${c.token}/getChat`,{chat_id:c.chat_id});if(!['group','supergroup'].includes(d.result?.type))throw new Error('Нужен групповой чат руководителей');return d.result.title;
 }
 if(provider==='max'){
  if(!/^-?\d+$/.test(c.chat_id||'')||typeof c.token!=='string'||c.token.length<15)throw new Error('Укажите токен MAX и ID чата руководителей');
  const d=await jsonFetch('https://platform-api2.max.ru/chats/'+encodeURIComponent(c.chat_id),{headers:{Authorization:c.token}});if(d.type!=='chat')throw new Error('Нужен групповой чат руководителей MAX');return d.title;
 }
 if(provider==='bitrix'){
  if(!/^chat[1-9]\d*$/.test(c.dialog_id||'')||!Array.isArray(c.user_ids)||!c.user_ids.length||c.user_ids.length>50||!c.user_ids.every(x=>Number.isSafeInteger(x)&&x>0))throw new Error('Укажите ID группового чата и подтверждённых получателей-руководителей');
  const b=(await query('SELECT webhook FROM ideafix.bitrix_config WHERE id=1')).rows[0];if(!b?.webhook)throw new Error('Сначала подключите Битрикс24');
  const d=await bitrixCall(b.webhook,'im.dialog.get',{DIALOG_ID:c.dialog_id});
  const members=await bitrixCall(b.webhook,'im.chat.user.list',{CHAT_ID:Number(c.dialog_id.slice(4))});const ids=(Array.isArray(members.result)?members.result:[]).map(x=>Number(typeof x==='object'?x.id||x.ID:x));
  if(!c.user_ids.every(id=>ids.includes(id))||!ids.every(id=>c.user_ids.includes(id)))throw new Error('Участники чата не совпадают с подтверждённым списком руководителей');return d.result?.name||d.result?.title||c.dialog_id;
 }
 if(provider==='whatsapp'){
  if(!/^v\d+\.\d+$/.test(c.version||'')||!/^\d+$/.test(c.phone_number_id||'')||typeof c.group_id!=='string'||!/^[\w=-]{5,200}$/.test(c.group_id)||typeof c.token!=='string'||c.token.length<20)throw new Error('Нужны WhatsApp Cloud API, версия API, ID номера и ID группы Groups API');
  const d=await jsonFetch(`https://graph.facebook.com/${c.version}/${encodeURIComponent(c.group_id)}`,{headers:{Authorization:'Bearer '+c.token}});return d.subject||d.name||c.group_id;
 }
 throw new Error('Неизвестный канал');
}
export function channelPayload(provider,c,message){const text=`${message.urgent?'СРОЧНО · ':''}IdeaFix · ${message.name}\n${message.text}`;if(provider==='telegram')return {url:`https://api.telegram.org/bot${c.token}/sendMessage`,body:{chat_id:c.chat_id,text,disable_notification:false}};if(provider==='max')return {url:'https://platform-api2.max.ru/messages?chat_id='+encodeURIComponent(c.chat_id),body:{text,notify:true},token:c.token};if(provider==='whatsapp')return {url:`https://graph.facebook.com/${c.version}/${c.phone_number_id}/messages`,body:{messaging_product:'whatsapp',recipient_type:'group',to:c.group_id,type:'text',text:{body:text}},token:'Bearer '+c.token};return {text}}
export async function mirrorChat({message,query,transport=post,call=bitrixCall,onlyProvider}){
 const configs=(await query('SELECT provider,config FROM ideafix.chat_channels WHERE enabled=true')).rows.filter(c=>(!onlyProvider||c.provider===onlyProvider)&&(c.provider!=='bitrix'||(message.urgent&&message.role==='director')));
 return await Promise.all(configs.map(async({provider,config:c})=>{
  const reserved=await query(`INSERT INTO ideafix.chat_deliveries(message_id,provider,status) VALUES($1,$2,'pending') ON CONFLICT(message_id,provider) DO NOTHING RETURNING message_id`,[message.id,provider]);if(!reserved.rowCount)return {provider,status:'already_attempted'};
  let status='sent',remoteId;
  try{
   if(provider==='bitrix'){
    const base=(await query('SELECT webhook FROM ideafix.bitrix_config WHERE id=1')).rows[0]?.webhook;if(!base)throw Object.assign(new Error('Not configured'),{definite:true});
    const text=channelPayload(provider,c,message).text.replace(/\[/g,'(').replace(/\]/g,')');const r=await call(base,'im.message.add',{DIALOG_ID:c.dialog_id,MESSAGE:'[B]СРОЧНО[/B]\n'+text,URL_PREVIEW:'N'});remoteId=String(r.result);
    // Notifications use stable tags; only the explicitly confirmed leadership IDs receive them.
    const results=await Promise.allSettled(c.user_ids.map(USER_ID=>call(base,'im.notify.system.add',{USER_ID,MESSAGE:text,MESSAGE_OUT:text,TAG:`IDEAFIX_URGENT_${message.id}`,SUB_TAG:'IDEAFIX_LEADERSHIP'})));if(results.some(r=>r.status==='rejected'))status='partial';
   }else{const p=channelPayload(provider,c,message),r=await transport(p.url,p.body,p.token);remoteId=String(r.result?.message_id||r.message?.body?.mid||r.messages?.[0]?.id||'accepted')}
  }catch(e){status=e.definite?'failed':'unknown'}
  await query('UPDATE ideafix.chat_deliveries SET status=$1,remote_id=$2 WHERE message_id=$3 AND provider=$4',[status,remoteId||null,message.id,provider]);return {provider,status};
 }));
}
export async function handleChannelConfig({url,req,u,body,send,fail,query}){
 if(!url.pathname.startsWith('/api/chat-channels'))return false;if(u.role!=='director')fail(403,'Каналы настраивает директор');
 if(url.pathname==='/api/chat-channels/telegram/test'&&req.method==='POST'){
  const c=(await query("SELECT title FROM ideafix.chat_channels WHERE provider='telegram' AND enabled=true")).rows[0];if(!c)fail(503,'Сначала подключите Telegram-бота и подтвердите закрытый чат руководителей');
  const b=await body(req);if(typeof b.request_key!=='string'||!/^[a-f0-9-]{36}$/.test(b.request_key))fail(400,'Нужен ключ теста');
  const reserved=await query("INSERT INTO ideafix.channel_tests(request_key,provider) VALUES($1,'telegram') ON CONFLICT DO NOTHING RETURNING request_key",[b.request_key]);if(!reserved.rowCount)fail(409,'Этот тест уже запускался. Проверьте чат Telegram: повторное сообщение не отправлено.');
  const text='ДЕМО IdeaFix: проверка доставки в закрытый чат руководителей';const m=(await query('INSERT INTO ideafix.leadership_chat(author,text,urgent) VALUES($1,$2,false) RETURNING id',[u.id,text])).rows[0];
  const delivery=await mirrorChat({message:{...m,text,name:u.name,role:u.role,urgent:false},query,onlyProvider:'telegram'});send({chat_title:c.title,message_id:m.id,delivery});return true;
 }
 if(url.pathname==='/api/chat-channels'&&req.method==='GET'){send((await query('SELECT provider,enabled,title FROM ideafix.chat_channels ORDER BY provider')).rows);return true}
 const match=url.pathname.match(/^\/api\/chat-channels\/(bitrix|telegram|max|whatsapp)$/);if(!match||req.method!=='PUT')fail(405,'Метод недоступен');const b=await body(req),provider=match[1];if(b.enabled===false){await query('UPDATE ideafix.chat_channels SET enabled=false WHERE provider=$1',[provider]);send({ok:true});return true}
 if(b.leadership_only!==true)fail(400,'Подтвердите: в выбранном чате только директор и все руководители');
 if(!b.config||typeof b.config!=='object')fail(400,'Проверьте настройки');let title;try{title=await verifyChannel(provider,b.config,query)}catch(e){fail(400,e.message)}
 if(typeof title!=='string'||!title)fail(400,'Не удалось подтвердить название чата');
 if(b.confirm_title!==title){send({verified:true,title,needs_confirmation:true});return true}
 await query('INSERT INTO ideafix.chat_channels(provider,enabled,title,config) VALUES($1,true,$2,$3) ON CONFLICT(provider) DO UPDATE SET enabled=true,title=excluded.title,config=excluded.config',[provider,title,JSON.stringify(b.config)]);send({ok:true,title});return true;
}
