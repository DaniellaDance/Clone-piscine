'use strict';
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stages={insight:'Инсайт',proposal:'Предложение',registration:'Регистрация',discussion:'Обсуждение',evaluation:'Оценка',decision:'Решение',pilot:'Пилот',implementation:'Внедрение',result:'Результат'};
const status={new:'Новое',review:'На рассмотрении',work:'В работе',clarify:'Нужно уточнение',done:'Реализовано',reject:'Отклонено'},role={employee:'Сотрудник',lead:'Руководитель',director:'Директор',admin:'Администратор'},deps=['ИТ','Закупки','Продажи','Склад','Логистика','HR','Руководство'];
let listPage=0,showcasePeriod='month',showcaseScope='all';
let me=null,items=[],page='feed',authMode='login',filter='',term='',period=0,stageFilter='',installPrompt=null;
const fmt=d=>new Date(d).toLocaleString(({ru:'ru-RU',en:'en-GB',kk:'kk-KZ'})[window.IFI18n?.lang||'ru'],{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
const options=(o,selected)=>Object.entries(o).map(([v,t])=>`<option value="${esc(v)}" ${v===selected?'selected':''}>${esc(t)}</option>`).join('');
const depOptions=selected=>options(Object.fromEntries((!me||['director','admin'].includes(me.role)?deps:[me.department]).map(d=>[d,d])),selected);
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),5500)}
async function api(path,data,method){const r=await fetch('/api'+path,{method:method||(data?'POST':'GET'),headers:data?{'Content-Type':'application/json'}:{},body:data?JSON.stringify(data):undefined,signal:AbortSignal.timeout(25000)}).catch(e=>{throw new Error(e.name==='TimeoutError'||e.name==='AbortError'?'Сервер отвечает слишком долго. Повторите запрос.':'Нет соединения с сервером. Проверьте интернет.')});const j=await r.json();if(!r.ok){const e=new Error(j.error||'Ошибка запроса');e.status=r.status;throw e}return j}
function modal(title,content){const d=$('#modal');d.dispatchEvent(new Event('ideafix-modal-replace'));d.innerHTML=`<div class="dialoghead"><h2>${esc(title)}</h2><button data-close aria-label="Закрыть">×</button></div>${content}`;if(!d.open)d.showModal();d.querySelector('[data-close]').onclick=()=>d.close()}
function formError(form,e){let p=form.querySelector('.error');if(!p){p=document.createElement('p');p.className='error';p.setAttribute('role','alert');form.append(p)}p.textContent=e.message;p.hidden=false;p.setAttribute('role','alert');p.scrollIntoView({block:'nearest',behavior:'smooth'});}
function bindForm(id,fn){const f=$(id);if(!f)return;f.onsubmit=async e=>{e.preventDefault();const b=f.querySelector('button[type=submit]');if(b)b.disabled=true;const error=f.querySelector('.error');if(error)error.textContent='';try{await fn(Object.fromEntries(new FormData(f)),f)}catch(err){formError(f,err)}finally{if(b)b.disabled=false}}}
const brand=`<div class="brand"><img class="brand-logo" src="assets/fix-idea-logo.webp?v=approved-20261113" alt="Fix Idea" width="330" height="93"><small class="brand-slogan">От идеи до победы!</small></div>`;
function login(){me=null;$('#app').innerHTML=`<div class="auth"><section class="auth-story">${brand}<h1>Хорошие идеи<br>меняют компанию.</h1><p>Замечайте. Предлагайте. Улучшайте.<br>От первого сообщения — до конкретного результата.</p><p style="margin-top:40px;font-size:12px">Каждая обработанная заявка делает нашу компанию лучше, а жизнь клиентов безопаснее!</p><div class="alpine-scene" aria-hidden="true"></div></section><section class="auth-form"><div class="eyebrow">Единое пространство обратной связи</div><h2>${authMode==='login'?'С возвращением':'Давайте знакомиться'}</h2><div class="tabs"><button id="login-tab" class="${authMode==='login'?'active':''}">Войти</button><button id="register-tab" class="${authMode==='register'?'active':''}">Регистрация</button></div><form id="auth">${authMode==='register'?`<label>Ваше имя<input name="name" autocomplete="name" required minlength="2" maxlength="100"></label><label>Подразделение<select name="department">${depOptions('ИТ')}</select></label>`:''}<label>Логин<input name="login" autocomplete="username" required minlength="3" maxlength="80"></label><label>Пароль<input type="password" name="password" autocomplete="${authMode==='login'?'current-password':'new-password'}" required minlength="3" maxlength="128"></label><p class="error" role="alert"></p><button class="primary" type="submit">${authMode==='login'?'Войти в FixIdea':'Создать аккаунт'}</button></form><p class="hint">Новый аккаунт получает роль сотрудника. Директор назначает руководителей и администраторов.</p><p class="muted"><a href="install.html">Установить приложение →</a></p></section></div>`;$('#login-tab').onclick=()=>{authMode='login';login()};$('#register-tab').onclick=()=>{authMode='register';login()};bindForm('#auth',async b=>{me=await api('/'+authMode,b);page='feed';await refresh(true)})}
async function showMediaInbox(){
 modal('Аудио и видеообращения','<p id="media-inbox-status">Загрузка обращений…</p><div id="media-inbox-items"></div>');
 const target=$('#media-inbox-items'),status=$('#media-inbox-status');
 try{
  const messages=await api('/media-messages');
  status.textContent=messages.length?'Текст речи доступен независимо от загрузки медиа.':'Обращений пока нет.';
  for(const m of messages){
   const card=document.createElement('article');card.className='panel';
   const heading=document.createElement('h3');heading.textContent=(m.media_type==='video'?'Видеообращение':'Аудиообращение')+' · '+fmt(m.created_at);card.append(heading);
   if(m.media_url){
    const player=document.createElement(m.media_type==='video'?'video':'audio');
    player.controls=true;player.preload='none';player.style.maxWidth='100%';player.src=m.media_url;card.append(player);
   }else{const p=document.createElement('p');p.className='muted';p.textContent='Медиафайл недоступен. Текст речи можно открыть отдельно.';card.append(p)}
   const btn=document.createElement('button');btn.type='button';btn.textContent='Текст речи';btn.setAttribute('aria-expanded','false');
   const content=document.createElement('p');content.className='pre';content.hidden=true;
   btn.onclick=async()=>{
    if(!content.hidden){content.hidden=true;btn.setAttribute('aria-expanded','false');return}
    try{const data=await api('/media-messages/'+m.id+'/transcript');content.textContent=data.transcript_status==='ready'?data.transcript:'Расшифровка ещё не готова';content.hidden=false;btn.setAttribute('aria-expanded','true')}
    catch(e){toast(e.message)}
   };
   card.append(btn,content);target.append(card);
  }
 }catch(e){status.textContent='Не удалось загрузить обращения: '+e.message}
}

function stageIcon(key){
 const paths={
  proposal:'<path d="M5 3h14v18H5zM8 8h8M8 12h8M8 16h5"/>',
  implementation:'<path d="M5 12l4 4L19 6M4 21h16"/>',
  insight:'<path d="M9 18h6m-5 3h4m-7-9a5 5 0 0 1 10 0c0 2.5-1.7 3.5-2.5 5h-5C8.7 15.5 7 14.5 7 12Z"/><path d="M4 4l1.5 1.5M20 4l-1.5 1.5M12 1v2"/>',
  discussion:'<path d="M20 11.5a6.5 6.5 0 0 1-6.5 6.5H9l-4 3v-4a6.5 6.5 0 0 1-1-11.7"/><path d="M12 3h4a5 5 0 0 1 0 10h-5l-3 2v-3a5 5 0 0 1 4-9Z"/>',
  decision:'<rect x="6" y="4" width="13" height="18" rx="2"/><path d="M10 4V2h5v2M9 10l1.5 1.5L13 9m-4 7 1.5 1.5L13 15"/>',
  pilot:'<path d="M22 3 2 11l8 2 2 8 10-18Z"/><path d="m10 13 7-6"/>',
  result:'<path d="M8 3h8v7a4 4 0 0 1-8 0V3ZM8 5H5v3a4 4 0 0 0 4 4m7-7h3v3a4 4 0 0 1-4 4M12 14v4m-4 3h8m-7-3h6"/>'
 };
 return '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[key]+'</svg>';
}
function journey(){
 const steps=[['insight','Инсайт'],['proposal','Предложение'],['discussion','Обсуждение'],['pilot','Пилот'],['implementation','Внедрение'],['result','Результаты']];
 return '<section class="stage-journey" aria-label="Этапы пути от идеи до результата"><div class="stage-tile secretary-stage"><button type="button" id="journey-ai-secretary" class="stage-select" aria-label="Открыть ИИ Секретарь"><span class="stage-icon">✦</span><span class="stage-title">ИИ Секретарь</span></button></div>'+steps.map(([id,label])=>'<div class="stage-tile stage-'+id+'"><button type="button" class="stage-select'+(stageFilter===id?' is-active':'')+'" data-stage="'+id+'" aria-pressed="'+(stageFilter===id)+'" title="Показать этап: '+label+'"><span class="stage-icon">'+stageIcon(id)+'</span><span class="stage-title">'+label+'</span></button>'+(id==='insight'?'<button type="button" id="record-idea" aria-label="Записать идею голосом, текстом или видео">＋ Записать идею <span aria-hidden="true">🎙</span></button>':'')+'</div>').join('')+'</section>';
}
function openAISecretary(){
 const total=items.length,active=items.filter(t=>!['done','reject','closed'].includes(t.status)&&t.stage!=='result').length,pilots=items.filter(t=>t.stage==='pilot').length;
 const metric=(n,label)=>`<div style="flex:1;min-width:75px;background:#fff;border:1px solid #c9dafa;border-radius:15px;padding:12px 6px;text-align:center"><strong style="font-size:27px;color:#2453aa">${n}</strong><div style="font-size:13px;color:#435a7c">${label}</div></div>`;
 modal('ИИ Секретарь',`<section style="color:#193354;background:linear-gradient(180deg,rgba(233,244,255,.82),rgba(255,255,255,.96)),url(assets/alpine-hero.webp) center top/cover no-repeat;border-radius:20px;padding:18px 14px;min-height:430px"><div style="background:rgba(255,255,255,.88);border-radius:16px;padding:15px"><h3 style="margin:0 0 8px;color:#173c78">Помощник директора</h3><div class="secretary-daily-quote">${window.IFQuotes?.html()||''}</div><p style="color:#49658a">Важные события и предложения</p><div style="display:flex;gap:8px;flex-wrap:wrap">${metric(total,'Идей')}${metric(active,'В работе')}${metric(pilots,'Пилотов')}</div><h3 style="margin:24px 0 12px;color:#173c78">Что требует внимания?</h3><div style="display:grid;gap:10px"><button type="button" id="secretary-analyze" style="text-align:left;background:#edf4ff;border:1px solid #c9dafa;border-radius:12px;padding:12px;color:#193354">✦ Анализ идей →</button><button type="button" id="director-chat-open" style="text-align:left;background:#edf4ff;border:1px solid #c9dafa;border-radius:12px;padding:12px;color:#193354">▤ Умный чат руководителей →</button><button type="button" id="secretary-icons-open" style="text-align:left;background:#edf4ff;border:1px solid #c9dafa;border-radius:12px;padding:12px;color:#193354">🎨 Придумать иконку для новой идеи →</button><button type="button" id="secretary-news-open" style="text-align:left;background:#edf4ff;border:1px solid #c9dafa;border-radius:12px;padding:12px;color:#193354">◉ Новости вендоров и технологических решений →</button><button type="button" id="director-analytics-open" style="text-align:left;background:#edf4ff;border:1px solid #c9dafa;border-radius:12px;padding:12px;color:#193354">◈ Аналитика директора: сроки, пилоты, финансы →</button></div><p style="font-size:13px;color:#536b8b;margin-top:20px">Анализ идей работает и при недоступности Gemini. Решение принимает руководитель.</p></div></section>`);
 $('#director-analytics-open').onclick=showDirectorAnalytics;
 $('#secretary-analyze').onclick=openIdeaAnalysis;
 $('#secretary-news-open').onclick=openSecretaryNews;
 $('#secretary-icons-open').onclick=openIdeaIconDesigner;

 $('#director-chat-open').onclick=()=>{ $('#modal').close(); page='chat'; shell(); render(); };
}

function openIdeaIconDesigner(){
 const candidates=items.filter(t=>t.title||t.body);
 modal('Иконки для идей',`<section class="idea-icon-designer"><p>Выберите идею или введите название. Помощник предложит тематические значки. Вы можете выбрать вариант и скачать его как SVG.</p><label>Существующая идея<select id="icon-idea-select"><option value="">Новая идея</option>${candidates.map(t=>'<option value="'+esc(t.id)+'">#'+esc(t.id)+' · '+esc(t.title)+'</option>').join('')}</select></label><label>Название идеи<input id="icon-idea-name" maxlength="120" placeholder="Например: автоматизация склада"></label><button type="button" id="icon-design-run" class="primary">Подобрать иконки</button><div id="icon-design-results" class="icon-design-results" aria-live="polite"></div><p class="hint">Иконки создаются как SVG из тематических шаблонов. Это не генерация изображений Gemini; выбор не меняет карточку идеи автоматически.</p></section>`);
 const sel=$('#icon-idea-select'),name=$('#icon-idea-name'),out=$('#icon-design-results');
 sel.onchange=()=>{const t=candidates.find(x=>String(x.id)===sel.value);name.value=t?.title||''};
 $('#icon-design-run').onclick=()=>{
 const title=name.value.trim();if(!title){out.textContent='Введите название идеи';return}
 const rules=[[/энерг|электр|эконом|эколог|солн|энерго/i,['⚡','🌱','☀️']],[/склад|логист|достав|товар/i,['📦','🚚','📍']],[/безопас|защит|кибер|охран/i,['🛡️','🔒','🔐']],[/обуч|сотруд|знани|курс/i,['🎓','📚','💡']],[/клиент|обращ|сервис|поддерж/i,['🤝','💬','🎧']],[/ии|ai|автомат|цифр|бот|робот/i,['✦','⚙️','🤖']]];
 const symbols=(rules.find(([re])=>re.test(title))||[null,['💡','🚀','✨']])[1];
 const palettes=[['#2457D6','#E8F2FF'],['#087C83','#DDF8F6'],['#D77B15','#FFF1DC']];
 out.innerHTML=symbols.map((sym,i)=>'<button type="button" class="icon-design-choice" data-icon-choice="'+i+'" aria-label="Скачать вариант '+(i+1)+'"><span style="background:'+palettes[i][1]+';color:'+palettes[i][0]+'">'+sym+'</span><small>Вариант '+(i+1)+' · Скачать SVG</small></button>').join('');
 out.querySelectorAll('[data-icon-choice]').forEach(btn=>btn.onclick=()=>{
 const i=Number(btn.dataset.iconChoice),[color,bg]=palettes[i];const symbol=symbols[i];const svg='<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" rx="55" fill="'+bg+'"/><circle cx="128" cy="128" r="92" fill="white" stroke="'+color+'" stroke-width="5"/><text x="128" y="157" text-anchor="middle" font-size="90" font-family="sans-serif">'+symbol+'</text></svg>';
 const blob=new Blob([svg],{type:'image/svg+xml'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='fixidea-icon-'+(i+1)+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 });
 };
}
async function openSecretaryNews(){
 modal('Новости вендоров и технологий',`<section style="padding:15px;border-radius:16px;background:linear-gradient(#e6f1ff,#fff);color:#193354"><p>Gemini готовит сводку, оценивает влияние на действующие пилоты и предлагает новые идеи по тексту реальной публикации.</p><label>Категория<select id="news-kind"><option value="vendors">Вендоры</option><option value="technologies">Технологические решения</option><option value="leaders">ТОП-10 мировых компаний</option></select></label><label>Вендор или технология<select id="news-topic"><option>Загрузка каталога…</option></select></label><p><a id="news-external" href="#" target="_blank" rel="noopener noreferrer">Найти последние публикации ↗</a></p><label>Ссылка на источник (необязательно)<input id="news-url" type="url" placeholder="https://…"></label><label>Текст новости<textarea id="news-text" rows="7" placeholder="Вставьте текст новости или выдержку из первоисточника (от 80 символов)"></textarea></label><button type="button" id="news-analyze" class="primary">✦ Gemini: сводка, влияние на пилоты и новые идеи</button><div id="news-search-list" aria-live="polite" style="margin:15px 0"></div><p class="hint">Gemini анализирует только предоставленный текст. ТОП-10 — тематическая подборка, не рейтинг по выручке. Новости не загружаются автоматически; сведения и предложения требуют проверки руководителем. Ничего не отправляется в Bitrix24.</p></section>`);
 const leaders=['Honeywell','Siemens','Johnson Controls','Bosch Building Technologies','Schneider Electric','ABB','Eaton','Carrier Global','Halma','Hochiki'].map((name,i)=>({id:'leader-'+(i+1),name}));
 const kind=$('#news-kind'),topic=$('#news-topic'),result=$('#news-search-list'),button=$('#news-analyze');let data;
 try{data=await api('/secretary/news-topics')}catch(e){result.textContent=e.message;return}
 const selected=()=>{const arr=kind.value==='vendors'?data.vendors:kind.value==='leaders'?leaders:data.technologies;return arr[Number(topic.value)]};
 const show=()=>{const x=selected();if(!x)return;const name=x.name||x.label?.[0]||'';$('#news-external').href='https://news.google.com/search?q='+encodeURIComponent(name+' новости')+'&hl=ru&gl=KZ&ceid=KZ:ru';result.textContent=''};
 const refresh=()=>{const arr=kind.value==='vendors'?data.vendors:kind.value==='leaders'?leaders:data.technologies;topic.innerHTML=arr.map((x,i)=>'<option value="'+i+'">'+esc(x.name||x.label?.[0]||x.id)+'</option>').join('');show()};
 kind.onchange=refresh;topic.onchange=show;refresh();
 button.onclick=async()=>{const x=selected();if(!x)return;button.disabled=true;result.textContent='Gemini анализирует публикацию…';
 try{const d=await api('/ai/news-brief',{kind:kind.value,topic_id:x.id,source_url:$('#news-url').value,source_text:$('#news-text').value}),v=d.analysis||{};
 const list=(items,format)=>'<ul>'+((Array.isArray(items)?items:[]).map(z=>'<li>'+esc(format?format(z):String(z))+'</li>').join('')||'<li>Не выявлено</li>')+'</ul>';
 result.innerHTML='<div style="background:#fff;border:1px solid #c9dafa;border-radius:12px;padding:12px"><h3>ИИ-сводка</h3><p>'+esc(v.summary||'—')+'</p><h3>Значение для компании</h3><p>'+esc(v.relevance||'—')+'</p><h3>Возможности</h3>'+list(v.opportunities)+'<h3>Риски</h3>'+list(v.risks)+'<h3>Влияние на пилоты</h3>'+list(v.pilot_impacts,z=>'Пилот №'+z.pilot_id+': '+z.impact+'; действие: '+z.action+'; уверенность: '+z.confidence)+'<h3>Новые идеи для улучшения работы</h3>'+list(v.improvement_ideas,z=>z.title+' — '+z.description+'; польза: '+z.benefit+'; первый шаг: '+z.first_step)+'<h3>Что проверить</h3>'+list(v.verification_needed)+'<p class="hint">Черновик помощника. Руководитель проверяет выводы перед использованием.</p><button type="button" id="news-copy">Скопировать предложения</button></div>';
 $('#news-copy').onclick=()=>{const text=(v.improvement_ideas||[]).map(z=>[z.title,z.description,z.benefit,z.first_step].join(' — ')).join('\n\n');navigator.clipboard?.writeText(text).then(()=>toast('Идеи скопированы')).catch(()=>toast('Копирование недоступно'))};
 }catch(e){result.textContent=e.message}finally{button.disabled=false}};
}
function openIdeaAnalysis(){
 const candidates=items.filter(t=>t.title||t.body);
 modal('ИИ-анализ идеи',`<section style="padding:16px;border-radius:18px;background:linear-gradient(180deg,#e1efff,#fff);color:#193354"><div style="height:95px;border-radius:15px;background:#cfe3fb url(assets/alpine-hero.webp) center/cover"></div><p>Выберите идею для анализа рисков и преимуществ</p><select id="idea-analysis-select" style="width:100%;padding:12px"><option value="">Выберите идею</option>${candidates.map(t=>'<option value="'+esc(t.id)+'">#'+esc(t.id)+' · '+esc(t.title)+'</option>').join('')}</select><button type="button" id="idea-ai-run" class="primary" style="margin:12px 0">Проанализировать с ИИ</button><div id="idea-analysis-output" role="status"></div></section>`);
 $('#idea-ai-run').onclick=async()=>{const id=$('#idea-analysis-select').value,out=$('#idea-analysis-output'),btn=$('#idea-ai-run');if(!id){out.textContent='Выберите идею';return}btn.disabled=true;out.textContent='ИИ анализирует предложение…';try{const data=await api('/ai/idea-analysis',{ticket_id:Number(id)}),a=data.analysis||{};const section=(title,arr)=>'<h3>'+title+'</h3><ul>'+((Array.isArray(arr)?arr:[]).map(x=>'<li>'+esc(typeof x==='string'?x:JSON.stringify(x))+'</li>').join('')||'<li>Не определено</li>')+'</ul>';out.innerHTML='<div style="background:white;border-radius:14px;padding:14px"><h3>Краткое содержание</h3><p>'+esc(a.summary||'—')+'</p>'+section('Преимущества',a.benefits)+section('Риски и меры снижения',(a.risks||[]).map(x=>x.risk+' · '+(x.mitigation||'')))+section('Недостающие данные',a.missing_data)+'<h3>Рекомендуемый следующий шаг</h3><p>'+esc(a.next_step||'—')+'</p><p class="hint">Это рекомендация ИИ, не решение руководителя. Отправка в Bitrix24 не выполнялась.</p></div>'}catch(e){out.textContent=e.message}finally{btn.disabled=false}};
}
function openLeaderDiscussionFromSecretary(){
 $('#modal')?.close();
 window.IFDiscussions?.open();
}

function directorFinancialSummary(tickets){
 const rows=projectFinanceRows(tickets,me),complete=rows.filter(r=>r.balance!==null);
 const money=n=>n===null?'Нет данных':new Intl.NumberFormat('ru-RU',{style:'currency',currency:'KZT',maximumFractionDigits:2}).format(n);
 const total=key=>{const known=rows.filter(r=>r[key]!==null);return known.length?known.reduce((n,r)=>n+r[key],0):null};
 return '<div class="secretary-financial-summary"><p>Доходы: <b>'+money(total('income'))+'</b></p><p>Расходы: <b>'+money(total('expense'))+'</b></p><p>Разница по заполненным строкам: <b>'+money(complete.length?complete.reduce((n,r)=>n+r.balance,0):null)+'</b></p><small>Данные карточек: '+rows.length+' · Полностью заполнено: '+complete.length+'. Импортированные данные Битрикс24 доступны в «Результатах».</small></div>';
}
function showDirectorAnalytics(){
 const pilotItems=items.filter(t=>['pilot','implementation','result'].includes(t.stage));
 const opts='<option value="all">Все идеи и пилоты</option>'+pilotItems.map(t=>'<option value="'+esc(t.id)+'">#'+esc(t.id)+' · '+esc(t.title)+'</option>').join('');
 modal('Аналитика директора',`<section style="padding:16px;border-radius:18px;background:linear-gradient(180deg,#e1efff,#fff);color:#193354"><div style="height:110px;border-radius:15px;background:#cfe3fb url(assets/alpine-hero.webp) center 54%/cover no-repeat"></div><p>Контроль сроков, пилотов и финансовых результатов</p><label>Идея или пилот <select id="director-analytics-filter" style="width:100%;padding:12px;margin:8px 0 16px"><option value="all">Все идеи и пилоты</option>${pilotItems.map(t=>'<option value="'+esc(t.id)+'">#'+esc(t.id)+' · '+esc(t.title)+'</option>').join('')}</select></label><div id="director-analytics-results"></div></section>`);
 const sel=$('#director-analytics-filter'),out=$('#director-analytics-results');
 const draw=()=>{const subset=sel.value==='all'?items:items.filter(t=>String(t.id)===sel.value);const overdue=subset.filter(late).length;const pilots=subset.filter(t=>t.stage==='pilot').length;const completed=subset.filter(t=>['implementation','result'].includes(t.stage)).length;out.innerHTML=`<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">${[[overdue,'Просроченные ответы'],[pilots,'Пилоты в работе'],[completed,'Внедрение / результат'],[subset.length,'Всего идей']].map(([n,l])=>'<div style="background:white;border:1px solid #c9dafa;border-radius:13px;padding:12px"><strong style="font-size:25px;color:#2453aa">'+n+'</strong><div style="font-size:13px">'+l+'</div></div>').join('')}</div><h3>Финансовые показатели</h3>${directorFinancialSummary(subset)}<button type="button" id="secretary-financial-results">Открыть все финансовые отчёты →</button>`;};
 sel.onchange=()=>{draw();wireFinance()};const wireFinance=()=>{$('#secretary-financial-results').onclick=()=>{$('#modal').close();page='results';shell();render()}};draw();wireFinance();
}

const navSvg=(name)=>{
 const paths={
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
 ideas:'<rect x="5" y="4" width="14" height="17" rx="3"/><path d="M9 4.5V3h6v1.5M9 10h6M9 14h6M9 18h3"/>',
 board:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 8h3v3H8zM14 8h3M14 12h3M8 16h9"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
 more:'<circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
 account:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-4 2.6-6 7-6s7 2 7 6"/>'
 };
 return '<svg class="ui-line-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[name]||paths.home)+'</svg>';
};
function shell(){
 const nav=[['feed','Главная'],['mine','Мои инсайты'],['ideas','Витрина идей'],...(['director','admin'].includes(me.role)?[['results','Результаты']]:[]),['vendors','Контакты'],['ecosystem','Вендоры'],['meetings','График совещаний'],...(['director','lead','admin'].includes(me.role)?[['meeting-results','Итоги совещаний и встреч']]:[]),['planner','План дня'],['organization','Отделы и сотрудники'],...(['director','lead'].includes(me.role)?[['chat','Чат руководителей'],['discussions','Обсуждения идей']]:[]),...(['director','lead','admin'].includes(me.role)?[['pulse','Пульс компании']]:[]),...(['director','admin'].includes(me.role)?[['settings','Управление']]:[]),...(['director','lead','admin'].includes(me.role)?[['ai-secretary','ИИ Секретарь']]:[]),['preferences','Настройки'],['apps','Приложения']];
 const leading=[['feed','Главная','home'],['ideas','Витрина','board'],['ecosystem','Мир Модус Трейд','globe']];
 const other=nav.filter(([id])=>!leading.some(([key])=>key===id));
 const navGroups=[['Идеи',['discussions']],['Рабочие инструменты',['vendors','meetings','meeting-results','planner','chat','organization']],['Аналитика',['results','pulse']],['Система',['settings','preferences','apps','ai-secretary']]];
 const moreMenu=navGroups.map(([group,ids])=>{const entries=other.filter(([id])=>ids.includes(id));return entries.length?'<details class="more-group"><summary>'+group+'</summary>'+entries.map(([id,label])=>'<button type="button" data-page="'+id+'" class="'+(page===id?'active':'')+'">'+label+'</button>').join('')+'</details>':''}).join('');
 const navButton=(id,label,glyph)=>'<button type="button" data-page="'+id+'" class="bottom-link'+(page===id?' active':'')+'" title="'+label+'"><span class="bottom-icon" aria-hidden="true">'+navSvg(glyph)+'</span><span class="bottom-text">'+label+'</span></button>';
 $('#app').innerHTML='<header class="header">'+brand+'<div class="account"><span class="username" data-user-text>'+esc(me.name)+' · '+role[me.role]+'</span><span id="connection">● Онлайн</span><details class="account-more"><summary aria-label="Личный кабинет" title="Личный кабинет">'+navSvg("account")+'</summary><div class="account-popup"><span data-user-text>'+esc(me.name)+'</span><button type="button" id="logout">Выйти</button></div></details></div></header><div class="layout"><main id="view"></main></div><nav class="bottom-nav" aria-label="Главное меню">'+leading.map(([id,label,icon])=>navButton(id,label,icon)).join('')+'<details class="bottom-more"><summary><span class="bottom-icon" aria-hidden="true">'+navSvg("more")+'</span><span class="bottom-text">Ещё</span></summary><div class="bottom-more-menu">'+moreMenu+'</div></details></nav>';
 $('#logout').onclick=async()=>{try{await window.IFPush?.detach();await api('/logout',{});login()}catch(e){toast(e.message)}};
 document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{if(b.dataset.page==='ai-secretary'){document.querySelector('.bottom-more')?.removeAttribute('open');openAISecretary();return}page=b.dataset.page;filter='';term='';stageFilter='';shell();render()});
}

async function refresh(initial=false){if(refresh.pending)return;refresh.pending=true;try{const next=await api('/tickets');if(!initial&&items.length&&next.some(n=>!items.some(i=>i.id===n.id))){toast('Появился новый инсайт');sound()}items=next;if(initial)shell();if(initial||(!$('#modal').open&&!document.querySelector('input:focus,textarea:focus,select:focus')))await render();const c=$('#connection');if(c)c.textContent='● Онлайн'}catch(e){if(e.status===401)login();else{const c=$('#connection');if(c)c.textContent='○ Нет связи';if(initial)toast(e.message)}}finally{refresh.pending=false}}
function sound(){try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);g.gain.value=.05;o.frequency.value=650;o.start();o.stop(a.currentTime+.12);o.onended=()=>a.close()}catch{}}
function head(title,sub=''){return `<div class="page-head"><div><div class="eyebrow">Ваш голос имеет значение</div><h1>${title}</h1><p class="muted">${sub}</p></div><button id="new" class="primary">＋ Инсайт</button></div>`}
function chooseIdeaMode(){
 modal('Записать идею',`<div class="voice-actions" style="display:grid;gap:12px;padding:12px 0"><button type="button" id="idea-by-voice" class="primary">🎙 Записать голосом</button><button type="button" id="idea-by-text">✍ Написать текстом</button><button type="button" id="idea-by-video">🎥 Записать видеообращение</button></div>`);
 $('#idea-by-voice').onclick=()=>recordIdeaVideo('audio');
 $('#idea-by-text').onclick=()=>{newTicket();$('#create textarea[name=body]')?.focus() };
 $('#idea-by-video').onclick=()=>recordIdeaVideo('video');
}
async function recordIdeaVideo(mediaType='video'){
 const audioOnly=mediaType==='audio';
 modal(audioOnly?'Аудиообращение':'Видеообращение',`<div style="display:grid;gap:12px">
  <p class="hint">Нажмите «Начать запись». Микрофон и камера включатся только после нажатия и вашего разрешения.</p>
  <${audioOnly?'audio':'video'} id="idea-video-preview" muted playsinline controls style="width:100%;max-height:35vh;background:#14202a;border-radius:12px"></${audioOnly?'audio':'video'}>
  <p id="idea-video-status" role="status">Готово к записи. Нажмите «Начать запись».</p>
  <label>Текст обращения<textarea id="idea-video-transcript" rows="5" placeholder="Во время записи здесь появятся распознанные слова. После остановки проверьте текст."></textarea></label>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
   <button type="button" id="idea-video-start" class="primary">● Начать запись</button>
   <button type="button" id="idea-video-stop" class="primary" disabled>Остановить запись</button>
   <button type="button" id="idea-video-share" hidden>Поделиться записью</button>
   <button type="button" id="idea-video-download" hidden>Сохранить запись</button>
   <button type="button" id="idea-media-use" hidden>Создать идею с этой записью</button><button type="button" id="idea-video-retake" hidden>Перезаписать</button>
  </div></div>`);
 const dialog=$('#modal'),video=$('#idea-video-preview'),status=$('#idea-video-status');
 const start=$('#idea-video-start'),use=$('#idea-media-use'),stop=$('#idea-video-stop'),share=$('#idea-video-share'),download=$('#idea-video-download'),retake=$('#idea-video-retake'),transcript=$('#idea-video-transcript');
 let speech=null,spokenParts=new Map(),speechFinal='',speechStopped=false;
 const updateWords=()=>{let value=[...spokenParts.entries()].sort((a,b)=>a[0]-b[0]).map(x=>x[1]).join(' ').trim();transcript.value=value;return value};
 const stopSpeech=()=>{speechStopped=true;try{speech?.stop()}catch{}};
 const startSpeech=()=>{
  const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!Speech){status.textContent='Камера работает. Автоматическая расшифровка недоступна в этом браузере: текст можно ввести вручную.';return}
  speechStopped=false;spokenParts.clear();transcript.value='';
  const launch=()=>{
   if(speechStopped||closed)return;
   speech=new Speech();speech.lang=document.documentElement.lang==='kk'?'kk-KZ':'ru-RU';
   speech.continuous=true;speech.interimResults=true;
   speech.onresult=e=>{
    let interim='';
    for(let i=0;i<e.results.length;i++){
     const result=e.results[i],words=result[0]?.transcript?.trim()||'';
     if(result.isFinal)spokenParts.set(i,words);else interim+=' '+words;
    }
    const stable=[...spokenParts.entries()].sort((a,b)=>a[0]-b[0]).map(x=>x[1]).join(' ');
    transcript.value=(speechFinal+' '+stable+' '+interim).trim();
   };
   speech.onerror=e=>{if(['not-allowed','service-not-allowed','audio-capture','network'].includes(e.error)){speechStopped=true;status.textContent='Запись продолжается. Автоматическая расшифровка недоступна; текст можно ввести вручную.'}};
   speech.onend=()=>{
    if(speechStopped||closed)return;
    const next=updateWords();
    if(next&&!speechFinal.endsWith(next))speechFinal=(speechFinal+' '+next).trim();
    spokenParts.clear();
    setTimeout(()=>{if(!speechStopped&&!closed)try{launch()}catch{}},300)
   };
   try{speech.start()}catch{status.textContent='Расшифровка временно недоступна. Видео продолжает записываться.'}
  };
  launch();
 };
 const finalizeText=async()=>{
  const original=transcript.value.trim();
  if(!original)return;
  try{
   const response=await fetch('/api/text/prepare',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:original,language:'ru'}),signal:AbortSignal.timeout(15000)});
   if(response.ok){const result=await response.json();if(typeof result.text==='string'&&result.text.trim())transcript.value=result.text}
  }catch{}
 };
 let stream=null,recorder=null,chunks=[],blob=null,url=null,closed=false;
 const cleanup=()=>{stream?.getTracks().forEach(t=>t.stop());stream=null};
 const release=()=>{closed=true;stopSpeech();cleanup();if(recorder?.state==='recording')recorder.stop();if(url)URL.revokeObjectURL(url)};
 dialog.addEventListener('close',()=>{if(!dialog.open)release()},{once:true});dialog.addEventListener('ideafix-modal-replace',release,{once:true});
 const begin=async()=>{
  cleanup();if(url){URL.revokeObjectURL(url);url=null}
  start.disabled=true;use.hidden=true;blob=null;chunks=[];speechFinal='';spokenParts.clear();transcript.value='';share.hidden=true;download.hidden=true;retake.hidden=true;stop.disabled=true;
  if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){status.textContent='Запись не поддерживается этим браузером. Откройте сайт в Chrome.';start.disabled=false;return}
  try{
   status.textContent=audioOnly?'Запрашиваем разрешение на микрофон…':'Запрашиваем разрешение на камеру и микрофон…';
   let cameraTimedOut=false;
   const cameraRequest=navigator.mediaDevices.getUserMedia({video:audioOnly?false:{facingMode:'user',width:{ideal:640},height:{ideal:360}},audio:true});
   cameraRequest.then(lateStream=>{if(cameraTimedOut||closed)lateStream.getTracks().forEach(t=>t.stop())}).catch(()=>{});
   let cameraTimer;
   try{
    stream=await Promise.race([
     cameraRequest,
     new Promise((_,reject)=>{cameraTimer=setTimeout(()=>{cameraTimedOut=true;reject(new Error('CAMERA_TIMEOUT'))},12000)})
    ]);
   }finally{clearTimeout(cameraTimer)}
   if(closed){cleanup();return}
   video.srcObject=stream;video.muted=true;video.controls=false;if(!audioOnly)video.play().catch(()=>{});
   const type=(audioOnly?['audio/webm;codecs=opus','audio/webm','audio/mp4']:['video/webm;codecs=vp8,opus','video/webm','video/mp4']).find(t=>MediaRecorder.isTypeSupported(t));
   recorder=new MediaRecorder(stream,type?{mimeType:type}:undefined);
   recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
   recorder.onstop=async()=>{
    stopSpeech();cleanup();if(closed)return;
    blob=new Blob(chunks,{type:recorder.mimeType||(audioOnly?'audio/webm':'video/webm')});
    if(!blob.size){status.textContent='Видео не записалось. Попробуйте ещё раз.';retake.hidden=false;return}
    url=URL.createObjectURL(blob);video.srcObject=null;video.src=url;video.muted=false;video.controls=true;video.play().catch(()=>{});
    status.textContent='Запись готова. Прослушайте или просмотрите её перед отправкой.';
    share.hidden=false;download.hidden=false;retake.hidden=false;use.hidden=false;stop.disabled=true;start.disabled=false;start.hidden=true;finalizeText();
   };
   recorder.start(1000);startSpeech();stop.disabled=false;status.textContent=audioOnly?'Идёт запись аудио. Нажмите «Остановить запись».':'Идёт запись видео и звука. Нажмите «Остановить запись».';
  }catch(e){cleanup();start.disabled=false;status.textContent=e.message==='CAMERA_TIMEOUT'?'Камера не ответила за 12 секунд. Проверьте разрешения камеры и микрофона в браузере и нажмите «Повторить».':e.name==='NotAllowedError'?'Доступ к камере или микрофону запрещён. Разрешите его в настройках браузера и нажмите «Повторить».':'Не удалось включить камеру: '+e.message;retake.textContent='Повторить';retake.hidden=false}
 };
 stop.onclick=()=>{if(recorder?.state==='recording'){stopSpeech();recorder.stop();stop.disabled=true;status.textContent='Подготовка видео…'}};
 const file=()=>new File([blob],'fix-idea-'+mediaType+(blob.type.includes('mp4')?(audioOnly?'.m4a':'.mp4'):'.webm'),{type:blob.type});
 share.onclick=async()=>{
  if(!blob)return;
  try{
   const f=file();
   if(!navigator.share||!navigator.canShare?.({files:[f]})){status.textContent='Ваш браузер не поддерживает отправку видео. Сохраните файл и прикрепите его в рабочем чате.';return}
   await navigator.share({files:[f],title:'Видеообращение FixIdea',text:transcript.value.trim()||'Видеообращение'});
  }catch(e){if(e.name!=='AbortError')status.textContent='Не удалось поделиться видео. Сохраните файл и отправьте вручную.'}
 };
 download.onclick=()=>{if(!blob)return;const a=document.createElement('a');a.href=url;a.download=file().name;a.click();if(transcript.value.trim()){const textBlob=new Blob([transcript.value],{type:'text/plain;charset=utf-8'});const textUrl=URL.createObjectURL(textBlob);const b=document.createElement('a');b.href=textUrl;b.download='ideafix-idea-transcript.txt';b.click();setTimeout(()=>URL.revokeObjectURL(textUrl),2000)}};
 start.onclick=begin;
 use.onclick=()=>{const text=transcript.value.trim(),recorded=file();newTicket();const form=$('#create');form.elements.kind.value='idea';form.elements.body.value=text||'Аудио- или видеообращение: '+recorded.name;if(recorded.size<=2097152){const transfer=new DataTransfer();transfer.items.add(recorded);$('#ticket-file-input').files=transfer.files;$('#ticket-file-input').dispatchEvent(new Event('change'))}else toast('Запись больше 2 МБ. Сохраните её отдельно; текст перенесён в идею.');form.elements.body.dispatchEvent(new Event('input',{bubbles:true}))};
 retake.onclick=()=>{video.pause();start.hidden=false;start.disabled=false;retake.hidden=true;share.hidden=true;download.hidden=true;use.hidden=true;status.textContent='Нажмите «Начать запись», когда будете готовы.'};
}
function wireNew(){if($('#new'))$('#new').onclick=chooseIdeaMode;if($('#record-idea'))$('#record-idea').onclick=chooseIdeaMode}
const late=t=>!t.first_response&&!['done','reject'].includes(t.status)&&new Date(t.due)<new Date();
function card(t){return `<article class="card"><div class="meta"><span>#${t.id}</span>${t.idea_audience&&t.idea_audience!=='department'?`<span class="badge">${({private:'Только я',leaders:'Только руководители',all:'Все сотрудники'})[t.idea_audience]}</span>`:''}<span class="badge ${t.status}">${status[t.status]}</span>${t.priority==='high'?'<span class="late">! Срочное</span>':''}${t.controlled?'<span class="badge">На контроле</span>':''}</div><h3 data-user-text>${esc(t.title)}</h3><div class="meta">Этап: ${stages[t.stage]||'Регистрация'}</div>${page==='pilots'?`<div class="pilot-summary"><span>Ответственный: <b data-user-text>${esc(t.workflow?.owner||'Не назначен')}</b></span><span>Срок: ${esc(t.workflow?.deadline||'Не указан')}</span><p data-user-text>${esc(t.workflow?.pilot||'План проверки пока не указан')}</p>${t.workflow?.pilotResult?`<p data-user-text>Результат: ${esc(t.workflow.pilotResult)}</p>`:''}</div>`:''}${catalogBadges(t)}<div class="meta">${esc(t.department)} · ${fmt(t.created)}${t.anonymous?' · Анонимно':t.author_name?' · '+esc(t.author_name):''}</div><div class="card-actions"><span class="${late(t)?'late':'muted'}" style="font-size:12px">${late(t)?'Срок ответа истёк':(['done','reject'].includes(t.status)?'Результат зафиксирован':'Ответ до '+fmt(t.due))}</span><button data-detail="${t.id}">Открыть →</button></div>${page==='ideas'?`<button data-vote="${t.id}" ${t.voted?'disabled':''}>${t.voted?'✓ Поддержано':'↑ Поддержать'} · ${t.votes}</button>`:''}</article>`}
function wireCards(){document.querySelectorAll('[data-detail]').forEach(b=>b.onclick=()=>openTicket(b.dataset.detail));document.querySelectorAll('[data-vote]').forEach(b=>b.onclick=async()=>{b.disabled=true;try{await api('/tickets/'+b.dataset.vote+'/vote',{});await refresh()}catch(e){toast(e.message);b.disabled=false}})}
function showcaseDateMatch(t){
 const d=new Date(t.published_at||t.created),now=new Date();
 if(!Number.isFinite(d.getTime()))return false;
 const parts=date=>Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Almaty',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date).filter(x=>x.type!=='literal').map(x=>[x.type,Number(x.value)]));
 const a=parts(d),b=parts(now),number=x=>x.year*10000+x.month*100+x.day;
 if(showcasePeriod==='day')return number(a)===number(b);
 if(showcasePeriod==='week'){const utc=Date.UTC(b.year,b.month-1,b.day),monday=new Date(utc-((new Date(utc).getUTCDay()+6)%7)*86400000);return number(a)>=number(parts(monday))&&number(a)<=number(b)}
 if(showcasePeriod==='month')return a.year===b.year&&a.month===b.month;
 if(showcasePeriod==='quarter')return a.year===b.year&&Math.floor((a.month-1)/3)===Math.floor((b.month-1)/3);
 return true;
}
function showcasePeriodLabel(){return ({day:'Сегодня',week:'Эта неделя',month:'Этот месяц',quarter:'Этот квартал',all:'За всё время'})[showcasePeriod]}
function showcaseIcon(t){const title=(t.title||'').toLowerCase();if(/энерг|эколог/.test(title))return '🌿';if(/ии|ai|помощник/.test(title))return '🤖';if(/обращ|сервис/.test(title))return '🤝';if(/склад|логист/.test(title))return '📦';if(/кибер|защит|безопас/.test(title))return '🛡️';if(/обуч|курс/.test(title))return '🎓';return '💡'}
function showcaseState(t){return stages[t.stage]||status[t.status]||'Идея'}
function showcaseTile(t){
 const title=String(t.title||'Новая идея').replace(/^ДЕМО\s*·\s*/,''),label=t.title?.startsWith('ДЕМО')?'ДЕМО':['pilot','implementation','result'].includes(t.stage)?'ПРОЕКТ':'ИДЕЯ';
 return '<article class="showcase-glass-card"><span class="showcase-demo-label">'+label+'</span><button type="button" class="showcase-card-open" data-open="'+esc(t.id)+'" aria-label="Открыть идею: '+esc(title)+'"><span class="showcase-card-symbol">'+showcaseIcon(t)+'</span><strong>'+esc(title)+'</strong></button><span class="showcase-card-state">'+esc(showcaseState(t))+'</span><div class="showcase-card-bottom"><button type="button" class="showcase-vote" data-vote="'+esc(t.id)+'" aria-pressed="'+!!t.voted+'" aria-label="'+(t.voted?'Вы поддержали идею: ':'Поддержать идею: ')+esc(title)+'" '+(t.voted?'disabled':'')+'>'+(t.voted?'👍 Вы поддержали':'👍 Поддержать')+'</button><span class="showcase-vote-count" aria-label="Количество голосов">'+Number(t.votes||0)+'</span></div></article>';
}
function renderHomeShowcase(){
 const list=items.filter(t=>t.kind==='idea'&&t.published&&showcaseDateMatch(t)).sort((a,b)=>(b.votes||0)-(a.votes||0)||new Date(b.created)-new Date(a.created)).slice(0,6);
 const panel=document.createElement('aside');panel.id='home-showcase';panel.className='home-showcase';panel.setAttribute('aria-label','Витрина идей');
 panel.innerHTML='<div class="home-showcase-head"><div><span class="showcase-eyebrow">FIX IDEA · ВИТРИНА</span><h2>Витрина идей</h2></div><div class="home-showcase-actions"><button type="button" id="home-showcase-expand" aria-label="Развернуть витрину на весь экран" aria-pressed="false">⛶ На весь экран</button><button type="button" id="home-showcase-all">Открыть ↗</button></div></div><div class="home-showcase-periods">'+[['day','День'],['week','Неделя'],['month','Месяц'],['quarter','Квартал'],['all','Все']].map(([id,label])=>'<button type="button" data-home-showcase-period="'+id+'" class="'+(showcasePeriod===id?'active':'')+'">'+label+'</button>').join('')+'</div><div class="home-showcase-shelves">'+(list.length?list.map(t=>'<button type="button" class="home-showcase-product" data-home-showcase-id="'+esc(t.id)+'"><span class="home-showcase-icon">💡</span><strong>'+esc(t.title||'Новая идея')+'</strong><small>👍 '+Number(t.votes||0)+' · '+esc(showcaseState(t))+'</small></button>').join(''):'<div class="home-showcase-empty">За этот период пока нет опубликованных идей</div>')+'</div>';
 $('#view').append(panel);
 panel.querySelector('#home-showcase-expand').onclick=()=>{const expanded=panel.classList.toggle('home-showcase-fullscreen');const button=panel.querySelector('#home-showcase-expand');button.textContent=expanded?'↙ Свернуть':'⛶ На весь экран';button.setAttribute('aria-pressed',String(expanded));document.body.classList.toggle('showcase-expanded',expanded)};
 panel.querySelector('#home-showcase-all').onclick=()=>{page='ideas';shell();render()};
 panel.querySelectorAll('[data-home-showcase-period]').forEach(b=>b.onclick=()=>{showcasePeriod=b.dataset.homeShowcasePeriod;const expanded=panel.classList.contains('home-showcase-fullscreen');panel.remove();renderHomeShowcase();if(expanded){const next=$('#home-showcase');next?.querySelector('#home-showcase-expand')?.click()}});
 panel.querySelectorAll('[data-home-showcase-id]').forEach(b=>b.onclick=()=>{const t=items.find(x=>String(x.id)===b.dataset.homeShowcaseId);if(t)openTicket(t.id)});
}
function renderList(){const list=items.filter(t=>(page!=='pilots'||t.stage==='pilot')&&(page!=='mine'||t.mine)&&(page!=='ideas'||(t.kind==='idea'&&(showcaseScope==='mine'?t.mine:t.published)&&showcaseDateMatch(t)))&&(!stageFilter||page!=='feed'||({insight:['insight','registration'],proposal:['proposal'],implementation:['implementation','result'],discussion:['discussion','evaluation'],decision:['decision'],pilot:['pilot','implementation'],result:['result']}[stageFilter]||[]).includes(t.stage))&&(!filter||t.status===filter)&&(!term||(t.title+' '+t.body+' '+t.department).toLowerCase().includes(term.toLowerCase()))&&((page==='ideas')||!period||new Date(t.created)>new Date(Date.now()-period*86400000))).sort((a,b)=>page==='ideas'?(b.votes-a.votes||new Date(b.created)-new Date(a.created)):0);if(page==='ideas'){const results=$('#results');results.classList.add('showcase-grid');const perPage=6;listPage=Math.max(0,Math.min(listPage,Math.max(0,Math.ceil(list.length/perPage)-1)));const visible=list.slice(listPage*perPage,(listPage+1)*perPage);results.innerHTML=visible.length?visible.map(t=>'<div class="showcase-item">'+showcaseTile(t)+'</div>').join(''):'<div class="showcase-empty"><strong>Нет идей за выбранный период</strong><p>Нажмите «Все», чтобы увидеть остальные идеи.</p></div>';let pager=$('#list-pager');if(!pager){pager=document.createElement('nav');pager.id='list-pager';pager.className='showcase-pager';results.after(pager)}pager.innerHTML=list.length>perPage?'<button type="button" id="showcase-prev" '+(listPage===0?'disabled':'')+'>← Назад</button><span>'+(listPage+1)+' / '+Math.ceil(list.length/perPage)+'</span><button type="button" id="showcase-next" '+(listPage>=Math.ceil(list.length/perPage)-1?'disabled':'')+'>Вперёд →</button>':'';pager.querySelector('#showcase-prev')?.addEventListener('click',()=>{listPage--;renderList()});pager.querySelector('#showcase-next')?.addEventListener('click',()=>{listPage++;renderList()});const count=$('#showcase-count');if(count)count.textContent=(showcaseScope==='mine'?'Мои идеи':'Все идеи')+' · '+showcasePeriodLabel()+' · '+list.length+' '+(list.length===1?'идея':list.length<5?'идеи':'идей');results.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>openTicket(b.dataset.open));wireCards();return}$('#results').classList.remove('showcase-grid');const perPage=innerHeight<500?1:innerWidth<650?2:3;listPage=Math.max(0,Math.min(listPage,Math.ceil(list.length/perPage)-1));let pager=$('#list-pager');if(!pager){pager=document.createElement('div');pager.id='list-pager';pager.className='pager';$('#results').after(pager)}pager.innerHTML=list.length>perPage?`<button id="prev-list" ${listPage===0?'disabled':''} aria-label="Предыдущие инсайты">←</button><small>${listPage+1} / ${Math.ceil(list.length/perPage)}</small><button id="next-list" ${listPage>=Math.ceil(list.length/perPage)-1?'disabled':''} aria-label="Следующие инсайты">→</button>`:'';if($('#prev-list'))$('#prev-list').onclick=()=>{listPage--;renderList()};if($('#next-list'))$('#next-list').onclick=()=>{listPage++;renderList()};$('#results').innerHTML=list.length?list.slice(listPage*perPage,(listPage+1)*perPage).map(card).join(''):'<div class="empty">Здесь пока пусто. Первый инсайт может стать началом улучшения.</div>';wireCards()}
async function render(){if(!me||!$('#view'))return;if((['settings','results'].includes(page)&&!['director','admin'].includes(me.role))||(['chat','discussions','meeting-results','pulse','ai-secretary'].includes(page)&&!['director','admin','lead'].includes(me.role))){page='feed';shell();}const view=$('#view');if(page!=='ecosystem'){document.body.classList.remove('partner-map-active');if(partnerMap){partnerMap.destroy();partnerMap=null}}if(page==='results'){view.classList.remove('list-screen');renderFinancialResults();return}view.classList.remove('meetings-screen','ecosystem-screen','organization-screen','chat-screen','planner-screen');if(page==='planner'){await window.IFPlanner.render();return}if(page==='chat'){await window.IFChat.render();return}if(page==='discussions'){await window.IFDiscussions.render();return}if(page==='organization'){await window.IFOrganization.render();return}if(page==='meeting-results'){await window.IFMeetings.results();return}if(page==='meetings'){await window.IFMeetings.render();return}view.classList.toggle('list-screen',['feed','mine','ideas','pilots'].includes(page));if(['feed','mine','ideas','pilots'].includes(page)){view.innerHTML=(page==='feed'?`<div class="home-hero-wrap"><div class="page-head quote-head" aria-label="Гора и оранжевая дорога">${window.IFQuotes?.html()||''}</div></div>${journey()}${dashboard()}`:head(page==='pilots'?'Пилоты':page==='mine'?'Мои инсайты':'Идеи, которые нас объединяют',page==='ideas'?'Поддержите полезное предложение коллег. Одна идея — один голос от сотрудника.':'Понятные сроки, ответственный отдел и история каждого решения.'))+`<div class="filters"><input id="search" aria-label="Поиск" placeholder="Найти инсайт…" value="${esc(term)}"><select id="status-filter" aria-label="Статус"><option value="">Все статусы</option>${options(status,filter)}</select>${page==='ideas'?'<span id="showcase-count" class="showcase-count"></span>':'<button id="today">Сегодня</button>'}</div><div id="results" class="list"></div>`;if(page==='ideas'){const filters=$('.filters');filters.insertAdjacentHTML('beforebegin','<section class="showcase-heading"><div><span class="showcase-eyebrow">FIX IDEA · ГАЛЕРЕЯ ПРЕДЛОЖЕНИЙ</span><h2>Витрина идей</h2><p>Идеи сотрудников, открытые для обсуждения и поддержки</p><div id="showcase-scope" class="showcase-scope" role="group" aria-label="Фильтр идей"><button type="button" data-showcase-scope="all" class="'+(showcaseScope==='all'?'active':'')+'" aria-pressed="'+(showcaseScope==='all')+'">Все идеи</button><button type="button" data-showcase-scope="mine" class="'+(showcaseScope==='mine'?'active':'')+'" aria-pressed="'+(showcaseScope==='mine')+'">Мои идеи</button></div></div><div id="showcase-periods" class="showcase-periods" role="group" aria-label="Период витрины">'+[['day','День'],['week','Неделя'],['month','Месяц'],['quarter','Квартал'],['all','Все']].map(([id,label])=>'<button type="button" data-showcase-period="'+id+'" class="'+(showcasePeriod===id?'active':'')+'">'+label+'</button>').join('')+'</div></section>')}$('#search').oninput=e=>{term=e.target.value;renderList()};$('#status-filter').onchange=e=>{filter=e.target.value;renderList()};if(page==='ideas'){document.querySelectorAll('[data-showcase-scope]').forEach(b=>b.onclick=()=>{showcaseScope=b.dataset.showcaseScope;listPage=0;document.querySelectorAll('[data-showcase-scope]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});renderList()});const tabs=$('#showcase-periods');if(tabs){tabs.querySelectorAll('[data-showcase-period]').forEach(b=>b.onclick=()=>{showcasePeriod=b.dataset.showcasePeriod;listPage=0;tabs.querySelectorAll('button').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});renderList()})}}if(page==='feed'){const secretary=$('#journey-ai-secretary');if(secretary)secretary.onclick=openAISecretary;}if($('#today'))$('#today').onclick=()=>{period=period?0:1;$('#today').textContent=period?'Все дни':'Сегодня';renderList()};renderList();if(page==='feed')renderHomeShowcase();wireNew();wireDashboard();if($('#home-ai-secretary'))$('#home-ai-secretary').onclick=openAISecretary;document.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>{if(b.dataset.stage==='discussion'){window.IFDiscussions.open();return}if(b.dataset.stage==='result'){page='results';stageFilter='';shell();render();return}if(b.dataset.stage==='pilot'){page='pilots';stageFilter='';shell();render();return}stageFilter=stageFilter===b.dataset.stage?'':b.dataset.stage;document.querySelectorAll('[data-stage]').forEach(t=>{const active=stageFilter===t.dataset.stage;t.classList.toggle('is-active',active);t.setAttribute('aria-pressed',String(active))});listPage=0;renderList()});return}
if(page==='vendors'||page==='ecosystem'){renderCatalog(page);wireNew();return}
if(page==='pulse'){const total=items.length,answered=items.filter(t=>t.first_response).length,done=items.filter(t=>t.status==='done').length,overdue=items.filter(late).length;const times=items.filter(t=>t.first_response).map(t=>(new Date(t.first_response)-new Date(t.created))/3600000);const avg=times.length?(times.reduce((a,b)=>a+b,0)/times.length).toFixed(1):'—';view.innerHTML=head('Пульс компании','Измеряем реальные изменения, а не количество сообщений.')+`<div class="kpis">${[[total,'Инсайтов'],[total?Math.round(answered/total*100)+'%':'—','Рассмотрено'],[done,'Улучшений реализовано'],[overdue,'Срок ответа истёк']].map(([n,t])=>`<div class="kpi"><strong>${n}</strong><span>${t}</span></div>`).join('')}</div><div class="grid"><section class="panel"><h2>Нагрузка по подразделениям</h2>${deps.map(d=>{const n=items.filter(t=>t.department===d).length;return `<div class="bar"><div><span>${d}</span><b>${n}</b></div><progress max="${Math.max(1,...deps.map(d=>items.filter(t=>t.department===d).length))}" value="${n}"></progress></div>`}).join('')}</section><section class="panel"><h2>Качество обратной связи</h2><p>Первый ответ в среднем: <b>${avg} ч</b></p><p>С результатом: <b>${items.filter(t=>['done','reject'].includes(t.status)&&t.result).length}</b></p><p>На контроле директора: <b>${items.filter(t=>t.controlled).length}</b></p><button id="export">Скачать отчёт CSV</button><p class="hint">Показатели рассчитаны по инсайтам, доступным вашей роли. Сроки первого ответа: 24 / 72 / 168 ч.</p></section></div><h2>Требуют внимания</h2><div class="list">${items.filter(late).slice(0,10).map(card).join('')||'<div class="empty">Просроченных инсайтов нет</div>'}</div>`;$('#export').onclick=exportCSV;wireCards();wireNew();return}
if(page==='preferences'){view.innerHTML=head('Настройки','Подключения и уведомления вашего аккаунта.')+'<section class="panel"><h2>Подключения</h2><button type="button" id="preferences-bitrix">Мой Битрикс</button><p class="hint">Подключение и управление интеграцией Bitrix24.</p></section><section class="panel"><h2>Уведомления</h2><button type="button" id="preferences-push">🔔 Настроить уведомления</button><p class="hint">Разрешения, проверка и отключение уведомлений.</p></section>';$('#preferences-bitrix').onclick=()=>window.IFBitrixAccount.open();$('#preferences-push').onclick=()=>window.IFPush.settings();return}
if(page==='preferences'){
 view.innerHTML='<div class="page-head"><h1>Настройки личного кабинета</h1></div><section class="panel"><h2>Профиль</h2><p>'+esc(me.name)+' · '+esc(role[me.role])+' · '+esc(me.department)+'</p></section>';
 if(['director','admin'].includes(me.role)){
  try{const setting=await api('/profile/idea-visibility');if(!view.isConnected||page!=='preferences')return;
   view.insertAdjacentHTML('beforeend','<section class="panel"><h2>Кому показывать мои собственные идеи</h2><form id="idea-visibility-form" class="stack"><label>Видимость<select name="audience">'+options({private:'Только я',leaders:'Только руководители',all:'Все сотрудники'},setting.audience)+'</select></label><p>Выбор применяется ко всем вашим неанонимным идеям, включая ранее созданные. «Руководители» и «Все сотрудники» разрешают показ ваших идей выбранной аудитории во всех отделах. Материалы совещаний остаются закрытыми.</p><p class="error" role="alert"></p><button class="primary" type="submit">Сохранить видимость</button></form></section>');
   bindForm('#idea-visibility-form',async b=>{await api('/profile/idea-visibility',{audience:b.audience},'PUT');me.idea_audience=b.audience;toast('Видимость ваших идей обновлена')});
  }catch(e){toast(e.message)}
 }
 return;
}
if(page==='settings'){const [users,s]=await Promise.all([api('/users'),api('/settings')]);view.innerHTML=head('Управление','Роли, подразделения и нормативы первого ответа.')+`<section class="panel"><h2>Срок ответа в часах</h2><form id="sla" class="stack"><div class="split">${[['high','Срочный'],['medium','Обычный'],['low','Низкий']].map(([k,t])=>`<label>${t}<input name="${k}" type="number" min="1" max="720" value="${s[k]}" required></label>`).join('')}</div><button type="submit" class="primary">Сохранить нормативы</button></form></section><section class="panel"><h2>Команда</h2><div class="tablewrap"><table><thead><tr><th>Сотрудник</th><th>Роль</th><th>Отдел</th><th></th></tr></thead><tbody>${users.map(u=>`<tr><td>${esc(u.name)}<br><small>${esc(u.login)}</small></td><td><select data-user-role="${u.id}" ${me.role!=='director'?'disabled':''}>${options(role,u.role)}</select></td><td><select data-user-dep="${u.id}" ${me.role!=='director'?'disabled':''}>${depOptions(u.department)}</select></td><td>${me.role==='director'?`<button data-user="${u.id}">Сохранить</button>`:''}</td></tr>`).join('')}</tbody></table></div></section>`;bindForm('#sla',async b=>{await api('/settings',Object.fromEntries(Object.entries(b).map(([k,v])=>[k,+v])),'PUT');toast('Нормативы сохранены')});document.querySelectorAll('[data-user]').forEach(b=>b.onclick=async()=>{try{await api('/users',{id:b.dataset.user,role:document.querySelector(`[data-user-role="${b.dataset.user}"]`).value,department:document.querySelector(`[data-user-dep="${b.dataset.user}"]`).value},'PUT');toast('Права обновлены')}catch(e){toast(e.message)}});window.IFBitrix?.settings(view);window.IFPilot?.settings(view);window.IFChannels?.settings(view);if(me.role==='director'){const b=document.createElement('button');b.textContent='Настроить отрасли вендоров';b.onclick=editVendorIndustries;view.append(b)}wireNew();return}
view.innerHTML=head('FixIdea всегда рядом','Одно пространство — на телефоне и компьютере.')+`<div class="grid"><section class="panel"><h2>Мобильное приложение</h2><p>Установите FixIdea с помощью браузера. Инсайты синхронизируются с сайтом через общую базу.</p><button id="install-help">Как установить приложение</button><p><button id="install-app" class="primary">Установить FixIdea</button></p></section><section class="panel"><h2>Приложение для компьютера</h2><p>В Chrome или Edge откройте меню → «Установить FixIdea». Приложение откроется отдельным окном.</p><p class="hint">Рабочее пространство уже открыто на этой странице.</p><p class="hint">Это устанавливаемое веб-приложение. Отдельные APK / EXE в этой версии не выпускаются.</p></section></div>`;$('#install-app').onclick=install;$('#install-help').onclick=()=>modal('Установить FixIdea','<p>Android: в меню Chrome выберите «Установить приложение».</p><p>iPhone: Safari → «Поделиться» → «На экран Домой».</p><p>Компьютер: Chrome или Edge → «Установить FixIdea».</p>');wireNew();}
async function uploadTicketFiles(id,files){
 for(const file of files){
  const base64=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=()=>reject(new Error('Не удалось прочитать '+file.name));reader.readAsDataURL(file)});
  let summary='';
  if(/^(text\/|application\/(json|xml))/.test(file.type)||/\.(txt|csv|json|md)$/i.test(file.name)){
   const sample=(await file.text()).replace(/\s+/g,' ').trim();
   summary=sample?'Начало содержимого: '+sample.slice(0,230):'Текстовый файл пуст';
  }else summary='Автоматическое описание содержимого пока недоступно. Файл приложен для просмотра.';
  await api('/tickets/'+id+'/files',{filename:file.name,mime:file.type||'application/octet-stream',base64,summary});
 }
}
async function showTicketFiles(id){
 const target=$('#ticket-files');if(!target)return;
 try{const files=await api('/tickets/'+id+'/files');target.replaceChildren();
  if(!files.length){target.textContent='Прикреплённых файлов нет';return}
  for(const f of files){const row=document.createElement('div');row.className='panel';
   const link=document.createElement('a');link.href='/api/tickets/'+id+'/files/'+f.id;link.textContent='📎 '+f.filename+' ('+Math.ceil(f.size/1024)+' КБ)';link.setAttribute('download',f.filename);
   const desc=document.createElement('p');desc.className='hint';desc.textContent=f.summary||'Описание отсутствует';row.append(link,desc);target.append(row)}
 }catch(e){target.textContent='Не удалось загрузить вложения: '+e.message}
}
function newTicket(){modal('Что можно улучшить?',`<form id="create" class="stack">${catalogForm()}<label>Видимость<select name="visibility"><option value="private">Только я — личный инсайт</option><option value="leaders">Только руководители</option><option value="department">Показывать сотрудникам отдела</option></select></label><label>Объект на карте<select name="context_id"><option value="">Без привязки</option></select></label><label>Ваше сообщение<textarea name="body" required minlength="10" maxlength="5000" placeholder="Опишите проблему или идею своими словами…"></textarea></label><label>📎 Прикрепить файлы (до 3 файлов, каждый до 2 МБ)<input id="ticket-file-input" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.json,.png,.jpg,.jpeg,.webp,.mp3,.wav,.mp4,.webm"></label><div id="ticket-file-list" class="hint"></div><div id="similar"></div><div class="split"><label>Тип<select name="kind">${options({problem:'Проблема',idea:'Идея',praise:'Благодарность'},'problem')}</select></label><label>Отдел<select name="department"><option value="">Определить по сообщению</option>${depOptions('')}</select></label></div><label>Приоритет<select name="priority">${options({high:'Срочный · 24 часа',medium:'Обычный · 72 часа',low:'Низкий · 7 дней'},'medium')}</select></label><label>Время первого ответа<select name="first_response_minutes"><option value="5">5 минут</option><option value="10">10 минут</option><option value="15">15 минут</option><option value="30">30 минут</option><option value="60">1 час</option><option value="120">2 часа</option><option value="240">4 часа</option><option value="480">8 часов</option><option value="720">12 часов</option><option value="1440" selected>1 день</option><option value="2880">2 дня</option><option value="4320">3 дня</option><option value="7200">5 дней</option><option value="10080">7 дней</option></select><small class="hint">Срок первого содержательного ответа, не окончательного решения</small></label><label class="check"><input name="anonymous" type="checkbox">Отправить анонимно</label><div class="hint">Анонимный инсайт не хранит автора. Сохраните выданный код, чтобы отслеживать ответ. Идеи публикует руководитель после проверки.</div><p class="error" role="alert"></p><button type="submit" class="primary">Сохранить инсайт</button></form>`);const fileInput=$('#ticket-file-input'),fileList=$('#ticket-file-list');
 fileInput.onchange=()=>{const files=[...fileInput.files];fileList.textContent=files.length?files.map(f=>f.name+' ('+Math.ceil(f.size/1024)+' КБ)').join(' · '):'';if(files.length>3||files.some(f=>f.size>2097152)){toast('Не более 3 файлов, каждый до 2 МБ');fileInput.value='';fileList.textContent=''}};
 api('/map-directory').then(rows=>{const select=$('#create [name=context_id]');if(select)select.innerHTML='<option value="">Без привязки</option>'+rows.map(x=>'<option value="'+esc(x.id)+'">'+esc(({clients:'Клиент: ',projects:'Проект: ',vendors:'Вендор: ',partners:'Партнёр: '}[x.category])+x.name)+'</option>').join('');if(select?.dataset.preselected)select.value=select.dataset.preselected}).catch(()=>{});const createForm=$('#create'),syncPrivacy=()=>{const privateOption=createForm.querySelector('[name=visibility] option[value=private]');privateOption.disabled=createForm.elements.entry_type.value!=='insight'||createForm.elements.anonymous.checked;if(privateOption.disabled&&createForm.elements.visibility.value==='private')createForm.elements.visibility.value='leaders'};createForm.elements.entry_type.addEventListener('change',syncPrivacy);createForm.elements.anonymous.addEventListener('change',syncPrivacy);bindVendorScope($('#create'));window.IFVoice?.mount($('#create'));window.IFOrganization?.recipient($('#create'));const area=$('#create textarea');area.oninput=()=>{const words=area.value.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(w=>w.length>4);const related=items.filter(t=>t.published&&words.filter(w=>t.body.toLowerCase().includes(w)).length>=2).slice(0,3);$('#similar').innerHTML=related.length?'<div class="hint">Похожие идеи — возможно, достаточно поддержать одну из них:<br>'+related.map(t=>`<button type="button" data-related="${t.id}">#${t.id} ${esc(t.title.slice(0,55))}</button>`).join('')+'</div>':'';document.querySelectorAll('[data-related]').forEach(b=>b.onclick=()=>{const id=b.dataset.related;$('#modal').close();openTicket(id)})};bindForm('#create',async b=>{const files=[...fileInput.files];const t=await api('/tickets',{...b,anonymous:!!b.anonymous});if(files.length){try{await uploadTicketFiles(t.id,files)}catch(e){toast('Заявка сохранена, но вложение не загружено: '+e.message)}}$('#modal').close();await refresh();if(t.code)modal('Сохраните код доступа',`<p>Инсайт <b>#${t.id}</b> принят.</p><p class="pre"><b>${esc(t.code)}</b></p><p>Для отслеживания нужны номер и код. Восстановить код невозможно.</p><button id="copy-code">Скопировать номер и код</button>`);if($('#copy-code'))$('#copy-code').onclick=()=>navigator.clipboard.writeText(`#${t.id} ${t.code}`).then(()=>toast('Код скопирован')).catch(()=>toast('Выделите и скопируйте код вручную'));if(!t.code)await openTicket(t.id);toast('Спасибо за своевременную информацию! '+(t.bitrix_sync?.message||''))})}
function timeline(events){return `<ul class="timeline">${events.map(e=>`<li><small>${fmt(e.created)} · <span data-user-text>${esc(e.actor)}</span>${e.internal?' · Внутренний комментарий':''}</small><p ${e.actor==='Система'?'':'data-user-text'}>${esc(e.text)}</p></li>`).join('')}</ul>`}
async function openTicket(id){try{const t=await api('/tickets/'+id);modal('Инсайт #'+t.id,`<span class="badge ${t.status}">${status[t.status]}</span><h3 data-user-text style="margin-top:16px">${esc(t.title)}</h3><p class="pre" data-user-text>${esc(t.body)}</p>${catalogBadges(t)}${t.workflow?.context?`<p class="hint">${t.workflow.context.category==='clients'?'Постоянный клиент':'Проект'}: ${esc(t.workflow.context.name)}</p>`:''}${window.IFActions?.html(t)||''}<p class="muted">${esc(t.department)} · Решение до ${fmt(t.due)}</p>${t.first_response_due?`<p class="hint">Первый ответ до ${fmt(t.first_response_due)} · ${t.first_response?'Получен':new Date(t.first_response_due).getTime()<Date.now()?'Просрочен':'Ожидается'}</p>`:''}${t.canManage?'<button id="to-meeting">Вынести на совещание</button>':''}${t.canManage?`<form id="update" class="stack"><label>Статус<select name="status">${options(status,t.status)}</select></label><label>Результат / причина решения<textarea name="result" maxlength="3000">${esc(t.result)}</textarea></label><label class="check"><input type="checkbox" name="controlled" ${t.controlled?'checked':''}>На контроле</label>${t.kind==='idea'&&!t.anonymous?`<label class="check"><input type="checkbox" name="published" ${t.published?'checked':''}>Опубликовать идею в витрине (текст станет доступен сотрудникам)</label>`:''}<button type="submit" class="primary">Сохранить решение</button></form><hr>`:t.result?`<div class="hint"><span>Результат:</span> <span data-user-text>${esc(t.result)}</span></div>`:''}${t.canSetVisibility?`<form id="visibility-form" class="stack"><label>Кто видит запись<select name="visibility">${options({...((t.stage==='insight')?{private:'Только я'}:{}),leaders:'Только руководители',department:'Сотрудники моего отдела'},t.workflow?.visibility||'leaders')}</select></label><button>Сохранить видимость</button></form>`:''}${workflowView(t)}<h3>Прикреплённые файлы</h3><div id="ticket-files">Загрузка…</div><h3>История инсайта</h3>${timeline(t.events)}${t.canComment?`<form id="comment" class="stack"><label>Комментарий<textarea name="text" required minlength="2" maxlength="3000"></textarea></label>${t.canManage?'<label class="check"><input type="checkbox" name="internal">Внутренний — только для руководителей</label>':''}<button type="submit">Добавить комментарий</button></form>`:''}`);organizeTicket();showTicketFiles(t.id);window.IFActions?.bind(t);if($('#to-meeting'))$('#to-meeting').onclick=()=>window.IFMeetings.assign(t);bindWorkflow(t);bindForm('#visibility-form',async b=>{await api('/tickets/'+id+'/visibility',b,'PUT');await refresh();await openTicket(id)});bindForm('#update',async b=>{await api('/tickets/'+id,{...b,controlled:!!b.controlled,published:!!b.published},'PATCH');$('#modal').close();await refresh();toast('Решение сохранено')});bindForm('#comment',async b=>{await api('/tickets/'+id+'/comment',{...b,internal:!!b.internal});$('#modal').close();await openTicket(id)});}catch(e){toast(e.message)}}
function exportCSV(){const rows=[['Номер','Инсайт','Отдел','Статус','Создано','Результат','Вендор','Отраслевое решение','Техническое решение'].map(x=>window.IFI18n.t(x)),...items.map(t=>[t.id,t.title,window.IFI18n.t(t.department),window.IFI18n.t(status[t.status]),t.created,t.result,cat.vendors.find(x=>x.id===t.vendor_id)?.name||'',window.IFI18n.t(cat.industry.find(x=>x.id===t.industry_id)?.label[0]||''),window.IFI18n.t(cat.technical.find(x=>x.id===t.technical_id)?.label[0]||'')])];const safe=s=>'"'+String(s??'').replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"';const blob=new Blob(['\ufeff'+rows.map(r=>r.map(safe).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='FixIdea-report.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
async function install(){if(installPrompt){await installPrompt.prompt();installPrompt=null}else toast('В меню браузера выберите «Установить приложение» или «На главный экран»')}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e});
window.addEventListener('online',()=>me&&refresh());
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
login();
// Every new page load starts at the sign-in form; never restore /api/me automatically.
window.addEventListener('pageshow',event=>{if(event.persisted){me=null;items=[];page='feed';login()}});

setInterval(()=>{if(me&&!document.hidden)refresh()},15000);

function mountainProgress(stage){
 const keys=Object.keys(stages),at=Math.max(0,keys.indexOf(stage));
 const rows=keys.map((key,i)=>{
  const done=i<at,current=i===at,kind=done?'done':current?'current':'pending';
  const mark=done?'✓':current?'●':String(i+1);
  const detail=done?'Этап пройден':current?'Текущий этап':'Ожидает выполнения';
  return '<li class="tracking-step '+kind+'"'+(current?' aria-current="step"':'')+'><span class="tracking-marker" aria-hidden="true">'+mark+'</span><span class="tracking-info"><strong>'+esc(stages[key])+'</strong><small>'+detail+'</small></span></li>';
 }).join('');
 return '<div class="parcel-tracking" aria-label="Отслеживание этапов идеи"><p class="tracking-summary"><strong>Пройдено: '+at+' из '+keys.length+'</strong><span>Сейчас: '+esc(stages[keys[at]])+'</span></p><ol class="tracking-list">'+rows+'</ol></div>';
}
function workflowView(t){
 const w=t.workflow||{},keys=Object.keys(stages),at=keys.indexOf(t.stage);
 const moneyKeys=[['pilotIncome','Доход пилота'],['pilotExpense','Расходы пилота'],['implementationIncome','Доход внедрения'],['implementationExpense','Расходы внедрения']];
 const fields=[['insight','Что заметили'],['proposal','Что предлагаем изменить'],['benefit','Польза для компании'],['discussion','Итоги обсуждения'],['cost','Затраты и ресурсы'],['effect','Ожидаемый эффект'],['feasibility','Реализуемость и риски'],['reason','Обоснование решения'],['pilot','План пилота'],['pilotResult','Результат пилота'],['owner','Ответственный'],['deadline','Срок внедрения'],['implementation','Что внедрено'],['before','Показатель до'],['after','Показатель после'],['result','Итог и обратная связь автору'],...moneyKeys];
 let html='<section class="workflow"><h3>От инсайта до результата</h3>'+mountainProgress(t.stage);
 if(t.stage==='discussion')html+='<div class="hint" style="margin:12px 0"><strong>После обсуждения</strong><p>Выберите дальнейшее действие по идее.</p><div style="display:flex;flex-wrap:wrap;gap:8px"><button type="button" id="discussion-to-bitrix" class="primary">Отправить в Битрикс24</button><button type="button" id="discussion-revise">Доработать</button></div><p id="discussion-action-status" role="status"></p></div>';
 html+=window.IFBitrix?.ticket(t)||'';
 if(!t.canManage&&!t.canEditInsight)return html+fields.filter(([k])=>w[k]).map(([k,label])=>`<p class="pre"><b>${label}:</b> <span data-user-text>${esc(w[k])}</span></p>`).join('')+'</section>';
 return html+`<form id="workflow" class="stack"><label>Текущий этап<select name="stage">${options(t.canEditInsight?{insight:'Инсайт',proposal:'Предложение'}:stages,t.stage)}</select></label><p class="hint">Этапы проходят по порядку. Можно сохранить текущий этап или вернуться к доработке. Для перехода система проверит необходимые данные.</p>`+fields.map(([k,label])=>`<label>${label}${k==='deadline'?`<input type="date" name="${k}" value="${esc(w[k]||'')}">`:moneyKeys.some(([key])=>key===k)?`<input type="number" name="${k}" min="0" step="0.01" inputmode="decimal" value="${esc(w[k]||'')}">`:`<textarea name="${k}" maxlength="2000" rows="2">${esc(w[k]||(k==='insight'?t.body:k==='proposal'&&t.kind==='idea'?t.body:''))}</textarea>`}</label>`).join('')+`<label>Решение<select name="decision"><option value="">Ещё не принято</option>${options({approved:'Принять',revise:'Доработать',rejected:'Отклонить'},w.decision)}</select></label><div class="error" role="alert"></div><button type="submit" class="primary">Сохранить этап</button></form></section>`;
}
function bindWorkflow(t){
 const coin=document.querySelector('[data-finance-coin]');
 if(coin){
  const showFinance=()=>{
   const w=t.workflow||{},value=k=>{const n=Number(String(w[k]||'0').replace(',','.'));return Number.isFinite(n)?n:0};
   const money=n=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(n)+' ₸';
   const has=['pilotIncome','pilotExpense','implementationIncome','implementationExpense'].some(k=>String(w[k]||'').trim());
   const rows=[['Доход пилота',value('pilotIncome')],['Расходы пилота',value('pilotExpense')],['Итог пилота',value('pilotIncome')-value('pilotExpense')],['Доход внедрения',value('implementationIncome')],['Расходы внедрения',value('implementationExpense')],['Итог внедрения',value('implementationIncome')-value('implementationExpense')]];
   modal('🪙 Финансы идеи #'+t.id,(has?'':'<p>Финансовые данные пока не внесены.</p>')+rows.map(([label,n])=>'<p style="display:flex;justify-content:space-between;gap:12px;border-bottom:1px solid #ddd;padding:8px"><span>'+label+'</span><b>'+(has?money(n):'—')+'</b></p>').join(''));
  };
  coin.onclick=showFinance;coin.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showFinance()}};
 }

 const send=document.querySelector('#discussion-to-bitrix'),revise=document.querySelector('#discussion-revise');
 if(send)send.onclick=async()=>{
  const state=document.querySelector('#discussion-action-status');
  send.disabled=true;
  try{const result=await api('/tickets/'+t.id+'/bitrix-actions',{action:'task'},'POST');state.textContent=result.message||'Запрос отправлен в Битрикс24';if(result.url){const a=document.createElement('a');a.href=result.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=' Открыть в Битрикс24';state.append(a)}}catch(e){state.textContent=e.message}finally{send.disabled=false}
 };
 if(revise)revise.onclick=()=>{const form=document.querySelector('#workflow');if(!form){toast('Доработка доступна руководителю идеи');return}form.elements.stage.value='proposal';form.scrollIntoView({behavior:'smooth',block:'start'});toast('Выбран этап «Предложение». Уточните данные и нажмите «Сохранить этап».')};
 window.IFBitrix?.bindTicket(t);window.IFPilot?.ticket(t);stageFields();bindForm('#workflow',async b=>{const saved=await api('/tickets/'+t.id+'/workflow',b,'PUT');$('#modal').close();await refresh();await openTicket(t.id);toast(saved.bitrix_sync?.message||saved.pilot_sync?.message||'Этап и результаты сохранены')})}

function organizeTicket(){
 const d=$('#modal'),head=d.querySelector('.dialoghead'),flow=d.querySelector('.workflow');if(!flow)return;
 const panes=['Инсайт','Этапы','История'].map((name,i)=>{const p=document.createElement('section');p.className='dialog-pane';p.hidden=i!==1;return p});
 let group=0;for(const node of [...d.childNodes]){if(node===head)continue;if(node===flow){panes[1].append(node);group=2}else panes[group].append(node)}
 const tabs=document.createElement('nav');tabs.className='dialog-tabs';tabs.setAttribute('aria-label','Карточка инсайта');['Инсайт','Этапы','История'].forEach((name,i)=>{const b=document.createElement('button');b.textContent=name;b.classList.toggle('active',i===1);b.onclick=()=>{panes.forEach((p,j)=>p.hidden=j!==i);[...tabs.children].forEach((v,j)=>v.classList.toggle('active',j===i))};tabs.append(b)});head.after(tabs);d.append(...panes);
}
function stageFields(){
 const f=$('#workflow');if(!f)return;const selector=f.elements.stage;
 const groups={insight:['insight'],proposal:['proposal','benefit'],registration:['insight','proposal'],discussion:['discussion'],evaluation:['cost','effect','feasibility'],decision:['decision','reason'],pilot:['pilot','owner','deadline','pilotResult','pilotIncome','pilotExpense'],implementation:['implementation','owner','deadline','implementationIncome','implementationExpense'],result:['before','after','result','pilotIncome','pilotExpense','implementationIncome','implementationExpense']};
 const show=()=>{for(const label of f.querySelectorAll('label')){const input=label.querySelector('[name]');label.hidden=input&&input.name!=='stage'&&!groups[selector.value].includes(input.name)}};selector.addEventListener('change',show);show();
}
window.addEventListener('resize',()=>{if(['feed','mine','ideas','pilots'].includes(page)&&$('#results'))renderList()});

window.addEventListener('ideafix-language',()=>{if(me&&!$('#modal').open)render()});


function dashboard(){const total=items.length;const inProgress=items.filter(t=>['review','work','clarify'].includes(t.status)).length;const finished=items.filter(t=>t.status==='done').length;const pilots=items.filter(t=>t.stage==='pilot').length;return '<div class="home-stats" aria-label="Статистика идей"><div><b>'+total+'</b><small>Всего идей</small></div><div><b>'+inProgress+'</b><small>В работе</small></div><div><b>'+pilots+'</b><small>В пилоте</small></div><div><b>'+finished+'</b><small>Реализовано</small></div></div><details class="dashboard-meetings"><summary>Ближайшие совещания и форумы</summary><div id="dashboard-upcoming"></div></details><h2 class="home-ideas-title">Мои идеи</h2>'}
function wireDashboard(){document.querySelectorAll('[data-shortcut]').forEach(b=>b.onclick=()=>{page=b.dataset.shortcut;shell();render()});document.querySelectorAll('[data-quick-status]').forEach(b=>b.onclick=()=>{filter=filter===b.dataset.quickStatus?'':b.dataset.quickStatus;$('#status-filter').value=filter;renderList()});window.IFChat?.poll();const upcoming=$('#dashboard-upcoming');if(upcoming)window.IFMeetings?.upcoming(upcoming)}

function notificationRoute(){if(!me)return;if(location.hash==='#chat'&&['director','lead'].includes(me.role)){page='chat';shell();render()}else{const m=location.hash.match(/^#ticket\/(\d+)$/);if(m)openTicket(m[1])}}
window.addEventListener('hashchange',notificationRoute);

function projectFinanceRows(tickets,user){
 const money=v=>{if(v==null||String(v).trim()==='')return null;const n=Number(String(v).replace(',','.'));return Number.isFinite(n)&&n>=0?n:null};
 return tickets.filter(t=>t.canManage||t.mine||t.recipient===user.id).flatMap(t=>{
  let w=t.workflow||{};if(typeof w==='string'){try{w=JSON.parse(w)}catch{w={}}}
  const phases=[['pilot','Пилот','pilotIncome','pilotExpense'],['project','Проект / внедрение','implementationIncome','implementationExpense']];
  return phases.filter(([id,,income,expense])=>id==='pilot'?['pilot','implementation','result'].includes(t.stage)||w.pilot||w[income]!==undefined&&String(w[income]).trim()||w[expense]!==undefined&&String(w[expense]).trim():['implementation','result'].includes(t.stage)||w.implementation||w[income]!==undefined&&String(w[income]).trim()||w[expense]!==undefined&&String(w[expense]).trim()).map(([phase,label,ik,ek])=>{
   const income=money(w[ik]),expense=money(w[ek]);return {id:t.id,title:t.title,phase,label,stage:t.stage,income,expense,balance:income!==null&&expense!==null?income-expense:null};
  });
 });
}
async function renderFinancialResults(){
 const view=$('#view');let imported=[],demo=[],importError='';if(['director','admin','lead'].includes(me.role)){try{[imported,demo]=await Promise.all([api('/project-finances'),api('/project-finances/demo')])}catch(e){importError=e.message}}if(!view.isConnected||page!=='results')return;
 const local=projectFinanceRows(items,me).map(r=>({...r,source:'local'}));
 const rows=[...imported.map(r=>({...r,id:r.key,label:r.phase==='pilot'?'Пилот':'Проект',source:'bitrix',income:r.income===null?null:Number(r.income),expense:r.expense===null?null:Number(r.expense),balance:r.income!==null&&r.expense!==null?Number(r.income)-Number(r.expense):null})),...local,...demo.map(r=>({...r,id:r.key,label:r.phase==='pilot'?'Пилот':'Проект',source:'demo',income:Number(r.income),expense:Number(r.expense),balance:Number(r.income)-Number(r.expense)}))],money=n=>n===null?'Нет данных':new Intl.NumberFormat('ru-RU',{style:'currency',currency:'KZT',maximumFractionDigits:2}).format(n);
 view.innerHTML='<section class="finance-heading"><span class="eyebrow">Фактические показатели</span><h1>Результаты</h1><p>Доходы и расходы проектов и пилотов из Битрикс24</p><button type="button" id="finance-demo">Показать демо-базу</button><button type="button" id="finance-import" class="primary">↓ Загрузить из Битрикс24</button></section><div class="finance-filters"><label>Источник<select id="finance-source"><option value="all">Реальные данные — все источники</option><option value="demo">ДЕМО · проекты и пилоты</option><option value="bitrix">Битрикс24</option><option value="local">Созданные в программе</option></select></label><label>Показать<select id="finance-phase"><option value="">Все проекты и пилоты</option><option value="pilot">Пилоты</option><option value="project">Проекты / внедрение</option></select></label><label>Найти<input id="finance-search" placeholder="Название или номер"></label></div><div id="finance-totals" class="finance-totals"></div><p id="finance-note" class="hint"></p><div class="tablewrap finance-table"><table><thead><tr><th>Проект / пилот</th><th>Доход</th><th>Расход</th><th>Разница</th><th></th></tr></thead><tbody id="finance-rows"></tbody></table></div><p class="hint">Суммы в тенге. Внесите фактический доход и расход в карточке на этапе «Пилот», «Внедрение» или «Результат». Ноль учитывается только если он введён явно.</p>';
 const draw=()=>{const phase=$('#finance-phase').value,source=$('#finance-source').value,q=$('#finance-search').value.toLocaleLowerCase('ru');const shown=rows.filter(r=>(source==='all'?r.source!=='demo':r.source===source)&&(!phase||r.phase===phase)&&(!q||(r.title+' '+r.id).toLocaleLowerCase('ru').includes(q)));
 const sum=key=>{const known=shown.filter(r=>r[key]!==null);return known.length?known.reduce((n,r)=>n+r[key],0):null};const complete=shown.filter(r=>r.balance!==null);
 $('#finance-totals').innerHTML=[['Внесённые доходы',sum('income')],['Внесённые расходы',sum('expense')],['Разница по заполненным строкам',complete.length?complete.reduce((n,r)=>n+r.balance,0):null]].map(([label,n])=>'<div><small>'+label+'</small><strong>'+money(n)+'</strong></div>').join('');
 $('#finance-note').textContent=(source==='demo'?'ДЕМО: вымышленные показатели, не отчётность компании. ':'')+(shown.length?'Показано: '+shown.length+' · Полностью заполнено: '+complete.length+(complete.length<shown.length?' · Итог неполный: часть сумм ещё не внесена.':''):'Проекты и пилоты пока не созданы или не подходят под фильтр.');
 $('#finance-rows').innerHTML=shown.map(r=>'<tr><td><b>'+esc(r.title)+'</b><small>#'+esc(r.id)+' · '+r.label+' · '+esc(r.source==='demo'?'ДЕМО · '+r.department:r.source==='bitrix'?'Битрикс24':stages[r.stage]||r.stage)+'</small></td><td>'+money(r.income)+'</td><td>'+money(r.expense)+'</td><td class="'+(r.balance!==null&&r.balance<0?'late':'')+'">'+money(r.balance)+'</td><td><button type="button" data-finance-open="'+r.id+'" '+(r.source==='demo'?'disabled':'')+'>Открыть</button></td></tr>').join('');view.querySelectorAll('[data-finance-open]').forEach(b=>b.onclick=()=>{const row=shown.find(r=>String(r.id)===b.dataset.financeOpen);if(row?.source_url)window.open(row.source_url,'_blank','noopener,noreferrer');else openTicket(b.dataset.financeOpen)});};
 $('#finance-demo').onclick=()=>{$('#finance-source').value='demo';draw()};$('#finance-import').onclick=openBitrixProjectImport;$('#finance-phase').onchange=draw;$('#finance-source').onchange=draw;$('#finance-search').oninput=draw;draw();if(importError)$('#finance-note').textContent='Не удалось загрузить сохранённые данные: '+importError;
}

async function openBitrixProjectImport(){
 modal('Проекты и суммы из Битрикс24','<section id="project-import-view" class="stack"><p role="status">Читаем доступные проекты…</p></section>');
 const root=$('#project-import-view');let data;
 try{data=await api('/bitrix/project-import')}catch(e){if(root.isConnected){root.textContent=e.message;if(e.status===409){const b=document.createElement('button');b.textContent='Подключить мой Битрикс';b.onclick=()=>{document.querySelector('#modal').close();window.IFBitrixAccount.open()};root.append(b)}}return}
 if(!root.isConnected)return;
 const choices='<option value="">Не загружать суммы</option>'+data.fields.map(f=>'<option value="'+esc(f.id)+'">'+esc(f.name)+' · '+esc(f.id)+'</option>').join('');
 root.innerHTML='<p>Выберите проекты и поля сумм. В Битриксе ничего не меняется.</p><div class="scope-grid"><label>Поле дохода (тенге)<select data-import-income>'+choices+'</select></label><label>Поле расхода (тенге)<select data-import-expense>'+choices+'</select></label><label>Проект с пилотами<select data-import-pilots><option value="">Определить по названию «Пилотные проекты»</option>'+data.groups.map(g=>'<option value="'+esc(g.id)+'">'+esc(g.name)+'</option>').join('')+'</select></label></div><p class="hint">'+esc(data.note)+'</p>'+(!data.fields.length?'<p class="hint">Числовые пользовательские поля задач недоступны. Можно импортировать проекты без сумм. Если финансы хранятся в CRM или отдельной 1С, нужен другой источник.</p>':'')+'<button type="button" data-import-preview>Обновить предварительный список</button><p data-import-state role="status"></p><label class="check"><input type="checkbox" data-import-all checked> Выбрать все</label><div data-import-rows class="import-project-list"></div><button type="button" class="primary" data-import-save>Загрузить выбранное в «Результаты»</button>';
 const find=q=>root.querySelector(q),mapping=()=>({income_field:find('[data-import-income]').value,expense_field:find('[data-import-expense]').value,pilot_group:find('[data-import-pilots]').value});let loadedMapping=mapping(),dirty=false;
 const fmt=n=>n===null?'Нет данных':new Intl.NumberFormat('ru-RU').format(n)+' ₸';
 const paint=()=>{find('[data-import-rows]').innerHTML=data.rows.length?data.rows.map(r=>'<label class="import-project-row"><input type="checkbox" data-import-key="'+esc(r.key)+'" checked><span><b>'+esc(r.title)+'</b><small>'+(r.phase==='pilot'?'Пилот':'Проект')+' · Доход: '+fmt(r.income)+' · Расход: '+fmt(r.expense)+'</small></span></label>').join(''):'<p>Доступных проектов нет. Проверьте права «Группы» и «Задачи» личного вебхука.</p>';find('[data-import-save]').disabled=!data.rows.length;find('[data-import-all]').checked=true;dirty=false;loadedMapping=mapping()};paint();
 root.querySelectorAll('select').forEach(select=>select.onchange=()=>{dirty=true;find('[data-import-save]').disabled=true;find('[data-import-state]').textContent='Обновите предварительный список с выбранными полями.'});
 find('[data-import-all]').onchange=e=>root.querySelectorAll('[data-import-key]').forEach(c=>c.checked=e.target.checked);
 find('[data-import-preview]').onclick=async()=>{const b=find('[data-import-preview]');b.disabled=true;find('[data-import-state]').textContent='Загружаем…';try{const r=await api('/bitrix/project-import?'+new URLSearchParams(mapping()));if(!root.isConnected)return;data=r;paint();find('[data-import-state]').textContent='Список обновлён: '+data.rows.length}catch(e){find('[data-import-state]').textContent=e.message}finally{b.disabled=false}};
 find('[data-import-save]').onclick=async()=>{if(dirty)return;const selected_keys=[...root.querySelectorAll('[data-import-key]:checked')].map(c=>c.dataset.importKey);if(!selected_keys.length){find('[data-import-state]').textContent='Выберите хотя бы один проект или пилот.';return}const b=find('[data-import-save]');b.disabled=true;find('[data-import-state]').textContent='Загружаем выбранные проекты…';try{const r=await api('/bitrix/project-import',{...loadedMapping,selected_keys});document.querySelector('#modal').close();toast('Загружено: '+r.imported);page='results';shell();await render()}catch(e){if(root.isConnected)find('[data-import-state]').textContent=e.message}finally{b.disabled=false}};
}



