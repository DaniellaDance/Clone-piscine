import * as ical from 'node-ical';
import {createHash} from 'node:crypto';
export function calendarDay(content,window){
 if(typeof content!=='string'||content.length>500000||!content.includes('BEGIN:VCALENDAR')||!content.includes('END:VCALENDAR'))throw Object.assign(new Error('Выберите файл календаря .ics размером до 500 КБ'),{status:400});
 if(/FREQ=(SECONDLY|MINUTELY)/i.test(content))throw Object.assign(new Error('Календарь с повторами каждую секунду или минуту не поддерживается'),{status:400});
 let parsed;try{parsed=ical.sync.parseICS(content)}catch{throw Object.assign(new Error('Не удалось прочитать календарь .ics'),{status:400})}
 const events=Object.values(parsed).filter(e=>e.type==='VEVENT'&&e.start&&e.status!=='CANCELLED');if(events.length>5000)throw Object.assign(new Error('В файле слишком много событий. Экспортируйте меньший календарь.'),{status:400});
 const result=[],seen=new Set();for(const event of events){let instances;try{instances=ical.expandRecurringEvent(event,{from:new Date(window.from),to:new Date(new Date(window.to).getTime()-1),expandOngoing:true,maxIterations:2000})}catch{throw Object.assign(new Error('Не удалось развернуть повторы событий. Выберите календарь с меньшим числом повторов.'),{status:400})}
  for(const occurrence of instances){const start=new Date(occurrence.start),end=new Date(occurrence.end||start);if(!Number.isFinite(start.getTime())||start>=new Date(window.to)||end<new Date(window.from))continue;if(occurrence.isFullDay){const dateOnly=d=>new Intl.DateTimeFormat('en-CA',{timeZone:event.start.tz||'UTC',year:'numeric',month:'2-digit',day:'2-digit'}).format(d);if(dateOnly(start)>window.day||dateOnly(end)<=window.day)continue;}
   const key=createHash('sha256').update(String(event.uid||event.summary)+'|'+start.toISOString()+'|'+window.day).digest('hex');if(seen.has(key))continue;seen.add(key);
   const data=occurrence.event||occurrence;result.push({source_key:key,title:String(occurrence.summary||event.summary||'Событие календаря').slice(0,200),description:[String(data.description||event.description||''),data.location||event.location?'Место: '+String(data.location||event.location):''].filter(Boolean).join('\n').slice(0,2000),due_at:occurrence.isFullDay?null:new Date(Math.max(start.getTime(),new Date(window.from).getTime())).toISOString(),all_day:!!occurrence.isFullDay});if(result.length>200)throw Object.assign(new Error('На выбранный день больше 200 событий. Разделите календарь.'),{status:400});
  }
 }
 return result.sort((a,b)=>new Date(a.due_at||window.from)-new Date(b.due_at||window.from));
}
