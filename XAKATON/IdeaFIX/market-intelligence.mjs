import {getNewsForCompany,parseCompanyNews} from './company-news.mjs';
import {readFile} from 'node:fs/promises';
const catalog=JSON.parse(await readFile(new URL('./catalog.json',import.meta.url),'utf8'));
const listed=[
 {name:'Honeywell',ticker:'HON',exchange:'NASDAQ',symbol:'HON'},
 {name:'Siemens',ticker:'SIE.DE',exchange:'XETRA',symbol:'SIE.DE'},
 {name:'Johnson Controls',ticker:'JCI',exchange:'NYSE',symbol:'JCI'},
 {name:'Schneider Electric',ticker:'SU.PA',exchange:'Euronext Paris',symbol:'SU.PA'},
 {name:'ABB',ticker:'ABBN.SW',exchange:'SIX Swiss Exchange',symbol:'ABBN.SW'},
 {name:'Eaton',ticker:'ETN',exchange:'NYSE',symbol:'ETN'},
 {name:'Carrier Global',ticker:'CARR',exchange:'NYSE',symbol:'CARR'},
 {name:'Halma',ticker:'HLMA.L',exchange:'London Stock Exchange',symbol:'HLMA.L'},
 {name:'Hochiki',ticker:'6745.T',exchange:'Tokyo Stock Exchange',symbol:'6745.T'}
];
const technologyTopics=[
 ['ИИ-видеоаналитика','AI video surveillance analytics security'],
 ['Облачный контроль доступа','cloud access control physical security'],
 ['Защита периметра','perimeter intrusion detection sensors'],
 ['Пожарная автоматика','fire detection smart building sensors'],
 ['Умные здания','smart buildings BMS IoT'],
 ['Кибербезопасность OT','operational technology OT cybersecurity'],
 ['Роботизация охраны','security patrol robotics'],
 ['Биометрия','biometrics access control privacy'],
 ['Цифровые двойники','digital twins facilities infrastructure'],
 ['Предиктивное обслуживание','predictive maintenance sensors buildings']
];
const memo=new Map();
function classify(articles){
 const text=articles.map(a=>a.title+' '+a.excerpt).join(' ').toLowerCase();
 const adverse=/sanction|санкци|банкрот|fraud|мошеннич|отзыв лицензи|regulatory fine|штраф|recall|отзыв продукц|data breach|утечк|lawsuit|судебн/.test(text);
 const growth=/расширени|инвестиц|partnership|партнёрств|launch|запуск|контракт|innovation|инновац/.test(text);
 return {status:!articles.length?'no_data':adverse?'review_risks':growth?'monitor_growth':'monitor',explanation:!articles.length?'Нет подтверждённых публикаций для анализа.':adverse?'В заголовках есть возможные сигналы риска — требуется проверка первоисточников.':growth?'В заголовках есть сигналы развития бизнеса — проверьте применимость к вашим проектам.':'Новостей недостаточно для решения о сотрудничестве.'};
}
async function rss(query,{fetcher=fetch,now=Date.now()}={}){
 const key='rss:'+query;const old=memo.get(key);if(old&&now-old.time<15*60000)return {...old.value,stale:false};
 try{
 const uri='https://news.google.com/rss/search?'+new URLSearchParams({q:query+' when:30d',hl:'ru',gl:'KZ',ceid:'KZ:ru'});
 const response=await fetcher(uri,{signal:AbortSignal.timeout(8000),headers:{accept:'application/rss+xml'}});
 if(!response.ok)throw Error('feed error');
 const xml=await response.text();if(xml.length>1500000)throw Error('feed too large');
 const articles=parseCompanyNews(xml,'').filter(x=>x.published&&new Date(x.published).getTime()>=now-31*86400000);
 const value={articles,unavailable:false};memo.set(key,{time:now,value});return {...value,stale:false};
 }catch{return old?{...old.value,stale:true}:{articles:[],unavailable:true}}
}
async function quote(item,{fetcher=fetch}={}){
 try{
 const response=await fetcher('https://query1.finance.yahoo.com/v8/finance/chart/'+encodeURIComponent(item.symbol)+'?range=5d&interval=1d',{signal:AbortSignal.timeout(6000),headers:{accept:'application/json','user-agent':'Mozilla/5.0'}});
 if(!response.ok)throw Error('quotes unavailable');
 const d=await response.json(),record=d?.chart?.result?.[0],meta=record?.meta;
 const closes=(record?.indicators?.quote?.[0]?.close||[]).filter(x=>Number.isFinite(x)&&x>0);
 if(closes.length<2)throw Error('insufficient data');
 const previous=closes[closes.length-2],price=closes[closes.length-1],change=(price-previous)/previous*100;
 return {...item,price,previous,change,currency:meta?.currency||null,asof:record.timestamp?.at(-1)?new Date(record.timestamp.at(-1)*1000).toISOString():null,status:'ok',source:'Yahoo Finance'};
 }catch{return {...item,status:'unavailable',source:'Yahoo Finance'}}
}
export async function marketIntelligence(kind,{query=null,fetcher=fetch,now=Date.now()}={}){
 if(kind==='partners'){
   const names=Array.isArray(query)?query.filter(x=>typeof x==='string'&&x.trim()).slice(0,20):[];
   const all=[...catalog.vendors.map(v=>v.name),...names];
   const unique=[...new Set(all)].slice(0,60);let next=0;
   const results=new Array(unique.length);
   const worker=async()=>{while(next<unique.length){const i=next++,name=unique[i];const item=await getNewsForCompany(name,'risk:'+name,{fetcher,now});results[i]={name,articles:item.articles,stale:!!item.stale,...classify(item.articles)}}};
   await Promise.all(Array.from({length:6},worker));
   return {items:results,disclaimer:'Показаны индикаторы по доступным заголовкам, не оценка надёжности компании. Решения о сотрудничестве требуют проверки договоров, санкционных списков, финансовых документов и первоисточников.'};
 }
 if(kind==='stocks'){
   let next=0;const items=new Array(listed.length);const worker=async()=>{while(next<listed.length){const i=next++;items[i]=await quote(listed[i],{fetcher})}};
   await Promise.all(Array.from({length:4},worker));
   return {items:[{name:'ГК Модус Трейд',status:'not_listed',ticker:null},...items,{name:'Bosch',status:'not_listed',ticker:null}],disclaimer:'Акции ГК «Модус Трейд» и Bosch не подтверждены как публично торгуемые. Котировки стороннего сервиса могут поступать с задержкой; недоступные цены не подменяются оценками.'};
 }
 if(kind==='technology'){
   let next=0;const items=new Array(technologyTopics.length);
   const worker=async()=>{while(next<technologyTopics.length){const i=next++;const [title,search]=technologyTopics[i];const feed=await rss(search,{fetcher,now});items[i]={title,articles:feed.articles.slice(0,2),unavailable:feed.unavailable}}};
   await Promise.all(Array.from({length:5},worker));
   return {items,disclaimer:'Десять направлений систем безопасности, а не рейтинг по продажам. Новости и даты — из внешних RSS.'};
 }
 if(kind==='ai-business'){
   const feeds=await Promise.all(['artificial intelligence enterprise business adoption','generative AI enterprise workflow automation','business AI agents security'].map(q=>rss(q,{fetcher,now})));
   const seen=new Set(),articles=feeds.flatMap(f=>f.articles).filter(a=>{const k=a.title.toLowerCase();if(seen.has(k))return false;seen.add(k);return true}).sort((a,b)=>new Date(b.published)-new Date(a.published)).slice(0,10);
   return {articles,unavailable:feeds.every(f=>f.unavailable),disclaimer:'До десяти последних доступных публикаций об ИИ для бизнеса. Если источники недоступны, новости не выдумываются.'};
 }
 throw Object.assign(Error('Неизвестный раздел'),{status:400});
}
export async function handleMarketIntelligence({url,req,u,query,send,fail}){
 if(url.pathname!=='/api/market-intelligence')return false;
 if(!['director','admin','lead'].includes(u.role))fail(403,'Раздел доступен руководству');
 if(req.method!=='GET')fail(405,'Требуется GET');
 const kind=url.searchParams.get('kind');
 let partners=[];
 if(kind==='partners'&&['director','admin'].includes(u.role)){
  try{partners=(await query('SELECT company FROM ideafix.partners ORDER BY company LIMIT 20')).rows.map(r=>r.company)}catch{}
 }
 send(await marketIntelligence(kind,{query:partners}));return true;
}
