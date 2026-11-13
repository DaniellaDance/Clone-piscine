import {XMLParser} from 'fast-xml-parser';
export const newsCompanies=['Honeywell','Siemens','Johnson Controls','Bosch Building Technologies','Schneider Electric','ABB','Eaton','Carrier Global','Halma','Hochiki'];
const cache=new Map(),pending=new Map();
const plain=s=>String(s??'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
export function parseCompanyNews(xml,company){
 const parsed=new XMLParser({ignoreAttributes:false,processEntities:true}).parse(xml);
 const raw=parsed?.rss?.channel?.item||[];const rows=Array.isArray(raw)?raw:[raw];const seen=new Set();
 return rows.map(item=>{const title=plain(item.title),link=plain(item.link);let url;try{url=new URL(link);if(!['http:','https:'].includes(url.protocol))return null}catch{return null}
 const published=new Date(item.pubDate);if(!title||seen.has(title))return null;seen.add(title);
 const description=plain(item.description);const excerpt=description===title?'':description;
 return {company,title,url:url.href,source:plain(item.source?.['#text']||item.source||'Google News RSS'),published:Number.isFinite(+published)?published.toISOString():null,excerpt:excerpt.split(/\s+/).slice(0,45).join(' ')};
 }).filter(Boolean).sort((a,b)=>new Date(b.published||0)-new Date(a.published||0)).slice(0,3);
}
export async function getCompanyNews(index,{fetcher=fetch,now=Date.now()}={}){
 const company=newsCompanies[index];if(!company)throw Object.assign(Error('Выберите компанию'),{status:400});
 const old=cache.get(index);if(old&&now-old.fetchedAt<15*60000)return {...old,stale:false};if(pending.has(index))return pending.get(index);
 const task=(async()=>{try{const url='https://news.google.com/rss/search?'+new URLSearchParams({q:'"'+company+'" when:30d',hl:'ru',gl:'KZ',ceid:'KZ:ru'});
 const response=await fetcher(url,{signal:AbortSignal.timeout(8000),headers:{accept:'application/rss+xml, application/xml'}});if(!response.ok)throw Error('RSS unavailable');
 const xml=await response.text();if(xml.length>1500000)throw Error('RSS too large');const articles=parseCompanyNews(xml,company);const result={company,articles,fetchedAt:now};cache.set(index,result);return {...result,stale:false};
 }catch{if(old)return {...old,stale:true};return {company,articles:[],fetchedAt:null,unavailable:true}}finally{pending.delete(index)}})();pending.set(index,task);return task;
}
export async function handleCompanyNews({url,req,u,send,fail}){
 if(url.pathname!=='/api/company-news')return false;
 if(!['director','admin'].includes(u.role))fail(403,'Новости доступны директору и администратору');if(req.method!=='GET')fail(405,'Используйте GET');
 const value=url.searchParams.get('company');if(value===null||!/^\d$/.test(value))fail(400,'Выберите компанию');send(await getCompanyNews(Number(value)));return true;
}
