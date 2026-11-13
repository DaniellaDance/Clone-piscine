import {handleUpgrade,sweepOverdue,processOutbox} from './upgrade.mjs';
import {handleMapDirectory,mapDirectory} from './map-directory.mjs';
import {ownerOf,privateInsight} from './ticket-access.mjs';
import {handleIdeaPrivacy} from './idea-privacy.mjs';
import {handleDemoFinances} from './demo-finances.mjs';
import {canSeeTicket,canManageRecord,canMessageRecipient,ticketVisibilitySql} from './access.mjs';
import {handleFathom,receiveFathom} from './fathom.mjs';
import {handleMeetingResults} from './meeting-results.mjs';
import {handleProjectImport} from './bitrix-project-import.mjs';
import {handleAI} from './ai-assistant.mjs';
import {handleMediaMessages} from './media-messages.mjs';
import {handleVendorWorkspace} from './vendor-workspace.mjs';
import {handleBitrixActions} from './bitrix-actions.mjs';
import {handleBitrixAccount} from './bitrix-account.mjs';
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {randomBytes,randomUUID,scryptSync,timingSafeEqual,createHash} from 'node:crypto';
import pg from 'pg';
import {handleBitrix} from './bitrix.mjs';
import {handlePilotConfig} from './pilot-bitrix.mjs';
import {validateVendorScope} from './catalog-rules.mjs';
import {handleDemo,upgradeDemoShowcase} from './demo.mjs';
import {handleChat} from './chat.mjs';
import {handleDiscussions} from './discussions.mjs';
import {handleChannelConfig} from './chat-channels.mjs';
import {handleVendorScopes} from './vendor-scopes.mjs';
import {handlePush,notifyTicket} from './push.mjs';
import {handlePlanner} from './planner.mjs';
import {proofread} from './proofread.mjs';
import {handleMeetings} from './meetings.mjs';
const catalog=JSON.parse(await readFile(new URL('./catalog.json',import.meta.url),'utf8'));
const pool=new pg.Pool({connectionString:process.env.DATABASE_URL,max:5,connectionTimeoutMillis:15000,query_timeout:30000});
pool.on('error',e=>console.error('Idle connection closed',e.code));
const query=(s,p=[])=>pool.query(s,p);
const hash=s=>createHash('sha256').update(s).digest('hex');
const password=p=>{const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(p,salt,32).toString('hex')};
const verify=(p,h)=>{const [s,k]=h.split(':');return timingSafeEqual(scryptSync(p,s,32),Buffer.from(k,'hex'))};
const fail=(status,message)=>{throw Object.assign(new Error(message),{status})};
const departments=['ИТ','Закупки','Продажи','Склад','Логистика','HR','Руководство'];
const roles=['employee','lead','director','admin'];
const labels={new:'Новое',review:'На рассмотрении',work:'В работе',clarify:'Нужно уточнение',done:'Реализовано',reject:'Отклонено'};
const staff=u=>['director','admin'].includes(u.role);
const manage=canManageRecord;
const visible=canSeeTicket;
const clean=(v,min=1,max=5000)=>{if(typeof v!=='string'||v.trim().length<min||v.length>max)fail(400,`Введите текст: от ${min} до ${max} символов`);return v.trim()};
const publicUser=u=>({id:u.id,name:u.name,role:u.role,department:u.department,login:u.login,idea_audience:u.idea_audience});
const attempts=new Map();
async function body(req,limit=30000){const chunks=[];let size=0;for await(const c of req){const bytes=Buffer.isBuffer(c)?c:Buffer.from(c);size+=bytes.length;if(size>limit)fail(413,'Слишком большой запрос');chunks.push(bytes)}try{return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}')}catch{fail(400,'Некорректный JSON')}}
async function session(req){const token=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('if_session='))?.slice(11);if(!token)return null;return (await query('SELECT u.* FROM ideafix.users u JOIN ideafix.sessions s ON s.user_id=u.id WHERE s.token=$1 AND s.expires>now()',[hash(token)])).rows[0]||null}
async function event(id,u,text,internal=false,client=pool){await client.query('INSERT INTO ideafix.events(ticket,actor,text,internal) VALUES($1,$2,$3,$4)',[id,u.name,text,internal])}
async function ticket(id){const t=(await query('SELECT * FROM ideafix.tickets WHERE id=$1',[id])).rows[0];if(!t)fail(404,'Инсайт не найден');return t}
async function detail(u,t,access=false){if(!access&&!visible(u,t))fail(403,'Нет доступа');const full=access||visible(u,t);const assigned=t.assignee_id?(await query('SELECT name FROM ideafix.users WHERE id=$1',[t.assignee_id])).rows[0]?.name:null;const events=(await query('SELECT actor,text,internal,created FROM ideafix.events WHERE ticket=$1 AND ($2 OR NOT internal) ORDER BY id',[t.id,!access&&manage(u,t)])).rows;const {author,access_hash,...safe}=t;return {...safe,assignee_name:assigned,body:full?t.body:t.title,result:t.result,events,mine:ownerOf(u,t),canEditInsight:ownerOf(u,t)&&(privateInsight(t)||t.stage==='insight'),canSetVisibility:ownerOf(u,t),canManage:!access&&manage(u,t),canSendProposal:!access&&(manage(u,t)||(!t.anonymous&&t.author===u.id)),canComment:access||manage(u,t)||t.recipient===u.id||(!t.anonymous&&t.author===u.id)};}
let upgradeTimer;
export async function closeUpgrade(){clearInterval(upgradeTimer);await pool.end()}
export async function init(){await query(await readFile(new URL('./schema.sql',import.meta.url),'utf8'));await query(await readFile(new URL('./upgrade.sql',import.meta.url),'utf8'));if(!upgradeTimer){let busy=false;upgradeTimer=setInterval(async()=>{if(busy)return;busy=true;try{await sweepOverdue(query);await processOutbox(query)}catch(e){console.error('SLA sweep failed',e.code||e.name)}finally{busy=false}},60000);upgradeTimer.unref();}await upgradeDemoShowcase(pool);if(process.env.DIRECTOR_PASSWORD){await query("INSERT INTO ideafix.users(id,login,name,password,role,department) VALUES($1,'director','Директор',$2,'director','Руководство') ON CONFLICT(login) DO NOTHING",[randomUUID(),password(process.env.DIRECTOR_PASSWORD)])}}
export const handleRequest=async(req,res)=>{const url=new URL(req.url,'http://localhost');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');res.setHeader('X-Frame-Options','SAMEORIGIN');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://tile.openstreetmap.org; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'");
const send=(data,status=200)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data))};
try{
if(!url.pathname.startsWith('/api/')){let p=url.pathname==='/'?'/index.html':decodeURIComponent(url.pathname);if(!/^\/(index\.html|mobile\.html|desktop\.html|install\.html|deployment\.json|sw\.js|manifest\.webmanifest|assets\/[\w.-]+)$/.test(p))fail(404,'Файл не найден');const f=await readFile(new URL('./public'+p,import.meta.url));const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ttf':'font/ttf','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.webmanifest':'application/manifest+json'};res.writeHead(200,{'Content-Type':mime[extname(p)]||'application/octet-stream','Cache-Control':'no-cache'});return res.end(f)}
if(await receiveFathom({url,req,query,send,fail}))return;
if(req.method!=='GET'&&req.headers.origin&&req.headers.origin!==`${req.headers['x-forwarded-proto']||'http'}://${req.headers.host}`)fail(403,'Недопустимый источник');
if(url.pathname==='/api/health'){await query('SELECT 1');return send({ok:true,version:'2.0.0',database:true})}
if(url.pathname==='/api/login'||url.pathname==='/api/register'){
const ip=req.headers['x-forwarded-for']||req.socket.remoteAddress;const a=attempts.get(ip)||{n:0,at:Date.now()};if(Date.now()-a.at>900000){a.n=0;a.at=Date.now()}a.n++;attempts.set(ip,a);if(a.n>40)fail(429,'Слишком много попыток. Попробуйте через 15 минут');
const b=await body(req),login=clean(b.login,3,80).toLowerCase(),pass=clean(b.password,3,128);let u;
if(url.pathname==='/api/register'){const name=clean(b.name,2,100),dep=departments.includes(b.department)?b.department:'ИТ';u=(await query('INSERT INTO ideafix.users(id,login,name,password,department) VALUES($1,$2,$3,$4,$5) RETURNING *',[randomUUID(),login,name,password(pass),dep])).rows[0]}else{u=(await query('SELECT * FROM ideafix.users WHERE login=$1',[login])).rows[0];if(!u||!verify(pass,u.password))fail(401,'Неверный логин или пароль')}
const token=randomBytes(32).toString('hex');await query("INSERT INTO ideafix.sessions VALUES($1,$2,now()+interval '30 days')",[hash(token),u.id]);res.setHeader('Set-Cookie',`if_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000${process.env.NODE_ENV==='production'?'; Secure':''}`);return send(publicUser(u));}
if(url.pathname==='/api/track')fail(404,'Функция недоступна');
if(false){const b=await body(req),t=await ticket(Number(b.id));if(!t.access_hash||hash(String(b.code))!==t.access_hash)fail(403,'Неверный код доступа');return send(await detail(null,t,true))}
const u=await session(req);if(!u)fail(401,'Войдите в аккаунт');
if(await handleUpgrade({url,req,u,query,pool,body,send:(...args)=>{send(...args);return true},fail,visible,manage,ticket,ticketVisibilitySql}))return;
if(await handleIdeaPrivacy({url,req,u,body,query,send,fail}))return;
if(await handleFathom({url,req,u,body,query,pool,send,fail}))return;
if(await handleMeetingResults({url,req,res,u,body,query,send,fail}))return;
if(url.pathname==='/api/me')return send({...publicUser(u),departments});
if(url.pathname==='/api/completed-kz-projects'){
 if(req.method==='GET')return send((await query('SELECT id,name,city,vendor_name,description,latitude,longitude,department FROM ideafix.completed_kz_projects WHERE ($1 OR department=$2) ORDER BY city,name',[staff(u),u.department])).rows);
 if(req.method!=='POST')fail(405,'Метод недоступен');
 if(u.role!=='director'&&u.role!=='admin')fail(403,'Проекты на карте добавляет руководство');
 const b=await body(req),name=clean(b.name,2,160),city=clean(b.city,2,120),lat=Number(b.latitude),lng=Number(b.longitude);
 if(!Number.isFinite(lat)||lat<40||lat>56||!Number.isFinite(lng)||lng<46||lng>88)fail(400,'Координаты должны быть в пределах Казахстана (широта 40–56, долгота 46–88)');
 const vendor=String(b.vendor_name||'').trim().slice(0,160),description=String(b.description||'').trim().slice(0,1000),done=String(b.completed_on||'').trim();
 if(done&&!/^\d{4}-\d{2}-\d{2}$/.test(done))fail(400,'Дата завершения в формате ГГГГ-ММ-ДД');
 return send((await query('INSERT INTO ideafix.completed_kz_projects(name,city,vendor_name,description,latitude,longitude,completed_on,department) VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT(name) DO UPDATE SET city=excluded.city,vendor_name=excluded.vendor_name,description=excluded.description,latitude=excluded.latitude,longitude=excluded.longitude,completed_on=excluded.completed_on,department=excluded.department RETURNING id,name,city,vendor_name,description,latitude,longitude',[name,city,vendor,description,lat,lng,done||null,departments.includes(b.department)?b.department:''])).rows[0],201);
}
if(url.pathname==='/api/regular-clients'){
 if(u.role!=='director'&&u.role!=='admin')fail(403,'Справочник клиентов доступен руководству');
 if(req.method==='GET')return send((await query('SELECT id,company,contact_name,contact_email,notes,city,latitude,longitude FROM ideafix.regular_clients ORDER BY company')).rows);
 if(req.method==='POST'){const b=await body(req);const coords=[b.latitude,b.longitude].map(v=>v===''||v==null?null:Number(v));if(coords.some((n,i)=>n!==null&&(!Number.isFinite(n)||Math.abs(n)>(i?180:90))))fail(400,'Проверьте координаты точки клиента');const company=clean(b.company,2,120),contact=String(b.contact_name||'').trim().slice(0,120),email=String(b.contact_email||'').trim().slice(0,200),notes=String(b.notes||'').trim().slice(0,500),city=String(b.city||'').trim().slice(0,120);if(email&&!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email))fail(400,'Проверьте email');return send((await query('INSERT INTO ideafix.regular_clients(company,contact_name,contact_email,notes,city,latitude,longitude) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id,company,contact_name,contact_email,notes,city,latitude,longitude',[company,contact,email,notes,city,coords[0],coords[1]])).rows[0],201)}
 fail(405,'Метод недоступен');
}
if(url.pathname==='/api/partners'){
 if(u.role!=='director'&&u.role!=='admin')fail(403,'Список партнёров доступен руководству');
 if(req.method==='GET')return send((await query('SELECT id,company,contact_name,contact_email FROM ideafix.partners ORDER BY company,contact_name')).rows);
 if(req.method==='POST'){const b=await body(req),company=clean(b.company,2,120),contact=clean(b.contact_name,2,120),email=clean(b.contact_email,5,200);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))fail(400,'Проверьте email партнёра');return send((await query('INSERT INTO ideafix.partners(company,contact_name,contact_email) VALUES($1,$2,$3) RETURNING id,company,contact_name,contact_email',[company,contact,email])).rows[0],201)}
 fail(405,'Метод недоступен');
}
const partnerRoute=url.pathname.match(/^\/api\/tickets\/(\d+)\/partner-send$/);
if(partnerRoute){
 if(u.role!=='director'&&u.role!=='admin')fail(403,'Отправка партнёрам доступна руководству');
 if(req.method!=='POST')fail(405,'Метод недоступен');
 const t=await ticket(Number(partnerRoute[1]));if(!visible(u,t))fail(403,'Нет доступа');
 const b=await body(req),partner=(await query('SELECT * FROM ideafix.partners WHERE id=$1',[Number(b.partner_id)])).rows[0];if(!partner)fail(404,'Партнёр не найден');
 const result=(await query("INSERT INTO ideafix.partner_outbox(ticket,partner,sender,status) VALUES($1,$2,$3,'prepared') RETURNING id",[t.id,partner.id,u.id])).rows[0];
 return send({id:result.id,status:'prepared',message:'Подготовлено к отправке. Для доставки партнёру требуется подключённый почтовый канал.',contact_email:partner.contact_email},201);
}

const fileRoute=url.pathname.match(/^\/api\/tickets\/(\d+)\/files(?:\/(\d+))?$/);
if(fileRoute){
 const t=await ticket(Number(fileRoute[1]));if(!visible(u,t))fail(403,'Нет доступа к вложениям');
 if(req.method==='GET'&&fileRoute[2]){
  const f=(await query('SELECT filename,mime,bytes FROM ideafix.ticket_files WHERE id=$1 AND ticket=$2',[fileRoute[2],t.id])).rows[0];
  if(!f)fail(404,'Файл не найден');
  res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Disposition':"attachment; filename*=UTF-8''"+encodeURIComponent(f.filename),'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'});res.end(f.bytes);return;
 }
 if(req.method==='GET'){const files=(await query('SELECT id,filename,mime,octet_length(bytes) AS size,summary FROM ideafix.ticket_files WHERE ticket=$1 ORDER BY id',[t.id])).rows;return send(files)}
 if(req.method==='POST'&&!fileRoute[2]){
  if(!manage(u,t)&&t.author!==u.id)fail(403,'Добавлять вложения может автор или ответственный');
  const b=await body(req,4200000),filename=clean(b.filename,1,160).replace(/[\\/\r\n]/g,'_'),mime=String(b.mime||'application/octet-stream').slice(0,100);
  if(!/\.(pdf|docx?|xlsx?|pptx?|txt|csv|json|png|jpe?g|webp|mp3|wav|mp4|webm)$/i.test(filename))fail(400,'Этот тип вложения не разрешён');if(!/^[a-z\d.+-]+\/[a-z\d.+-]+$/i.test(mime))fail(400,'Неверный формат файла');
  if(typeof b.base64!=='string'||!b.base64.length||b.base64.length>2800000||!/^[A-Za-z0-9+/]+={0,2}$/.test(b.base64))fail(400,'Файл должен быть не более 2 МБ');
  const bytes=Buffer.from(b.base64,'base64');if(!bytes.length||bytes.length>2097152)fail(413,'Максимальный размер файла — 2 МБ');
  const count=(await query('SELECT count(*)::int AS n FROM ideafix.ticket_files WHERE ticket=$1',[t.id])).rows[0].n;if(count>=3)fail(400,'Не более 3 файлов на заявку');
  const summary=typeof b.summary==='string'?b.summary.trim().slice(0,350):'';
  const row=(await query('INSERT INTO ideafix.ticket_files(ticket,filename,mime,bytes,summary) VALUES($1,$2,$3,$4,$5) RETURNING id,filename,mime,octet_length(bytes) AS size,summary',[t.id,filename,mime,bytes,summary])).rows[0];return send(row,201);
 }
 fail(405,'Метод не поддерживается');
}

if(url.pathname==='/api/logout'){const tok=(req.headers.cookie||'').match(/if_session=([^;]+)/)?.[1];if(tok)await query('DELETE FROM ideafix.sessions WHERE token=$1',[hash(tok)]);res.setHeader('Set-Cookie','if_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');return send({ok:true})}
if(await handleMediaMessages({url,req,u,body,query,send,fail}))return;
if(req.method==='GET'&&url.pathname==='/api/secretary/news-topics'){
 return send({vendors:catalog.vendors.map(v=>({id:v.id,name:v.name,country:v.country})),technologies:catalog.technical.map(t=>({id:t.id,label:t.label}))});
}
if(await handleVendorWorkspace({url,req,u,query,send,fail,catalog}))return;
if(await handleBitrixActions({url,req,u,body,send,fail,query,manage}))return;
if(await handleDemoFinances({url,req,u,query,send,fail}))return;
if(await handleProjectImport({url,req,u,body,query,send,fail}))return;
if(await handleBitrixAccount({url,req,u,body,send,fail,query}))return;
if(await handlePlanner({url,req,u,body:r=>body(r,600000),send,fail,query,pool}))return;
if(await handlePilotConfig({url,req,res,u,body,send,fail,query,manage,event}))return;
if(await handleBitrix({url,req,u,body,send,fail,query,pool,event,manage}))return;
if(url.pathname==='/api/text/prepare'){
 if(req.method!=='POST')fail(405,'Используйте POST');
 const b=await body(req);
 const admitted=await query(`INSERT INTO ideafix.text_check_limits(user_id,window_start,n) VALUES($1,now(),1) ON CONFLICT(user_id) DO UPDATE SET n=CASE WHEN ideafix.text_check_limits.window_start<now()-interval '1 minute' THEN 1 ELSE ideafix.text_check_limits.n+1 END,window_start=CASE WHEN ideafix.text_check_limits.window_start<now()-interval '1 minute' THEN now() ELSE ideafix.text_check_limits.window_start END WHERE ideafix.text_check_limits.window_start<now()-interval '1 minute' OR ideafix.text_check_limits.n<12 RETURNING n`,[u.id]);
 if(!admitted.rowCount){res.setHeader('Retry-After','60');fail(429,'Слишком много проверок. Повторите через минуту')}
 return send(await proofread(b.text,b.language||'ru'));
}
if(await handleMeetings({url,req,res,u,body,send,fail,query,manage,event,catalog}))return;
if(url.pathname==='/api/settings'){
if(req.method==='PUT'){if(!staff(u))fail(403,'Нет доступа');const b=await body(req);for(const key of ['high','medium','low'])if(!Number.isInteger(b[key])||b[key]<1||b[key]>720)fail(400,'Срок: 1–720 часов');await query('UPDATE ideafix.settings SET data=$1 WHERE id=1',[JSON.stringify({high:b.high,medium:b.medium,low:b.low})])}return send((await query('SELECT data FROM ideafix.settings WHERE id=1')).rows[0].data)}
if(await handlePush({url,req,u,body,send,fail,query}))return;
if(await handleVendorScopes({url,req,u,body,send,fail,query,catalog}))return;
if(await handleChannelConfig({url,req,u,body,send,fail,query}))return;
if(await handleChat({url,req,u,body,query,send,fail}))return;
if(await handleDiscussions({url,req,u,body,query,pool,send,fail,res}))return;
if(await handleAI({url,req,u,body,query,send,fail}))return;
if(await handleDemo({url,req,u,send,fail,pool,password,randomUUID}))return;
if(url.pathname==='/api/directory'){if(req.method!=='GET')fail(405,'Метод недоступен');const rows=(await query(`SELECT id,name,role,department FROM ideafix.users WHERE ($1 OR department=$2 OR ($3 AND role IN ('director','admin'))) ORDER BY department,role,name LIMIT 1000`,[staff(u),u.department,u.role==='lead'])).rows;return send(rows.map(person=>({...person,canMessage:canMessageRecipient(u,person)})))}
if(url.pathname==='/api/users'){if(!staff(u))fail(403,'Нет доступа');if(req.method==='PUT'){const b=await body(req);if(!roles.includes(b.role)||!departments.includes(b.department))fail(400,'Проверьте роль и отдел');const old=(await query('SELECT * FROM ideafix.users WHERE id=$1',[b.id])).rows[0];if(!old)fail(404,'Пользователь не найден');if(old.role==='director'&&b.role!=='director')fail(400,'Директора нельзя понизить');if(u.role!=='director')fail(403,'Роли назначает директор');await query('UPDATE ideafix.users SET role=$1,department=$2 WHERE id=$3',[b.role,b.department,b.id])}return send((await query('SELECT id,login,name,role,department FROM ideafix.users ORDER BY name LIMIT 300')).rows)}
if(await handleMapDirectory({url,req,u,body,query,send,fail,catalog}))return;
if(url.pathname==='/api/tickets'){
if(req.method==='POST'){const admitted=await query(`INSERT INTO ideafix.creation_limits(user_id,window_start,n) VALUES($1,now(),1) ON CONFLICT(user_id) DO UPDATE SET n=CASE WHEN ideafix.creation_limits.window_start<now()-interval '1 minute' THEN 1 ELSE ideafix.creation_limits.n+1 END,window_start=CASE WHEN ideafix.creation_limits.window_start<now()-interval '1 minute' THEN now() ELSE ideafix.creation_limits.window_start END WHERE ideafix.creation_limits.window_start<now()-interval '1 minute' OR ideafix.creation_limits.n<10 RETURNING n`,[u.id]);if(!admitted.rowCount)fail(429,'Не более 10 обращений в минуту');const b=await body(req);for(const [key,group] of [['vendor_id','vendors'],['industry_id','industry'],['technical_id','technical']])if(b[key]&&!catalog[group].some(x=>x.id===b[key]))fail(400,'Выберите область из справочника');if(b.offering_id&&!b.vendor_id)fail(400,'Выберите вендора продукта');const scope=b.vendor_id?(await query('SELECT industry_ids FROM ideafix.vendor_scopes WHERE vendor_id=$1',[b.vendor_id])).rows[0]:null;validateVendorScope(scope?{...catalog,vendors:catalog.vendors.map(v=>v.id===b.vendor_id?{...v,industry:scope.industry_ids}:v)}:catalog,b);if(b.entry_type&&!['insight','request','proposal'].includes(b.entry_type))fail(400,'Неизвестный тип записи');let recipient=null;if(b.recipient_id){recipient=(await query('SELECT id,department,role FROM ideafix.users WHERE id=$1',[b.recipient_id])).rows[0];if(!recipient)fail(400,'Выберите получателя из схемы сотрудников');if(!canMessageRecipient(u,recipient))fail(403,'Получатель недоступен для вашей роли и отдела')}const text=clean(b.body,10,5000),kind=['idea','problem','praise'].includes(b.kind)?b.kind:'problem';if(/\b(fuck|shit)\b|(?:хуй|пизд|бляд)/iu.test(text))fail(400,'Смена тона увеличит скорость обработки заявки в 2 раза');let dep=departments.includes(b.department)?b.department:(/1с|компьют|сайт|программ|доступ/iu.test(text)?'ИТ':/постав|закуп/iu.test(text)?'Закупки':/склад/iu.test(text)?'Склад':/достав|транспорт/iu.test(text)?'Логистика':u.department);if(staff(u)&&recipient)dep=recipient.department;if(!staff(u)){if(b.department&&b.department!==u.department&&b.department!==recipient?.department)fail(403,'Можно создавать записи только своего отдела');dep=u.department;}const priority=['high','medium','low'].includes(b.priority)?b.priority:'medium';const firstResponseOptions=[5,10,15,30,60,120,240,480,720,1440,2880,4320,7200,10080];
const firstResponseMinutes=Number(b.first_response_minutes||1440);
if(!firstResponseOptions.includes(firstResponseMinutes))fail(400,'Выберите допустимый срок первого ответа');
let context=null;if(b.context_id){context=(await mapDirectory({u,query,catalog})).find(x=>x.id===b.context_id);if(!context||!['vendors','partners','clients','projects'].includes(context.category))fail(403,'Клиент или проект недоступен');context={id:context.id,name:context.name,category:context.category};}
const entryType=b.entry_type||'insight',visibility=b.visibility||(entryType==='insight'&&!b.anonymous?'private':'leaders');if(!['private','leaders','department'].includes(visibility))fail(400,'Выберите видимость');if(visibility==='private'&&(b.anonymous||entryType!=='insight'))fail(400,'Личный инсайт требует автора');if(visibility==='private')recipient=null;
const settings=(await query('SELECT data FROM ideafix.settings WHERE id=1')).rows[0].data;const code=b.anonymous?randomBytes(16).toString('hex'):null;const t=(await query('INSERT INTO ideafix.tickets(author,anonymous,access_hash,title,body,kind,department,priority,due,published,idea_audience,workflow,stage) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,jsonb_build_object(\'visibility\',$12::text),$13) RETURNING *',[b.anonymous?null:u.id,!!b.anonymous,code?hash(code):null,text.slice(0,100),text,kind,dep,priority,new Date(Date.now()+settings[priority]*3600000),visibility==='department'&&kind==='idea'&&!b.anonymous,staff(u)?visibility:'department',visibility,entryType==='insight'?'insight':entryType==='proposal'?'proposal':'registration'])).rows[0];await query("UPDATE ideafix.tickets SET first_response_minutes=$1,first_response_due=ideafix.business_due(created,least($1,coalesce((SELECT response_days*1440 FROM ideafix.routing_rules WHERE department=ideafix.tickets.department AND kind IN ('*',ideafix.tickets.kind) ORDER BY (kind=ideafix.tickets.kind) DESC LIMIT 1),2880))) WHERE id=$2",[firstResponseMinutes,t.id]);await query('UPDATE ideafix.tickets SET workflow=$1,entry_type=$3,vendor_id=$4,industry_id=$5,technical_id=$6 WHERE id=$2',[JSON.stringify({insight:text,proposal:kind==='idea'?text:'Рассмотреть проблему и предложить решение',benefit:'',visibility,context}),t.id,entryType,b.vendor_id||'',b.industry_id||'',b.technical_id||'']);const offering=catalog.products.find(p=>p.id===b.offering_id);if(offering)await query('UPDATE ideafix.tickets SET offering_id=$1,offering_name=$2 WHERE id=$3',[offering.id,offering.name,t.id]);if(recipient)await query('UPDATE ideafix.tickets SET recipient=$1 WHERE id=$2',[recipient.id,t.id]);await event(t.id,{name:'Система'},'Инсайт и предложение зафиксированы');await event(t.id,{name:'Система'},'Инсайт зарегистрирован. Ответственный отдел: '+dep);if(visibility!=='private'&&t.idea_audience!=='private')await notifyTicket({query,ticketId:t.id,recipient:recipient?.id,department:dep,actor:u.id}).catch(()=>{});return send({id:t.id,code},201)}
const rows=(await query(`SELECT t.*, (SELECT name FROM ideafix.users WHERE id=t.assignee_id) AS assignee_name, (SELECT name FROM ideafix.users WHERE id=t.author AND NOT t.anonymous) AS author_name, (SELECT count(*)::int FROM ideafix.votes v WHERE v.ticket=t.id) AS votes, EXISTS(SELECT 1 FROM ideafix.votes v WHERE v.ticket=t.id AND v.voter=$1) AS voted FROM ideafix.tickets t WHERE ${ticketVisibilitySql('t',{viewer:'$1',top:'$2',department:'$3',lead:'$4'})} ORDER BY t.created DESC LIMIT 500`,[u.id,staff(u),u.department,u.role==='lead'])).rows;return send(rows.filter(t=>visible(u,t)).map(t=>{const full=visible(u,t);const {author,access_hash,body,...safe}=t;return {...safe,body:full?body:t.title,mine:author===u.id,canManage:manage(u,t)}}));}
const flow=url.pathname.match(/^\/api\/tickets\/(\d+)\/workflow$/);
if(flow&&req.method==='PUT'){
 const t=await ticket(Number(flow[1]));const ownInsight=ownerOf(u,t)&&(privateInsight(t)||t.stage==='insight');if(!manage(u,t)&&!ownInsight)fail(403,'Этапами управляет руководитель');
 const b=await body(req);if(!Number.isInteger(b.version)||b.version!==t.version)fail(409,'Заявка изменилась. Откройте её заново.');const stages=['insight','proposal','registration','discussion','evaluation','decision','pilot','implementation','result'];
 if(ownInsight&&!['insight','proposal'].includes(b.stage))fail(403,'Автор переводит инсайт в предложение');if(!stages.includes(b.stage))fail(400,'Неизвестный этап');
 const w={visibility:t.workflow?.visibility||'leaders',context:t.workflow?.context||null};if(ownInsight&&b.stage==='proposal')w.visibility='leaders';for(const key of ['insight','proposal','benefit','discussion','cost','effect','feasibility','decision','reason','pilot','pilotResult','owner','deadline','implementation','before','after','result','pilotIncome','pilotExpense','implementationIncome','implementationExpense'])w[key]=typeof b[key]==='string'?b[key].trim().slice(0,2000):'';
 for(const key of ['pilotIncome','pilotExpense','implementationIncome','implementationExpense']){if(w[key]!==''&&(!/^\d+(?:[.,]\d{1,2})?$/.test(w[key])||Number(w[key].replace(',','.'))>1000000000000))fail(400,'Укажите корректную сумму в тенге: '+key)}
 if(w.deadline&&!/^\d{4}-\d{2}-\d{2}$/.test(w.deadline))fail(400,'Проверьте срок');
 if(w.insight.length<5)fail(400,'Опишите инсайт (не менее 5 символов)');
 if(b.stage!=='insight'&&w.proposal.length<5)fail(400,'Для перехода заполните предложение (не менее 5 символов)');
 const at=stages.indexOf(b.stage),prev=stages.indexOf(t.stage);
 if(at>prev+1)fail(400,'Пройдите этапы по порядку');
 if(at>=4&&w.discussion.length<5)fail(400,'Зафиксируйте итоги обсуждения');
 if(at>=5&&(!w.cost||!w.effect||!w.feasibility))fail(400,'Заполните затраты, эффект и реализуемость');
 if(at>=6&&w.decision!=='approved')fail(400,'Для пилота необходимо принять идею');
 if(at>=6&&(!w.owner||!w.deadline||!w.pilot))fail(400,'Укажите ответственного, срок и план пилота');
 if(at>=7&&w.pilotResult.length<5)fail(400,'Зафиксируйте результат пилота');
 if(at>=8&&(!w.implementation||!w.before||!w.after||w.result.length<5))fail(400,'Заполните внедрение, показатели до и после и итог');
 if(b.stage==='decision'&&(!['approved','revise','rejected'].includes(w.decision)||w.reason.length<5))fail(400,'Выберите решение и объясните причину');
 const names=['Инсайт','Предложение','Регистрация','Обсуждение','Оценка','Решение','Пилот','Внедрение','Результат'];
 const nextStatus=w.decision==='rejected'?'reject':b.stage==='result'?'done':w.decision==='revise'?'clarify':at>=6?'work':at>=3?'review':t.status;
 const client=await pool.connect();try{await client.query('BEGIN');const changed=await client.query('UPDATE ideafix.tickets SET stage=$1,idea_audience=CASE WHEN $6 THEN $7 ELSE idea_audience END,workflow=$2,status=$3,result=$4,first_response=CASE WHEN $9 THEN coalesce(first_response,now()) ELSE first_response END,published=CASE WHEN kind=\'idea\' AND NOT anonymous AND $1 IN (\'pilot\',\'implementation\',\'result\') THEN true ELSE published END,published_at=CASE WHEN kind=\'idea\' AND NOT anonymous AND $1 IN (\'pilot\',\'implementation\',\'result\') THEN coalesce(published_at,now()) ELSE published_at END WHERE id=$5 AND version=$8 RETURNING id',[b.stage,JSON.stringify(w),nextStatus,b.stage==='result'?w.result:w.decision==='rejected'?w.reason:t.result,t.id,ownInsight&&b.stage==='proposal',staff(u)?'leaders':'department',b.version,manage(u,t)&&t.author!==u.id]);if(!changed.rowCount)fail(409,'Заявка изменилась. Откройте её заново.');await event(t.id,u,'Этап: '+names[at]+(w.reason?' · '+w.reason:''),false,client);await client.query('COMMIT')}catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}return send({ok:true});
}
const visibilityRoute=url.pathname.match(/^\/api\/tickets\/(\d+)\/visibility$/);
if(visibilityRoute&&req.method==='PUT'){const t=await ticket(+visibilityRoute[1]);if(!ownerOf(u,t))fail(403,'Видимость выбирает автор');const b=await body(req);if(!['private','leaders','department'].includes(b.visibility))fail(400,'Выберите видимость');if(b.visibility==='private'&&t.stage!=='insight')fail(400,'Личным может быть только инсайт');await query("UPDATE ideafix.tickets SET workflow=jsonb_set(workflow,'{visibility}',to_jsonb($1::text)),idea_audience=$4,published=$2,published_at=CASE WHEN $2 THEN coalesce(published_at,now()) ELSE NULL END,recipient=CASE WHEN $1='private' THEN NULL ELSE recipient END WHERE id=$3",[b.visibility,b.visibility==='department'&&t.kind==='idea',t.id,staff(u)?b.visibility:'department']);return send({ok:true})}
const match=url.pathname.match(/^\/api\/tickets\/(\d+)(?:\/(vote|comment))?$/);if(match){const t=await ticket(Number(match[1]));if(!visible(u,t))fail(403,'Нет доступа');if(match[2]==='vote'&&req.method==='POST'){if(!t.published||t.kind!=='idea')fail(400,'Голосовать можно за опубликованные идеи');await query('INSERT INTO ideafix.votes(ticket,voter) VALUES($1,$2) ON CONFLICT DO NOTHING',[t.id,u.id]);return send({ok:true})}
if(match[2]==='comment'&&req.method==='POST'){if(!manage(u,t)&&t.author!==u.id&&t.recipient!==u.id)fail(403,'Нет доступа');const b=await body(req);if(b.internal&&!manage(u,t))fail(403,'Нет доступа');await event(t.id,u,clean(b.text,2,3000),!!b.internal);if(manage(u,t))await query('UPDATE ideafix.tickets SET first_response=coalesce(first_response,now()) WHERE id=$1',[t.id]);return send({ok:true})}
if(req.method==='PATCH'){if(!manage(u,t))fail(403,'Нет доступа');const b=await body(req);if(!Number.isInteger(b.version)||b.version!==t.version)fail(409,'Заявка изменилась. Откройте её заново.');if(!labels[b.status])fail(400,'Неизвестный статус');if(b.status==='done'&&t.stage!=='result')fail(400,'Сначала завершите этапы пилота, внедрения и результата');const result=typeof b.result==='string'?b.result.trim().slice(0,3000):t.result;if(['done','reject'].includes(b.status)&&result.length<5)fail(400,'Укажите результат или причину отказа');const client=await pool.connect();try{await client.query('BEGIN');const changed=await client.query('UPDATE ideafix.tickets SET status=$1,result=$2,controlled=$3,published=$4,published_at=CASE WHEN $4 THEN coalesce(published_at,now()) ELSE published_at END,first_response=coalesce(first_response,now()) WHERE id=$5 AND version=$6 RETURNING id',[b.status,result,!!b.controlled,!!b.published&&t.kind==='idea'&&!t.anonymous,t.id,b.version]);if(!changed.rowCount)fail(409,'Заявка изменилась. Откройте её заново.');await event(t.id,u,`${labels[b.status]}${result?': '+result:''}`,false,client);await client.query('COMMIT')}catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}return send({ok:true})}return send(await detail(u,t));}
fail(404,'Маршрут не найден');
}catch(e){if(e.code==='23514')return send({error:'Проверьте данные: итог решения обязателен, значения должны соответствовать ограничениям'},400);if(e.code==='23505')return send({error:'Такой логин уже занят'},409);if(e.code==='ENOENT')console.error('Missing asset',e.path);if(e.status===404)console.error('Missing route',url.pathname);if(!e.status&&e.code!=='ENOENT')console.error('Request failed',e.code||e.name);send({error:e.status?e.message:e.code==='ENOENT'?'Файл не найден':'Сервис временно недоступен. Попробуйте ещё раз'},e.status|| (e.code==='ENOENT'?404:500))}};
export const server=http.createServer(handleRequest);
if(!process.env.NEON_FUNCTION){await init();server.listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('IdeaFix ready'));}
process.on('SIGTERM',()=>server.close(()=>pool.end().then(()=>process.exit(0))));





