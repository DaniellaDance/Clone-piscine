import {mirrorIdea} from './bitrix-events.mjs';
import {handleBitrixAccount} from './bitrix-account.mjs';
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {randomBytes,randomUUID,scryptSync,timingSafeEqual,createHash} from 'node:crypto';
import pg from 'pg';
import {handleBitrix} from './bitrix.mjs';
import {handlePilotConfig,syncPilot} from './pilot-bitrix.mjs';
import {validateVendorScope} from './catalog-rules.mjs';
import {handleDemo} from './demo.mjs';
import {handleChat} from './chat.mjs';
import {handleChannelConfig} from './chat-channels.mjs';
import {handleVendorScopes} from './vendor-scopes.mjs';
import {handlePush,notifyTicket} from './push.mjs';
import {handlePlanner} from './planner.mjs';
import {proofread} from './proofread.mjs';
import {handleMeetings} from './meetings.mjs';
const catalog=JSON.parse(await readFile(new URL('./catalog.json',import.meta.url),'utf8'));
const pool=new pg.Pool({connectionString:process.env.DATABASE_URL,max:5});
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
const manage=(u,t)=>staff(u)||(u.role==='lead'&&u.department===t.department);
const visible=(u,t)=>manage(u,t)||t.recipient===u.id||(!t.anonymous&&t.author===u.id)||t.published;
const clean=(v,min=1,max=5000)=>{if(typeof v!=='string'||v.trim().length<min||v.length>max)fail(400,`Введите текст: от ${min} до ${max} символов`);return v.trim()};
const publicUser=u=>({id:u.id,name:u.name,role:u.role,department:u.department,login:u.login});
const attempts=new Map();
async function body(req,limit=30000){const chunks=[];let size=0;for await(const c of req){const bytes=Buffer.isBuffer(c)?c:Buffer.from(c);size+=bytes.length;if(size>limit)fail(413,'Слишком большой запрос');chunks.push(bytes)}try{return JSON.parse(Buffer.concat(chunks).toString('utf8')||'{}')}catch{fail(400,'Некорректный JSON')}}
async function session(req){const token=(req.headers.cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('if_session='))?.slice(11);if(!token)return null;return (await query('SELECT u.* FROM ideafix.users u JOIN ideafix.sessions s ON s.user_id=u.id WHERE s.token=$1 AND s.expires>now()',[hash(token)])).rows[0]||null}
async function event(id,u,text,internal=false,client=pool){await client.query('INSERT INTO ideafix.events(ticket,actor,text,internal) VALUES($1,$2,$3,$4)',[id,u.name,text,internal])}
async function ticket(id){const t=(await query('SELECT * FROM ideafix.tickets WHERE id=$1',[id])).rows[0];if(!t)fail(404,'Инсайт не найден');return t}
async function detail(u,t,access=false){if(!access&&!visible(u,t))fail(403,'Нет доступа');const full=access||manage(u,t)||t.recipient===u?.id||(!t.anonymous&&t.author===u.id);const events=(await query('SELECT actor,text,internal,created FROM ideafix.events WHERE ticket=$1 AND ($2 OR NOT internal) ORDER BY id',[t.id,!access&&manage(u,t)])).rows;const {author,access_hash,...safe}=t;return {...safe,body:full?t.body:t.title,result:t.result,events,canManage:!access&&manage(u,t),canSendProposal:!access&&(manage(u,t)||(!t.anonymous&&t.author===u.id)),canComment:access||full};}
export async function init(){await query(await readFile(new URL('./schema.sql',import.meta.url),'utf8'));if(process.env.DIRECTOR_PASSWORD){await query("INSERT INTO ideafix.users(id,login,name,password,role,department) VALUES($1,'director','Директор',$2,'director','Руководство') ON CONFLICT(login) DO NOTHING",[randomUUID(),password(process.env.DIRECTOR_PASSWORD)])}}
export const handleRequest=async(req,res)=>{const url=new URL(req.url,'http://localhost');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');res.setHeader('X-Frame-Options','SAMEORIGIN');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'");
const send=(data,status=200)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data))};
try{
if(!url.pathname.startsWith('/api/')){let p=url.pathname==='/'?'/index.html':decodeURIComponent(url.pathname);if(!/^\/(index\.html|mobile\.html|desktop\.html|install\.html|sw\.js|manifest\.webmanifest|assets\/[\w.-]+)$/.test(p))fail(404,'Файл не найден');const f=await readFile(new URL('./public'+p,import.meta.url));const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.ttf':'font/ttf','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.webmanifest':'application/manifest+json'};res.writeHead(200,{'Content-Type':mime[extname(p)]||'application/octet-stream','Cache-Control':'no-cache'});return res.end(f)}
if(req.method!=='GET'&&req.headers.origin&&req.headers.origin!==`${req.headers['x-forwarded-proto']||'http'}://${req.headers.host}`)fail(403,'Недопустимый источник');
if(url.pathname==='/api/health'){await query('SELECT 1');return send({ok:true,version:'2.0.0',database:true})}
if(url.pathname==='/api/login'||url.pathname==='/api/register'){
const ip=req.headers['x-forwarded-for']||req.socket.remoteAddress;const a=attempts.get(ip)||{n:0,at:Date.now()};if(Date.now()-a.at>900000){a.n=0;a.at=Date.now()}a.n++;attempts.set(ip,a);if(a.n>40)fail(429,'Слишком много попыток. Попробуйте через 15 минут');
const b=await body(req),login=clean(b.login,3,80).toLowerCase(),pass=clean(b.password,3,128);let u;
if(url.pathname==='/api/register'){const name=clean(b.name,2,100),dep=departments.includes(b.department)?b.department:'ИТ';u=(await query('INSERT INTO ideafix.users(id,login,name,password,department) VALUES($1,$2,$3,$4,$5) RETURNING *',[randomUUID(),login,name,password(pass),dep])).rows[0]}else{u=(await query('SELECT * FROM ideafix.users WHERE login=$1',[login])).rows[0];if(!u||!verify(pass,u.password))fail(401,'Неверный логин или пароль')}
const token=randomBytes(32).toString('hex');await query("INSERT INTO ideafix.sessions VALUES($1,$2,now()+interval '30 days')",[hash(token),u.id]);res.setHeader('Set-Cookie',`if_session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000${process.env.NODE_ENV==='production'?'; Secure':''}`);return send(publicUser(u));}
if(url.pathname==='/api/track'&&req.method==='POST'){const b=await body(req),t=await ticket(Number(b.id));if(!t.access_hash||hash(String(b.code))!==t.access_hash)fail(403,'Неверный код доступа');return send(await detail(null,t,true))}
const u=await session(req);if(!u)fail(401,'Войдите в аккаунт');
if(url.pathname==='/api/me')return send({...publicUser(u),departments});
if(url.pathname==='/api/logout'){const tok=(req.headers.cookie||'').match(/if_session=([^;]+)/)?.[1];if(tok)await query('DELETE FROM ideafix.sessions WHERE token=$1',[hash(tok)]);res.setHeader('Set-Cookie','if_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');return send({ok:true})}
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
if(await handleMeetings({url,req,res,u,body,send,fail,query,manage,event}))return;
if(url.pathname==='/api/settings'){
if(req.method==='PUT'){if(!staff(u))fail(403,'Нет доступа');const b=await body(req);for(const key of ['high','medium','low'])if(!Number.isInteger(b[key])||b[key]<1||b[key]>720)fail(400,'Срок: 1–720 часов');await query('UPDATE ideafix.settings SET data=$1 WHERE id=1',[JSON.stringify({high:b.high,medium:b.medium,low:b.low})])}return send((await query('SELECT data FROM ideafix.settings WHERE id=1')).rows[0].data)}
if(await handlePush({url,req,u,body,send,fail,query}))return;
if(await handleVendorScopes({url,req,u,body,send,fail,query,catalog}))return;
if(await handleChannelConfig({url,req,u,body,send,fail,query}))return;
if(await handleChat({url,req,u,body,query,send,fail}))return;
if(await handleDemo({url,req,u,send,fail,pool,password,randomUUID}))return;
if(url.pathname==='/api/directory'){if(req.method!=='GET')fail(405,'Метод недоступен');return send((await query('SELECT id,name,role,department FROM ideafix.users ORDER BY department,role,name LIMIT 1000')).rows)}
if(url.pathname==='/api/users'){if(!staff(u))fail(403,'Нет доступа');if(req.method==='PUT'){const b=await body(req);if(!roles.includes(b.role)||!departments.includes(b.department))fail(400,'Проверьте роль и отдел');const old=(await query('SELECT * FROM ideafix.users WHERE id=$1',[b.id])).rows[0];if(!old)fail(404,'Пользователь не найден');if(old.role==='director'&&b.role!=='director')fail(400,'Директора нельзя понизить');if(u.role!=='director')fail(403,'Роли назначает директор');await query('UPDATE ideafix.users SET role=$1,department=$2 WHERE id=$3',[b.role,b.department,b.id])}return send((await query('SELECT id,login,name,role,department FROM ideafix.users ORDER BY name LIMIT 300')).rows)}
if(url.pathname==='/api/tickets'){
if(req.method==='POST'){const b=await body(req);for(const [key,group] of [['vendor_id','vendors'],['industry_id','industry'],['technical_id','technical']])if(b[key]&&!catalog[group].some(x=>x.id===b[key]))fail(400,'Выберите область из справочника');if(b.offering_id&&!b.vendor_id)fail(400,'Выберите вендора продукта');const scope=b.vendor_id?(await query('SELECT industry_ids FROM ideafix.vendor_scopes WHERE vendor_id=$1',[b.vendor_id])).rows[0]:null;validateVendorScope(scope?{...catalog,vendors:catalog.vendors.map(v=>v.id===b.vendor_id?{...v,industry:scope.industry_ids}:v)}:catalog,b);if(b.entry_type&&!['insight','request','proposal'].includes(b.entry_type))fail(400,'Неизвестный тип записи');let recipient=null;if(b.recipient_id){recipient=(await query('SELECT id,department FROM ideafix.users WHERE id=$1',[b.recipient_id])).rows[0];if(!recipient)fail(400,'Выберите получателя из схемы сотрудников')}const text=clean(b.body,10,5000),kind=['idea','problem','praise'].includes(b.kind)?b.kind:'problem';if(/\b(fuck|shit)\b|(?:хуй|пизд|бляд)/iu.test(text))fail(400,'Смена тона увеличит скорость обработки заявки в 2 раза');let dep=departments.includes(b.department)?b.department:(/1с|компьют|сайт|программ|доступ/iu.test(text)?'ИТ':/постав|закуп/iu.test(text)?'Закупки':/склад/iu.test(text)?'Склад':/достав|транспорт/iu.test(text)?'Логистика':u.department);if(recipient)dep=recipient.department;const priority=['high','medium','low'].includes(b.priority)?b.priority:'medium';const settings=(await query('SELECT data FROM ideafix.settings WHERE id=1')).rows[0].data;const code=b.anonymous?randomBytes(16).toString('hex'):null;const t=(await query('INSERT INTO ideafix.tickets(author,anonymous,access_hash,title,body,kind,department,priority,due,published) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,false) RETURNING *',[b.anonymous?null:u.id,!!b.anonymous,code?hash(code):null,text.slice(0,100),text,kind,dep,priority,new Date(Date.now()+settings[priority]*3600000)])).rows[0];await query('UPDATE ideafix.tickets SET workflow=$1,entry_type=$3,vendor_id=$4,industry_id=$5,technical_id=$6 WHERE id=$2',[JSON.stringify({insight:text,proposal:kind==='idea'?text:'Рассмотреть проблему и предложить решение',benefit:''}),t.id,b.entry_type||'insight',b.vendor_id||'',b.industry_id||'',b.technical_id||'']);const offering=catalog.products.find(p=>p.id===b.offering_id);if(offering)await query('UPDATE ideafix.tickets SET offering_id=$1,offering_name=$2 WHERE id=$3',[offering.id,offering.name,t.id]);if(recipient)await query('UPDATE ideafix.tickets SET recipient=$1 WHERE id=$2',[recipient.id,t.id]);await event(t.id,{name:'Система'},'Инсайт и предложение зафиксированы');await event(t.id,{name:'Система'},'Инсайт зарегистрирован. Ответственный отдел: '+dep);await notifyTicket({query,ticketId:t.id,recipient:recipient?.id,department:dep,actor:u.id}).catch(()=>{});const bitrix_sync=await mirrorIdea({query,ticket:{...t,offering_name:offering?.name,recipient:recipient?.id,workflow:{proposal:text}},u,kind:'idea'});return send({id:t.id,code,bitrix_sync},201)}
const rows=(await query(`SELECT t.*, (SELECT count(*)::int FROM ideafix.votes v WHERE v.ticket=t.id) AS votes, EXISTS(SELECT 1 FROM ideafix.votes v WHERE v.ticket=t.id AND v.voter=$1) AS voted FROM ideafix.tickets t WHERE ($2 OR t.recipient=$1 OR (NOT t.anonymous AND t.author=$1) OR (t.department=$3 AND $4) OR t.published) ORDER BY t.created DESC LIMIT 500`,[u.id,staff(u),u.department,u.role==='lead'])).rows;return send(rows.map(t=>{const full=manage(u,t)||t.author===u.id||t.recipient===u.id;const {author,access_hash,body,...safe}=t;return {...safe,body:full?body:t.title,mine:author===u.id,canManage:manage(u,t)}}));}
const flow=url.pathname.match(/^\/api\/tickets\/(\d+)\/workflow$/);
if(flow&&req.method==='PUT'){
 const t=await ticket(Number(flow[1]));if(!manage(u,t))fail(403,'Этапами управляет руководитель');
 const b=await body(req),stages=['insight','proposal','registration','discussion','evaluation','decision','pilot','implementation','result'];
 if(!stages.includes(b.stage))fail(400,'Неизвестный этап');
 const w={};for(const key of ['insight','proposal','benefit','discussion','cost','effect','feasibility','decision','reason','pilot','pilotResult','owner','deadline','implementation','before','after','result'])w[key]=typeof b[key]==='string'?b[key].trim().slice(0,2000):'';
 if(w.deadline&&!/^\d{4}-\d{2}-\d{2}$/.test(w.deadline))fail(400,'Проверьте срок');
 if(w.insight.length<5||w.proposal.length<5)fail(400,'Опишите инсайт и предложение');
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
 const client=await pool.connect();try{await client.query('BEGIN');await client.query('UPDATE ideafix.tickets SET stage=$1,workflow=$2,status=$3,result=$4,first_response=coalesce(first_response,now()) WHERE id=$5',[b.stage,JSON.stringify(w),nextStatus,b.stage==='result'?w.result:w.decision==='rejected'?w.reason:t.result,t.id]);await event(t.id,u,'Этап: '+names[at]+(w.reason?' · '+w.reason:''),false,client);await client.query('COMMIT')}catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}const updatedTicket={...t,stage:b.stage,workflow:w};const personal=(await query('SELECT app_user FROM ideafix.bitrix_accounts WHERE app_user=$1',[t.recipient||u.id])).rows.length;const pilot_sync=b.stage==='pilot'&&!personal?await syncPilot({ticket:updatedTicket,u,query,event}):null;const bitrix_sync=['pilot','discussion'].includes(b.stage)&&(b.stage!=='pilot'||personal||pilot_sync?.status==='not_configured')?await mirrorIdea({query,ticket:updatedTicket,u,kind:b.stage}):null;return send({ok:true,pilot_sync,bitrix_sync});
}
const match=url.pathname.match(/^\/api\/tickets\/(\d+)(?:\/(vote|comment))?$/);if(match){const t=await ticket(Number(match[1]));if(!visible(u,t))fail(403,'Нет доступа');if(match[2]==='vote'&&req.method==='POST'){if(!t.published||t.kind!=='idea')fail(400,'Голосовать можно за опубликованные идеи');await query('INSERT INTO ideafix.votes(ticket,voter) VALUES($1,$2) ON CONFLICT DO NOTHING',[t.id,u.id]);return send({ok:true})}
if(match[2]==='comment'&&req.method==='POST'){if(!manage(u,t)&&t.author!==u.id&&t.recipient!==u.id)fail(403,'Нет доступа');const b=await body(req);if(b.internal&&!manage(u,t))fail(403,'Нет доступа');await event(t.id,u,clean(b.text,2,3000),!!b.internal);if(manage(u,t))await query('UPDATE ideafix.tickets SET first_response=coalesce(first_response,now()) WHERE id=$1',[t.id]);return send({ok:true})}
if(req.method==='PATCH'){if(!manage(u,t))fail(403,'Нет доступа');const b=await body(req);if(!labels[b.status])fail(400,'Неизвестный статус');if(b.status==='done'&&t.stage!=='result')fail(400,'Сначала завершите этапы пилота, внедрения и результата');const result=typeof b.result==='string'?b.result.trim().slice(0,3000):t.result;if(['done','reject'].includes(b.status)&&result.length<5)fail(400,'Укажите результат или причину отказа');const client=await pool.connect();try{await client.query('BEGIN');await client.query('UPDATE ideafix.tickets SET status=$1,result=$2,controlled=$3,published=$4,first_response=coalesce(first_response,now()) WHERE id=$5',[b.status,result,!!b.controlled,!!b.published&&t.kind==='idea'&&!t.anonymous,t.id]);await event(t.id,u,`${labels[b.status]}${result?': '+result:''}`,false,client);await client.query('COMMIT')}catch(e){await client.query('ROLLBACK');throw e}finally{client.release()}return send({ok:true})}return send(await detail(u,t));}
fail(404,'Маршрут не найден');
}catch(e){if(e.code==='23505')return send({error:'Такой логин уже занят'},409);if(e.code==='ENOENT')console.error('Missing asset',e.path);if(e.status===404)console.error('Missing route',url.pathname);if(!e.status&&e.code!=='ENOENT')console.error('Request failed',e.code||e.name);send({error:e.status?e.message:e.code==='ENOENT'?'Файл не найден':'Сервис временно недоступен. Попробуйте ещё раз'},e.status|| (e.code==='ENOENT'?404:500))}};
export const server=http.createServer(handleRequest);
if(!process.env.NEON_FUNCTION){await init();server.listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('IdeaFix ready'));}
process.on('SIGTERM',()=>server.close(()=>pool.end().then(()=>process.exit(0))));

