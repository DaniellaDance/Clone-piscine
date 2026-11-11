/* Short, source-checked quotations. RU/KK are editorial translations. */
(()=>{
'use strict';
const quotes=[
 {id:'graham-future',author:['Пол Грэм','Paul Graham','Пол Грэм'],company:'Y Combinator',topic:'ideas',source:'https://paulgraham.com/startupideas.html',text:{en:"Live in the future, then build what's missing.",ru:'Живите в будущем, а затем создавайте то, чего в нём не хватает.',kk:'Болашақта өмір сүріңіз, содан кейін онда жетіспейтін нәрсені жасаңыз.'}},
 {id:'gates-ai',author:['Билл Гейтс','Bill Gates','Билл Гейтс'],company:'Microsoft',topic:'ai',source:'https://www.gatesnotes.com/The-Age-Of-AI-Has-Begun',text:{en:'Artificial intelligence is as revolutionary as mobile phones and the Internet.',ru:'Искусственный интеллект столь же революционен, как мобильные телефоны и интернет.',kk:'Жасанды интеллект ұялы телефондар мен интернет сияқты революциялық өзгеріс әкеледі.'}},
 {id:'jobs-work',author:['Стив Джобс','Steve Jobs','Стив Джобс'],company:'Apple',topic:'business',source:'https://news.stanford.edu/news/2005/june15/jobs-061505.html',text:{en:'The only way to do great work is to love what you do.',ru:'Единственный способ делать выдающуюся работу — любить то, что вы делаете.',kk:'Керемет жұмыс істеудің жалғыз жолы — өз ісіңізді жақсы көру.'}},
 {id:'huang-assistant',author:['Дженсен Хуанг','Jensen Huang','Дженсен Хуанг'],company:'NVIDIA',topic:'ai',source:'https://blogs.nvidia.com/blog/nvidia-ceo-siggraph/',text:{en:'Everybody will have an AI assistant.',ru:'У каждого будет ИИ-помощник.',kk:'Әркімнің жасанды интеллект көмекшісі болады.'}},
 {id:'altman-focus',author:['Сэм Альтман','Sam Altman','Сэм Альтман'],company:'OpenAI',topic:'business',source:'https://blog.samaltman.com/how-to-be-successful',text:{en:'Focus is a force multiplier on work.',ru:'Сосредоточенность многократно усиливает результат работы.',kk:'Зейін қою жұмыстың нәтижесін еселеп арттырады.'}},
 {id:'bezos-experiment',author:['Джефф Безос','Jeff Bezos','Джефф Безос'],company:'Amazon',topic:'ideas',source:'https://www.aboutamazon.com/news/company-news/2016-letter-to-shareholders',text:{en:'Staying in Day 1 requires you to experiment patiently, accept failures, plant seeds, protect saplings, and double down when you see customer delight.',ru:'Чтобы оставаться в «Дне первом», нужно терпеливо экспериментировать, принимать неудачи, сеять семена, беречь ростки и удваивать усилия, когда клиенты довольны.',kk:'«Бірінші күнде» қалу үшін сабырмен тәжірибе жасап, сәтсіздікті қабылдап, тұқым сеуіп, өскінді қорғап, клиент қуанғанда күш-жігерді еселеу керек.'}},
 {id:'branson-opportunities',author:['Ричард Брэнсон','Richard Branson','Ричард Брэнсон'],company:'Virgin',topic:'business',source:'https://www.linkedin.com/posts/rbranson_strategy-is-important-but-its-easy-to-get-activity-7262512080295993344-qLPR',text:{en:"Business opportunities are like buses, there’s always another one coming.",ru:'Возможности в бизнесе похожи на автобусы: всегда придёт следующий.',kk:'Бизнестегі мүмкіндіктер автобусқа ұқсайды: келесісі міндетті түрде келеді.'}}
];
const copy={ru:{heading:'Цитата дня',source:'Источник',translation:'Перевод с английского',business:'Успех в бизнесе',ideas:'Идеи и инсайты',ai:'Развитие ИИ'},en:{heading:'Quote of the day',source:'Source',translation:'',business:'Business success',ideas:'Ideas and insights',ai:'AI development'},kk:{heading:'Күн дәйексөзі',source:'Дереккөз',translation:'Ағылшын тілінен аударма',business:'Бизнестегі табыс',ideas:'Идеялар мен инсайттар',ai:'ЖИ дамуы'}};
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function forDate(date=new Date()){
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Almaty',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
 const day=Math.floor(Date.UTC(+parts.year,+parts.month-1,+parts.day)/86400000);
 return {quote:quotes[((day%quotes.length)+quotes.length)%quotes.length],key:`${parts.year}-${parts.month}-${parts.day}`};
}
function html(date=new Date()){
 const lang=window.IFI18n?.lang||'ru',c=copy[lang]||copy.ru,{quote:q,key}=forDate(date),author=q.author[lang==='en'?1:lang==='kk'?2:0];
 return `<section id="daily-quote" class="daily-quote" data-user-text data-quote-key="${key}:${lang}" aria-label="${c.heading}"><blockquote>«${escape(q.text[lang]||q.text.ru)}»</blockquote><div class="quote-credit"><span>${escape(author)} · ${q.company}</span><a href="${q.source}" target="_blank" rel="noopener noreferrer">${c.source} ↗</a>${c.translation?`<small>${c.translation}</small>`:''}</div></section>`;
}
function update(){const el=document.getElementById('daily-quote');if(!el)return;const next=html();if(!next.includes(`data-quote-key="${el.dataset.quoteKey}"`))el.outerHTML=next}
window.IFQuotes={html,forDate,count:quotes.length,update};
window.addEventListener('ideafix-language',update);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)update()});
setInterval(update,30000);
})();
