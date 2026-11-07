import http from 'node:http';
import fs from 'node:fs';
import crypto from 'node:crypto';
import pg from 'pg';
import {createCorporateAdapter} from './integrations/adapters.mjs';
const port=process.env.PORT||3000;
const pool=process.env.DATABASE_URL?new pg.Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:false},max:4}):null;
const users=[
{id:'client-1',role:'client',name:'Анна Соколова',organization:'ООО СеверСтрой',department:'Клиенты'},
{id:'client-2',role:'client',name:'Михаил Орлов',organization:'АО ТехноПарк',department:'Клиенты'},
{id:'staff-1',role:'staff',name:'Иван Петров',organization:'ГК Модус Трейд',department:'Сервисный центр'},
{id:'staff-2',role:'staff',name:'Елена Ким',organization:'ГК Модус Трейд',department:'Логистика'},
{id:'manager-1',role:'manager',name:'Ольга Смирнова',organization:'ГК Модус Трейд',department:'Сервисный центр'},
{id:'director-1',role:'director',name:'Александр Волков',organization:'ГК Модус Трейд',department:'Руководство'}
];
const topics=[
['Не работает камера на складе','Сервисный центр','new','urgent','client-1','Сервисная заявка'],
['Плановое обслуживание СКУД','Сервисный центр','work','normal','client-1','Сервисная заявка'],
['Консультация по расширению системы','Продажи','resolved','normal','client-2','Техническая консультация'],
['Замена блока питания ОПС','Сервисный центр','work','urgent','client-2','Гарантия'],
['Уточнение срока поставки NVR','Логистика','new','normal','client-1','Поставка'],
['Идея: мобильные уведомления об обслуживании','Развитие и качество','new','normal','client-2','Идея'],
['Улучшить инструкцию приёмки оборудования','Развитие и качество','work','normal','staff-1','Идея'],
['Настроить удалённую диагностику камер','Сервисный центр','resolved','normal','staff-1','Внутренняя заявка'],
['Заявка на обновление каталога','Продажи','new','normal','staff-2','Внутренняя заявка'],
['Предложение: единая база ошибок регистраторов','Развитие и качество','work','normal','staff-2','Идея'],
['Проверка датчиков пожарной сигнализации','Сервисный центр','resolved','normal','client-1','Сервисная заявка'],
['Обучение работе с новой моделью контроллера','Сервисный центр','new','normal','client-2','Техническая консультация']
];
function seed(){const now=Date.now();return {users,tickets:topics.map((t,i)=>{let created=new Date(now-(i+1)*3600000).toISOString();let history=[];if(t[2]!=='new')history.push({at:new Date(now-(i+1)*3600000+1200000).toISOString(),by:'Иван Петров',label:'Взята в работу',detail:'Проверяем обращение и готовим решение'});if(t[2]==='resolved')history.push({at:new Date(now-(i+1)*3600000+2400000).toISOString(),by:'Ольга Смирнова',label:'Заявка решена',detail:'Работы выполнены, результат проверен'});return {id:'DEMO-'+String(i+1).padStart(3,'0'),title:t[0],department:t[1],status:t[2],priority:t[3],ownerId:t[4],type:t[5],author:users.find(u=>u.id===t[4]).name,description:'Демонстрационное обращение по системам безопасности. Все имена и сведения вымышлены.',created,history,demo:true}})}}
let state=seed();let ready=false;
async function init(){if(!pool){console.warn('DATABASE_URL absent; demo memory mode');ready=true;return}await pool.query("CREATE TABLE IF NOT EXISTS centre_state (id integer PRIMARY KEY CHECK(id=1),payload jsonb NOT NULL DEFAULT '{}'::jsonb,updated_at timestamptz NOT NULL DEFAULT now())");await pool.query("INSERT INTO centre_state(id,payload) VALUES(1,$1::jsonb) ON CONFLICT(id) DO NOTHING",[JSON.stringify(seed())]);let r=await pool.query('SELECT payload FROM centre_state WHERE id=1');state=r.rows[0].payload;if(!Array.isArray(state.tickets)){state=seed();await persist()}ready=true}
async function persist(){if(pool)await pool.query('UPDATE centre_state SET payload=$1::jsonb,updated_at=now() WHERE id=1',[JSON.stringify(state)])}
const sessions=new Map();const listeners=new Set();
const demoPasswords=process.env.DEMO_ACCOUNT_PASSWORDS?JSON.parse(process.env.DEMO_ACCOUNT_PASSWORDS):{};
const loginAttempts=new Map();
const passwordHash=(password,salt)=>crypto.scryptSync(password,salt,64);
const safeEqual=(a,b)=>a.length===b.length&&crypto.timingSafeEqual(a,b);
const passwordRecords=new Map(users.map(u=>{const password=demoPasswords[u.id];if(!password)return [u.id,null];const salt=crypto.randomBytes(16);return [u.id,{salt,hash:passwordHash(password,salt)}]}));
const sessionKey=(token)=>crypto.createHash('sha256').update(token||'').digest('hex');
function sessionUser(req){const token=cookie(req);if(!token)return null;const rec=sessions.get(sessionKey(token));if(!rec||rec.expires<Date.now()){if(rec)sessions.delete(sessionKey(token));return null}return users.find(u=>u.id===rec.userId)||null}
function csrfAllowed(req){const origin=req.headers.origin;if(!origin)return true;const host=req.headers.host;try{return new URL(origin).host===host}catch{return false}}

function cookie(req){return (req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('centre_session='))?.split('=')[1]}
function account(req){return sessionUser(req)}
function view(u,t){return u.role==='director'||u.role==='manager'||u.role==='staff'&&(t.ownerId===u.id||t.department===u.department)||u.role==='client'&&t.ownerId===u.id}
function edit(u,t){return u.role==='director'||u.role==='manager'}
function send(res,body,status=200,extra={}){res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...extra});res.end(JSON.stringify(body))}
function read(req){return new Promise((ok,fail)=>{let s='';req.on('data',c=>{s+=c;if(s.length>12000){fail(Error('Слишком большой запрос'));req.destroy()}});req.on('end',()=>{try{ok(JSON.parse(s))}catch{fail(Error('Неверный JSON'))}})})}
function clean(x,max=3000){return String(x??'').trim().slice(0,max)}
function abuse(x){return /(?:\\b(?:fuck|shit|bitch)\\b|бля|сука|хуй|пизд|ебан|долбо[её]б)/i.test(String(x||''))}
function notify(){for(const c of listeners){try{c.write('event: change\ndata: {}\n\n')}catch{listeners.delete(c)}}}
function statusLabel(x){return x==='work'?'Взята в работу':x==='resolved'?'Заявка решена':'Статус обновлён'}
const html=fs.readFileSync(new URL('./index.html',import.meta.url));
http.createServer(async(req,res)=>{let path=new URL(req.url,'http://localhost').pathname;try{
if(path==='/'||path==='/index.html'){res.writeHead(200,{'content-type':'text/html; charset=utf-8'});return res.end(html)}
if(path==='/pitch'){res.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-store'});return res.end(fs.readFileSync(new URL('./pitch.html',import.meta.url)))}
if(path==='/health')return send(res,{ok:ready,database:pool?'neon':'memory'},ready?200:503);
if(path==='/manifest.webmanifest')return send(res,{name:'Modus Centre',short_name:'Modus Centre',start_url:'/',display:'standalone',theme_color:'#10273f',background_color:'#ffffff',icons:[{src:'/icon.svg',sizes:'any',type:'image/svg+xml'}]},200,{'content-type':'application/manifest+json'});
if(path==='/icon.svg'){res.writeHead(200,{'content-type':'image/svg+xml'});return res.end('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect width="192" height="192" rx="36" fill="#10273f"/><text x="96" y="125" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="90" fill="white">M</text></svg>')}
if(!ready)return send(res,{error:'База данных загружается'},503);
if(path==='/api/demo-users'&&req.method==='GET')return send(res,users.filter(u=>passwordRecords.get(u.id)).map(({id,name,role,department,organization})=>({id,name,role,department,organization})));
if(['POST','PATCH','PUT','DELETE'].includes(req.method)&&!csrfAllowed(req))return send(res,{error:'Недопустимый источник запроса'},403);
if(path==='/api/login'&&req.method==='POST'){let b=await read(req);const id=clean(b.userId,100);const key=String(req.headers['x-forwarded-for']||req.socket.remoteAddress||'unknown').split(',')[0]+':'+id;const rate=loginAttempts.get(key)||{count:0,until:0};if(rate.until>Date.now())return send(res,{error:'Слишком много попыток входа. Повторите позже'},429);const u=users.find(x=>x.id===id),record=passwordRecords.get(id);const input=String(b.password||'');const valid=record&&input.length>=12&&input.length<=256&&safeEqual(passwordHash(input,record.salt),record.hash);if(!valid){rate.count++;rate.until=rate.count>=5?Date.now()+15*60*1000:0;loginAttempts.set(key,rate);return send(res,{error:'Неверный логин или пароль'},401)}loginAttempts.delete(key);const token=crypto.randomBytes(32).toString('hex');sessions.set(sessionKey(token),{userId:u.id,expires:Date.now()+8*3600*1000});return send(res,{user:u},200,{'set-cookie':'centre_session='+token+'; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800'})}
if(path==='/api/logout'&&req.method==='POST'){sessions.delete(sessionKey(cookie(req)));return send(res,{ok:true},200,{'set-cookie':'centre_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'})}
let u=account(req);if(!u)return send(res,{error:'Требуется вход в кабинет'},401);
if(path==='/api/me')return send(res,u);
if(path==='/api/integrations'&&req.method==='GET'){if(u.role!=='director')return send(res,{error:'Доступ запрещён'},403);try{const adapter=createCorporateAdapter();return send(res,{kind:adapter.kind,enabled:adapter.enabled,health:await adapter.health()})}catch(e){return send(res,{error:e.message},422)}}

if(path==='/api/events'){res.writeHead(200,{'content-type':'text/event-stream','cache-control':'no-cache, no-transform','connection':'keep-alive'});res.write(': connected\n\n');listeners.add(res);let timer=setInterval(()=>{try{res.write(': ping\n\n')}catch{}},20000);req.on('close',()=>{clearInterval(timer);listeners.delete(res)});return}
if(path==='/api/tickets'&&req.method==='GET')return send(res,state.tickets.filter(t=>view(u,t)));
if(path==='/api/tickets'&&req.method==='POST'){let b=await read(req);if(!clean(b.title,140)||!clean(b.description))return send(res,{error:'Заполните тему и описание'},400);if(abuse(b.title)||abuse(b.description))return send(res,{error:'Смена тона увеличит скорость обработки заявки в 2 раза'},422);let t={id:crypto.randomUUID(),title:clean(b.title,140),description:clean(b.description),department:clean(b.department,100),type:clean(b.type,80),priority:b.priority==='urgent'?'urgent':'normal',status:'new',ownerId:u.id,author:u.name,created:new Date().toISOString(),history:[]};state.tickets.unshift(t);await persist();notify();return send(res,{id:t.id},201)}
let m=path.match(/^\/api\/tickets\/([a-zA-Z0-9-]+)$/);if(m&&req.method==='PATCH'){let t=state.tickets.find(x=>x.id===m[1]);if(!t||!view(u,t))return send(res,{error:'Заявка не найдена'},404);let b=await read(req);if(!clean(b.detail)||abuse(b.detail))return send(res,{error:abuse(b.detail)?'Смена тона увеличит скорость обработки заявки в 2 раза':'Напишите ответ'},422);let status=clean(b.status,20);if(!['new','work','resolved'].includes(status))return send(res,{error:'Недопустимый статус'},400);if(!edit(u,t))return send(res,{error:'Изменение статуса доступно ответственным сотрудникам'},403);t.status=status;t.history.push({at:new Date().toISOString(),by:u.name,label:statusLabel(status),detail:clean(b.detail)});await persist();notify();return send(res,{ok:true})}
if(m&&req.method==='POST'&&path.endsWith('/comments'))return send(res,{error:'Неверный адрес'},404);
return send(res,{error:'Не найдено'},404)
}catch(e){console.error(e);return send(res,{error:'Ошибка сервера'},500)}}).listen(port,'0.0.0.0',()=>{init().then(()=>console.log('Modus Centre ready')).catch(e=>console.error('DB init failed',e.message))});
