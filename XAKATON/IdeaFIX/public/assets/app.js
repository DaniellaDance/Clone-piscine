'use strict';
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stages={insight:'Инсайт',proposal:'Предложение',registration:'Регистрация',discussion:'Обсуждение',evaluation:'Оценка',decision:'Решение',pilot:'Пилот',implementation:'Внедрение',result:'Результат'};
const status={new:'Новое',review:'На рассмотрении',work:'В работе',clarify:'Нужно уточнение',done:'Реализовано',reject:'Отклонено'},role={employee:'Сотрудник',lead:'Руководитель',director:'Директор',admin:'Администратор'},deps=['ИТ','Закупки','Продажи','Склад','Логистика','HR','Руководство'];
let listPage=0;
let me=null,items=[],page='feed',authMode='login',filter='',term='',period=0,stageFilter='',installPrompt=null;
const fmt=d=>new Date(d).toLocaleString(({ru:'ru-RU',en:'en-GB',kk:'kk-KZ'})[window.IFI18n?.lang||'ru'],{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
const options=(o,selected)=>Object.entries(o).map(([v,t])=>`<option value="${esc(v)}" ${v===selected?'selected':''}>${esc(t)}</option>`).join('');
const depOptions=selected=>options(Object.fromEntries(deps.map(d=>[d,d])),selected);
function toast(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),5500)}
async function api(path,data,method){const r=await fetch('/api'+path,{method:method||(data?'POST':'GET'),headers:data?{'Content-Type':'application/json'}:{},body:data?JSON.stringify(data):undefined});const j=await r.json();if(!r.ok){const e=new Error(j.error||'Ошибка запроса');e.status=r.status;throw e}return j}
function modal(title,content){const d=$('#modal');d.innerHTML=`<div class="dialoghead"><h2>${esc(title)}</h2><button data-close aria-label="Закрыть">×</button></div>${content}`;d.showModal();d.querySelector('[data-close]').onclick=()=>d.close()}
function formError(form,e){let p=form.querySelector('.error');if(!p){p=document.createElement('p');p.className='error';form.append(p)}p.textContent=e.message}
function bindForm(id,fn){const f=$(id);if(!f)return;f.onsubmit=async e=>{e.preventDefault();const b=f.querySelector('button[type=submit]');if(b)b.disabled=true;try{await fn(Object.fromEntries(new FormData(f)),f)}catch(err){formError(f,err)}finally{if(b)b.disabled=false}}}
const brand=`<div class="brand"><img class="brand-mark" src="assets/brand-mark.svg" alt=""><div>IdeaFix<small>МОДУС ТРЕЙД</small></div></div>`;
function login(){me=null;$('#app').innerHTML=`<div class="auth"><section class="auth-story">${brand}<h1>Хорошие идеи<br>меняют компанию.</h1><p>Замечайте. Предлагайте. Улучшайте.<br>От первого сообщения — до конкретного результата.</p><p style="margin-top:40px;font-size:12px">Каждая обработанная заявка делает нашу компанию лучше, а жизнь клиентов безопаснее!</p><div class="alpine-scene" aria-hidden="true"></div></section><section class="auth-form"><div class="eyebrow">Единое пространство обратной связи</div><h2>${authMode==='login'?'С возвращением':'Давайте знакомиться'}</h2><div class="tabs"><button id="login-tab" class="${authMode==='login'?'active':''}">Войти</button><button id="register-tab" class="${authMode==='register'?'active':''}">Регистрация</button></div><form id="auth">${authMode==='register'?`<label>Ваше имя<input name="name" autocomplete="name" required minlength="2" maxlength="100"></label><label>Подразделение<select name="department">${depOptions('ИТ')}</select></label>`:''}<label>Логин<input name="login" autocomplete="username" required minlength="3" maxlength="80"></label><label>Пароль<input type="password" name="password" autocomplete="${authMode==='login'?'current-password':'new-password'}" required minlength="3" maxlength="128"></label><p class="error" role="alert"></p><button class="primary" type="submit">${authMode==='login'?'Войти в IdeaFIX':'Создать аккаунт'}</button></form><p class="hint">Новый аккаунт получает роль сотрудника. Директор назначает руководителей и администраторов.</p><button id="track">Отследить анонимный инсайт</button><p class="muted"><a href="install.html">Установить приложение →</a></p></section></div>`;$('#login-tab').onclick=()=>{authMode='login';login()};$('#register-tab').onclick=()=>{authMode='register';login()};$('#track').onclick=track;bindForm('#auth',async b=>{await api('/'+authMode,b);me=await api('/me');page='feed';await refresh(true)})}
function track(){modal('Анонимный инсайт',`<form id="tracking" class="stack"><label>Номер инсайта<input name="id" type="number" required min="1"></label><label>Код доступа<input name="code" required autocomplete="off"></label><button type="submit" class="primary">Показать историю</button><div class="error" role="alert"></div></form><div id="tracking-result"></div>`);bindForm('#tracking',async b=>{const t=await api('/track',b);$('#tracking-result').innerHTML=`<hr><h3>#${t.id} · ${esc(t.title)}</h3><span class="badge ${t.status}">${status[t.status]}</span><p class="pre">${esc(t.body)}</p>${timeline(t.events)}`})}
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
  insight:'<path d="M9 18h6m-5 3h4m-7-9a5 5 0 0 1 10 0c0 2.5-1.7 3.5-2.5 5h-5C8.7 15.5 7 14.5 7 12Z"/><path d="M4 4l1.5 1.5M20 4l-1.5 1.5M12 1v2"/>',
  discussion:'<path d="M20 11.5a6.5 6.5 0 0 1-6.5 6.5H9l-4 3v-4a6.5 6.5 0 0 1-1-11.7"/><path d="M12 3h4a5 5 0 0 1 0 10h-5l-3 2v-3a5 5 0 0 1 4-9Z"/>',
  decision:'<rect x="6" y="4" width="13" height="18" rx="2"/><path d="M10 4V2h5v2M9 10l1.5 1.5L13 9m-4 7 1.5 1.5L13 15"/>',
  pilot:'<path d="M22 3 2 11l8 2 2 8 10-18Z"/><path d="m10 13 7-6"/>',
  result:'<path d="M8 3h8v7a4 4 0 0 1-8 0V3ZM8 5H5v3a4 4 0 0 0 4 4m7-7h3v3a4 4 0 0 1-4 4M12 14v4m-4 3h8m-7-3h6"/>'
 };
 return '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[key]+'</svg>';
}
function journey(){
 const steps=[['insight','Инсайт'],['discussion','Обсуждение'],['decision','Решение'],['pilot','Пилот'],['result','Результат']];
 return '<section class="stage-journey" aria-label="Этапы пути от идеи до результата">'+steps.map(([id,label])=>'<div class="stage-tile stage-'+id+'"><button type="button" class="stage-select'+(stageFilter===id?' is-active':'')+'" data-stage="'+id+'" aria-pressed="'+(stageFilter===id)+'" title="Показать этап: '+label+'"><span class="stage-icon">'+stageIcon(id)+'</span><span class="stage-title">'+label+'</span></button>'+(id==='insight'?'<button type="button" id="record-idea" aria-label="Записать идею голосом, текстом или видео">＋ Записать идею <span aria-hidden="true">🎙</span></button>':'')+'</div>').join('')+'</section>';
}
function shell(){
 const nav=[['feed','Главная'],['mine','Мои инсайты'],['ideas','Витрина идей'],['vendors','Контакты вендоров'],['ecosystem','Вендоры'],['meetings','График совещаний'],['planner','План дня'],['pilots','Пилоты'],['organization','Отделы и сотрудники'],...(['director','lead'].includes(me.role)?[['chat','Чат руководителей'],['discussions','Обсуждения идей']]:[]),...(['director','lead','admin'].includes(me.role)?[['pulse','Пульс компании']]:[]),...(['director','admin'].includes(me.role)?[['settings','Управление']]:[]),['apps','Приложения']];
 const leading=[['feed','Главная','⌂'],['mine','Мои идеи','◉'],['ecosystem','Вендоры','♧'],['meetings','Совещания','▣'],['planner','План дня','▤']];
 const other=nav.filter(([id])=>!leading.some(([key])=>key===id));
 const navButton=(id,label,glyph)=>'<button type="button" data-page="'+id+'" class="bottom-link'+(page===id?' active':'')+'" title="'+label+'"><span class="bottom-icon" aria-hidden="true">'+glyph+'</span><span class="bottom-text">'+label+'</span></button>';
 $('#app').innerHTML='<header class="header">'+brand+'<div class="account"><span class="username" data-user-text>'+esc(me.name)+' · '+role[me.role]+'</span><span id="connection">● Онлайн</span><button type="button" id="connect-my-bitrix">Мой Битрикс</button><details class="account-more"><summary aria-label="Профиль и выход" title="Профиль">☻</summary><div class="account-popup"><span data-user-text>'+esc(me.name)+'</span><button type="button" id="logout">Выйти</button></div></details></div></header><div class="layout"><main id="view"></main></div><nav class="bottom-nav" aria-label="Главное меню">'+leading.map(([id,label,icon])=>navButton(id,label,icon)).join('')+'<button type="button" id="media-inbox-button" class="bottom-link" title="Обращения"><span class="bottom-icon" aria-hidden="true">✉</span><span class="bottom-text">Обращения</span></button><details class="bottom-more"><summary><span class="bottom-icon" aria-hidden="true">•••</span><span class="bottom-text">Ещё</span></summary><div class="bottom-more-menu">'+other.map(([id,label])=>'<button type="button" data-page="'+id+'" class="'+(page===id?'active':'')+'">'+label+'</button>').join('')+'</div></details></nav>';
 window.IFPush?.mount(document.querySelector('.header'));
 $('#media-inbox-button').onclick=showMediaInbox;
 $('#connect-my-bitrix').onclick=()=>window.IFBitrixAccount.open();
 $('#logout').onclick=async()=>{try{await window.IFPush?.detach();await api('/logout',{});login()}catch(e){toast(e.message)}};
 document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{page=b.dataset.page;filter='';term='';stageFilter='';shell();render()});
}

async function refresh(initial=false){try{const next=await api('/tickets');if(!initial&&items.length&&next.some(n=>!items.some(i=>i.id===n.id))){toast('Появился новый инсайт');sound()}items=next;if(initial)shell();if(initial||(!$('#modal').open&&!document.querySelector('input:focus,textarea:focus,select:focus')))await render();const c=$('#connection');if(c)c.textContent='● Онлайн'}catch(e){if(e.status===401)login();else{const c=$('#connection');if(c)c.textContent='○ Нет связи';if(initial)toast(e.message)}}}
function sound(){try{const a=new AudioContext(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);g.gain.value=.05;o.frequency.value=650;o.start();o.stop(a.currentTime+.12);o.onended=()=>a.close()}catch{}}
function head(title,sub=''){return `<div class="page-head"><div><div class="eyebrow">Ваш голос имеет значение</div><h1>${title}</h1><p class="muted">${sub}</p></div><button id="new" class="primary">＋ Инсайт</button></div>`}
function chooseIdeaMode(){
 modal('Записать идею',`<div class="voice-actions" style="display:grid;gap:12px;padding:12px 0"><button type="button" id="idea-by-voice" class="primary">🎙 Записать голосом</button><button type="button" id="idea-by-text">✍ Написать текстом</button><button type="button" id="idea-by-video">🎥 Записать видеообращение</button></div>`);
 $('#idea-by-voice').onclick=()=>{ $('#modal').close();newTicket();const button=$('#create [data-dictate]');if(button&&!button.disabled)button.click() };
 $('#idea-by-text').onclick=()=>{ $('#modal').close();newTicket();$('#create textarea[name=body]')?.focus() };
 $('#idea-by-video').onclick=()=>{ $('#modal').close();recordIdeaVideo() };
}
async function recordIdeaVideo(){
 modal('Видеообращение',`<div style="display:grid;gap:12px">
  <p class="hint">Видео записывается только с вашего разрешения. Перед отправкой его можно просмотреть или удалить.</p>
  <video id="idea-video-preview" autoplay muted playsinline style="width:100%;max-height:48vh;background:#14202a;border-radius:12px"></video>
  <p id="idea-video-status" role="status">Подготовка камеры…</p>
  <label>Текст видеообращения<textarea id="idea-video-transcript" rows="5" placeholder="Во время записи здесь появятся распознанные слова. После остановки проверьте текст."></textarea></label>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
   <button type="button" id="idea-video-stop" class="primary" disabled>Остановить запись</button>
   <button type="button" id="idea-video-share" hidden>Поделиться видео</button>
   <button type="button" id="idea-video-download" hidden>Сохранить видео</button>
   <button type="button" id="idea-video-retake" hidden>Перезаписать</button>
  </div></div>`);
 const dialog=$('#modal'),video=$('#idea-video-preview'),status=$('#idea-video-status');
 const stop=$('#idea-video-stop'),share=$('#idea-video-share'),download=$('#idea-video-download'),retake=$('#idea-video-retake'),transcript=$('#idea-video-transcript');
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
   speech.onend=()=>{
    if(speechStopped||closed)return;
    const next=updateWords();
    if(next&&!speechFinal.endsWith(next))speechFinal=(speechFinal+' '+next).trim();
    spokenParts.clear();
    try{launch()}catch{}
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
 dialog.addEventListener('close',release,{once:true});
 const begin=async()=>{
  cleanup();if(url){URL.revokeObjectURL(url);url=null}
  blob=null;chunks=[];speechFinal='';spokenParts.clear();transcript.value='';share.hidden=true;download.hidden=true;retake.hidden=true;stop.disabled=true;
  if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){status.textContent='Запись видео не поддерживается этим браузером.';return}
  try{
   status.textContent='Запрашиваем разрешение на камеру и микрофон…';
   let cameraTimedOut=false;
   const cameraRequest=navigator.mediaDevices.getUserMedia({video:{facingMode:'user'},audio:true});
   cameraRequest.then(lateStream=>{if(cameraTimedOut||closed)lateStream.getTracks().forEach(t=>t.stop())}).catch(()=>{});
   let cameraTimer;
   try{
    stream=await Promise.race([
     cameraRequest,
     new Promise((_,reject)=>{cameraTimer=setTimeout(()=>{cameraTimedOut=true;reject(new Error('CAMERA_TIMEOUT'))},12000)})
    ]);
   }finally{clearTimeout(cameraTimer)}
   if(closed){cleanup();return}
   video.srcObject=stream;video.muted=true;video.controls=false;
   const type=['video/webm;codecs=vp8,opus','video/webm','video/mp4'].find(t=>MediaRecorder.isTypeSupported(t));
   recorder=new MediaRecorder(stream,type?{mimeType:type}:undefined);
   recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
   recorder.onstop=async()=>{
    stopSpeech();cleanup();if(closed)return;
    await finalizeText();
    blob=new Blob(chunks,{type:recorder.mimeType||'video/webm'});
    if(!blob.size){status.textContent='Видео не записалось. Попробуйте ещё раз.';retake.hidden=false;return}
    url=URL.createObjectURL(blob);video.srcObject=null;video.src=url;video.muted=false;video.controls=true;video.play().catch(()=>{});
    status.textContent='Видео готово. Выберите, кому отправить его через меню «Поделиться», либо сохраните файл.';
    share.hidden=false;download.hidden=false;retake.hidden=false;stop.disabled=true;
   };
   recorder.start(1000);startSpeech();stop.disabled=false;status.textContent='Идёт запись видео и звука. Нажмите «Остановить запись», когда закончите.';
  }catch(e){cleanup();status.textContent=e.message==='CAMERA_TIMEOUT'?'Камера не ответила за 12 секунд. Проверьте разрешения камеры и микрофона в браузере и нажмите «Повторить».':e.name==='NotAllowedError'?'Доступ к камере или микрофону запрещён. Разрешите его в настройках браузера и нажмите «Повторить».':'Не удалось включить камеру: '+e.message;retake.textContent='Повторить';retake.hidden=false}
 };
 stop.onclick=()=>{if(recorder?.state==='recording'){stopSpeech();recorder.stop();stop.disabled=true;status.textContent='Подготовка видео…'}};
 const file=()=>new File([blob],blob.type.includes('mp4')?'ideafix-idea.mp4':'ideafix-idea.webm',{type:blob.type});
 share.onclick=async()=>{
  if(!blob)return;
  try{
   const f=file();
   if(!navigator.share||!navigator.canShare?.({files:[f]})){status.textContent='Ваш браузер не поддерживает отправку видео. Сохраните файл и прикрепите его в рабочем чате.';return}
   await navigator.share({files:[f],title:'Видеообращение IdeaFIX',text:transcript.value.trim()||'Видеообращение'});
  }catch(e){if(e.name!=='AbortError')status.textContent='Не удалось поделиться видео. Сохраните файл и отправьте вручную.'}
 };
 download.onclick=()=>{if(!blob)return;const a=document.createElement('a');a.href=url;a.download=file().name;a.click();if(transcript.value.trim()){const textBlob=new Blob([transcript.value],{type:'text/plain;charset=utf-8'});const textUrl=URL.createObjectURL(textBlob);const b=document.createElement('a');b.href=textUrl;b.download='ideafix-idea-transcript.txt';b.click();setTimeout(()=>URL.revokeObjectURL(textUrl),2000)}};
 retake.onclick=()=>{video.pause();begin()};
 await begin();
}
function wireNew(){if($('#new'))$('#new').onclick=chooseIdeaMode;if($('#record-idea'))$('#record-idea').onclick=chooseIdeaMode}
const late=t=>!t.first_response&&!['done','reject'].includes(t.status)&&new Date(t.due)<new Date();
function card(t){return `<article class="card"><div class="meta"><span>#${t.id}</span><span class="badge ${t.status}">${status[t.status]}</span>${t.priority==='high'?'<span class="late">! Срочное</span>':''}${t.controlled?'<span class="badge">На контроле</span>':''}</div><h3 data-user-text>${esc(t.title)}</h3><div class="meta">Этап: ${stages[t.stage]||'Регистрация'}</div>${page==='pilots'?`<div class="pilot-summary"><span>Ответственный: <b data-user-text>${esc(t.workflow?.owner||'Не назначен')}</b></span><span>Срок: ${esc(t.workflow?.deadline||'Не указан')}</span><p data-user-text>${esc(t.workflow?.pilot||'План проверки пока не указан')}</p>${t.workflow?.pilotResult?`<p data-user-text>Результат: ${esc(t.workflow.pilotResult)}</p>`:''}</div>`:''}${catalogBadges(t)}<div class="meta">${esc(t.department)} · ${fmt(t.created)}${t.anonymous?' · Анонимно':''}</div><div class="card-actions"><span class="${late(t)?'late':'muted'}" style="font-size:12px">${late(t)?'Срок ответа истёк':(['done','reject'].includes(t.status)?'Результат зафиксирован':'Ответ до '+fmt(t.due))}</span><button data-detail="${t.id}">Открыть →</button></div>${page==='ideas'?`<button data-vote="${t.id}" ${t.voted?'disabled':''}>${t.voted?'✓ Поддержано':'↑ Поддержать'} · ${t.votes}</button>`:''}</article>`}
function wireCards(){document.querySelectorAll('[data-detail]').forEach(b=>b.onclick=()=>openTicket(b.dataset.detail));document.querySelectorAll('[data-vote]').forEach(b=>b.onclick=async()=>{b.disabled=true;try{await api('/tickets/'+b.dataset.vote+'/vote',{});await refresh()}catch(e){toast(e.message);b.disabled=false}})}
function renderList(){const list=items.filter(t=>(page!=='pilots'||t.stage==='pilot')&&(page!=='mine'||t.mine)&&(page!=='ideas'||(t.kind==='idea'&&t.published))&&(!stageFilter||page!=='feed'||({insight:['insight','proposal','registration'],discussion:['discussion','evaluation'],decision:['decision'],pilot:['pilot','implementation'],result:['result']}[stageFilter]||[]).includes(t.stage))&&(!filter||t.status===filter)&&(!term||(t.title+' '+t.body+' '+t.department).toLowerCase().includes(term.toLowerCase()))&&(!period||new Date(t.created)>new Date(Date.now()-period*86400000))).sort((a,b)=>page==='ideas'?b.votes-a.votes:0);const perPage=innerHeight<500?1:innerWidth<650?2:3;listPage=Math.max(0,Math.min(listPage,Math.ceil(list.length/perPage)-1));let pager=$('#list-pager');if(!pager){pager=document.createElement('div');pager.id='list-pager';pager.className='pager';$('#results').after(pager)}pager.innerHTML=list.length>perPage?`<button id="prev-list" ${listPage===0?'disabled':''} aria-label="Предыдущие инсайты">←</button><small>${listPage+1} / ${Math.ceil(list.length/perPage)}</small><button id="next-list" ${listPage>=Math.ceil(list.length/perPage)-1?'disabled':''} aria-label="Следующие инсайты">→</button>`:'';if($('#prev-list'))$('#prev-list').onclick=()=>{listPage--;renderList()};if($('#next-list'))$('#next-list').onclick=()=>{listPage++;renderList()};$('#results').innerHTML=list.length?list.slice(listPage*perPage,(listPage+1)*perPage).map(card).join(''):'<div class="empty">Здесь пока пусто. Первый инсайт может стать началом улучшения.</div>';wireCards()}
async function render(){if(!me||!$('#view'))return;const view=$('#view');view.classList.remove('meetings-screen','ecosystem-screen','organization-screen','chat-screen','planner-screen');if(page==='planner'){await window.IFPlanner.render();return}if(page==='chat'){await window.IFChat.render();return}if(page==='discussions'){await window.IFDiscussions.render();return}if(page==='organization'){await window.IFOrganization.render();return}if(page==='meetings'){await window.IFMeetings.render();return}view.classList.toggle('list-screen',['feed','mine','ideas','pilots'].includes(page));if(['feed','mine','ideas','pilots'].includes(page)){view.innerHTML=(page==='feed'?`<div class="page-head quote-head"><div class="program-slogan">IdeaFIX — от инсайта до результата</div>${window.IFQuotes?.html()||''}</div>${journey()}${dashboard()}`:head(page==='pilots'?'Пилоты':page==='mine'?'Мои инсайты':'Идеи, которые нас объединяют',page==='ideas'?'Поддержите полезное предложение коллег. Одна идея — один голос от сотрудника.':'Понятные сроки, ответственный отдел и история каждого решения.'))+`<div class="filters"><input id="search" aria-label="Поиск" placeholder="Найти инсайт…" value="${esc(term)}"><select id="status-filter" aria-label="Статус"><option value="">Все статусы</option>${options(status,filter)}</select>${page==='ideas'?'<select id="period" aria-label="Период"><option value="0">За всё время</option><option value="1">Идея дня</option><option value="7">Идея недели</option><option value="30">Идея месяца</option></select>':'<button id="today">Сегодня</button>'}</div><div id="results" class="list"></div>`;$('#search').oninput=e=>{term=e.target.value;renderList()};$('#status-filter').onchange=e=>{filter=e.target.value;renderList()};if($('#period')){$('#period').value=period;$('#period').onchange=e=>{period=+e.target.value;renderList()}}if($('#today'))$('#today').onclick=()=>{period=period?0:1;$('#today').textContent=period?'Все дни':'Сегодня';renderList()};renderList();wireNew();wireDashboard();document.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>{if(b.dataset.stage==='discussion'){window.IFDiscussions.open();return}if(b.dataset.stage==='pilot'){page='pilots';stageFilter='';shell();render();return}stageFilter=stageFilter===b.dataset.stage?'':b.dataset.stage;document.querySelectorAll('[data-stage]').forEach(t=>{const active=stageFilter===t.dataset.stage;t.classList.toggle('is-active',active);t.setAttribute('aria-pressed',String(active))});listPage=0;renderList()});return}
if(page==='vendors'||page==='ecosystem'){renderCatalog(page);wireNew();return}
if(page==='pulse'){const total=items.length,answered=items.filter(t=>t.first_response).length,done=items.filter(t=>t.status==='done').length,overdue=items.filter(late).length;const times=items.filter(t=>t.first_response).map(t=>(new Date(t.first_response)-new Date(t.created))/3600000);const avg=times.length?(times.reduce((a,b)=>a+b,0)/times.length).toFixed(1):'—';view.innerHTML=head('Пульс компании','Измеряем реальные изменения, а не количество сообщений.')+`<div class="kpis">${[[total,'Инсайтов'],[total?Math.round(answered/total*100)+'%':'—','Рассмотрено'],[done,'Улучшений реализовано'],[overdue,'Срок ответа истёк']].map(([n,t])=>`<div class="kpi"><strong>${n}</strong><span>${t}</span></div>`).join('')}</div><div class="grid"><section class="panel"><h2>Нагрузка по подразделениям</h2>${deps.map(d=>{const n=items.filter(t=>t.department===d).length;return `<div class="bar"><div><span>${d}</span><b>${n}</b></div><progress max="${Math.max(1,...deps.map(d=>items.filter(t=>t.department===d).length))}" value="${n}"></progress></div>`}).join('')}</section><section class="panel"><h2>Качество обратной связи</h2><p>Первый ответ в среднем: <b>${avg} ч</b></p><p>С результатом: <b>${items.filter(t=>['done','reject'].includes(t.status)&&t.result).length}</b></p><p>На контроле директора: <b>${items.filter(t=>t.controlled).length}</b></p><button id="export">Скачать отчёт CSV</button><p class="hint">Показатели рассчитаны по инсайтам, доступным вашей роли. Сроки первого ответа: 24 / 72 / 168 ч.</p></section></div><h2>Требуют внимания</h2><div class="list">${items.filter(late).slice(0,10).map(card).join('')||'<div class="empty">Просроченных инсайтов нет</div>'}</div>`;$('#export').onclick=exportCSV;wireCards();wireNew();return}
if(page==='settings'){const [users,s]=await Promise.all([api('/users'),api('/settings')]);view.innerHTML=head('Управление','Роли, подразделения и нормативы первого ответа.')+`<section class="panel"><h2>Срок ответа в часах</h2><form id="sla" class="stack"><div class="split">${[['high','Срочный'],['medium','Обычный'],['low','Низкий']].map(([k,t])=>`<label>${t}<input name="${k}" type="number" min="1" max="720" value="${s[k]}" required></label>`).join('')}</div><button type="submit" class="primary">Сохранить нормативы</button></form></section><section class="panel"><h2>Команда</h2><div class="tablewrap"><table><thead><tr><th>Сотрудник</th><th>Роль</th><th>Отдел</th><th></th></tr></thead><tbody>${users.map(u=>`<tr><td>${esc(u.name)}<br><small>${esc(u.login)}</small></td><td><select data-user-role="${u.id}" ${me.role!=='director'?'disabled':''}>${options(role,u.role)}</select></td><td><select data-user-dep="${u.id}" ${me.role!=='director'?'disabled':''}>${depOptions(u.department)}</select></td><td>${me.role==='director'?`<button data-user="${u.id}">Сохранить</button>`:''}</td></tr>`).join('')}</tbody></table></div></section>`;bindForm('#sla',async b=>{await api('/settings',Object.fromEntries(Object.entries(b).map(([k,v])=>[k,+v])),'PUT');toast('Нормативы сохранены')});document.querySelectorAll('[data-user]').forEach(b=>b.onclick=async()=>{try{await api('/users',{id:b.dataset.user,role:document.querySelector(`[data-user-role="${b.dataset.user}"]`).value,department:document.querySelector(`[data-user-dep="${b.dataset.user}"]`).value},'PUT');toast('Права обновлены')}catch(e){toast(e.message)}});window.IFBitrix?.settings(view);window.IFPilot?.settings(view);window.IFChannels?.settings(view);if(me.role==='director'){const b=document.createElement('button');b.textContent='Настроить отрасли вендоров';b.onclick=editVendorIndustries;view.append(b)}wireNew();return}
view.innerHTML=head('IdeaFIX всегда рядом','Одно пространство — на телефоне и компьютере.')+`<div class="grid"><section class="panel"><h2>Мобильное приложение</h2><p>Установите IdeaFIX с помощью браузера. Инсайты синхронизируются с сайтом через общую базу.</p><button id="install-help">Как установить приложение</button><p><button id="install-app" class="primary">Установить IdeaFIX</button></p></section><section class="panel"><h2>Приложение для компьютера</h2><p>В Chrome или Edge откройте меню → «Установить IdeaFIX». Приложение откроется отдельным окном.</p><p class="hint">Рабочее пространство уже открыто на этой странице.</p><p class="hint">Это устанавливаемое веб-приложение. Отдельные APK / EXE в этой версии не выпускаются.</p></section></div>`;$('#install-app').onclick=install;$('#install-help').onclick=()=>modal('Установить IdeaFIX','<p>Android: в меню Chrome выберите «Установить приложение».</p><p>iPhone: Safari → «Поделиться» → «На экран Домой».</p><p>Компьютер: Chrome или Edge → «Установить IdeaFIX».</p>');wireNew();}
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
function newTicket(){modal('Что можно улучшить?',`<form id="create" class="stack">${catalogForm()}<label>Ваше сообщение<textarea name="body" required minlength="10" maxlength="5000" placeholder="Опишите проблему или идею своими словами…"></textarea></label><label>📎 Прикрепить файлы (до 3 файлов, каждый до 2 МБ)<input id="ticket-file-input" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.json,.png,.jpg,.jpeg,.webp,.mp3,.wav,.mp4,.webm"></label><div id="ticket-file-list" class="hint"></div><div id="similar"></div><div class="split"><label>Тип<select name="kind">${options({problem:'Проблема',idea:'Идея',praise:'Благодарность'},'problem')}</select></label><label>Отдел<select name="department"><option value="">Определить по сообщению</option>${depOptions('')}</select></label></div><label>Приоритет<select name="priority">${options({high:'Срочный · 24 часа',medium:'Обычный · 72 часа',low:'Низкий · 7 дней'},'medium')}</select></label><label>Время первого ответа<select name="first_response_minutes"><option value="5">5 минут</option><option value="10">10 минут</option><option value="15">15 минут</option><option value="30">30 минут</option><option value="60">1 час</option><option value="120">2 часа</option><option value="240">4 часа</option><option value="480">8 часов</option><option value="720">12 часов</option><option value="1440" selected>1 день</option><option value="2880">2 дня</option><option value="4320">3 дня</option><option value="7200">5 дней</option><option value="10080">7 дней</option></select><small class="hint">Срок первого содержательного ответа, не окончательного решения</small></label><label class="check"><input name="anonymous" type="checkbox">Отправить анонимно</label><div class="hint">Анонимный инсайт не хранит автора. Сохраните выданный код, чтобы отслеживать ответ. Идеи публикует руководитель после проверки.</div><p class="error" role="alert"></p><button type="submit" class="primary">Отправить предложение</button></form>`);const fileInput=$('#ticket-file-input'),fileList=$('#ticket-file-list');
 fileInput.onchange=()=>{const files=[...fileInput.files];fileList.textContent=files.length?files.map(f=>f.name+' ('+Math.ceil(f.size/1024)+' КБ)').join(' · '):'';if(files.length>3||files.some(f=>f.size>2097152)){toast('Не более 3 файлов, каждый до 2 МБ');fileInput.value='';fileList.textContent=''}};
 bindVendorScope($('#create'));window.IFVoice?.mount($('#create'));window.IFOrganization?.recipient($('#create'));const area=$('#create textarea');area.oninput=()=>{const words=area.value.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(w=>w.length>4);const related=items.filter(t=>t.published&&words.filter(w=>t.body.toLowerCase().includes(w)).length>=2).slice(0,3);$('#similar').innerHTML=related.length?'<div class="hint">Похожие идеи — возможно, достаточно поддержать одну из них:<br>'+related.map(t=>`<button type="button" data-related="${t.id}">#${t.id} ${esc(t.title.slice(0,55))}</button>`).join('')+'</div>':'';document.querySelectorAll('[data-related]').forEach(b=>b.onclick=()=>{const id=b.dataset.related;$('#modal').close();openTicket(id)})};bindForm('#create',async b=>{const files=[...fileInput.files];const t=await api('/tickets',{...b,anonymous:!!b.anonymous});if(files.length){try{await uploadTicketFiles(t.id,files)}catch(e){toast('Заявка сохранена, но вложение не загружено: '+e.message)}}$('#modal').close();await refresh();if(t.code)modal('Сохраните код доступа',`<p>Инсайт <b>#${t.id}</b> принят.</p><p class="pre"><b>${esc(t.code)}</b></p><p>Для отслеживания нужны номер и код. Восстановить код невозможно.</p><button id="copy-code">Скопировать номер и код</button>`);if($('#copy-code'))$('#copy-code').onclick=()=>navigator.clipboard.writeText(`#${t.id} ${t.code}`).then(()=>toast('Код скопирован')).catch(()=>toast('Выделите и скопируйте код вручную'));if(!t.code)await openTicket(t.id);toast('Спасибо за своевременную информацию! '+(t.bitrix_sync?.message||''))})}
function timeline(events){return `<ul class="timeline">${events.map(e=>`<li><small>${fmt(e.created)} · <span data-user-text>${esc(e.actor)}</span>${e.internal?' · Внутренний комментарий':''}</small><p ${e.actor==='Система'?'':'data-user-text'}>${esc(e.text)}</p></li>`).join('')}</ul>`}
async function openTicket(id){try{const t=await api('/tickets/'+id);modal('Инсайт #'+t.id,`<span class="badge ${t.status}">${status[t.status]}</span><h3 data-user-text style="margin-top:16px">${esc(t.title)}</h3><p class="pre" data-user-text>${esc(t.body)}</p>${catalogBadges(t)}${window.IFActions?.html(t)||''}<p class="muted">${esc(t.department)} · Решение до ${fmt(t.due)}</p>${t.first_response_due?`<p class="hint">Первый ответ до ${fmt(t.first_response_due)} · ${t.first_response?'Получен':new Date(t.first_response_due).getTime()<Date.now()?'Просрочен':'Ожидается'}</p>`:''}${t.canManage?'<button id="to-meeting">Вынести на совещание</button>':''}${t.canManage?`<form id="update" class="stack"><label>Статус<select name="status">${options(status,t.status)}</select></label><label>Результат / причина решения<textarea name="result" maxlength="3000">${esc(t.result)}</textarea></label><label class="check"><input type="checkbox" name="controlled" ${t.controlled?'checked':''}>На контроле</label>${t.kind==='idea'&&!t.anonymous?`<label class="check"><input type="checkbox" name="published" ${t.published?'checked':''}>Опубликовать идею в витрине (текст станет доступен сотрудникам)</label>`:''}<button type="submit" class="primary">Сохранить решение</button></form><hr>`:t.result?`<div class="hint"><span>Результат:</span> <span data-user-text>${esc(t.result)}</span></div>`:''}${workflowView(t)}<h3>Прикреплённые файлы</h3><div id="ticket-files">Загрузка…</div><h3>История инсайта</h3>${timeline(t.events)}${t.canComment?`<form id="comment" class="stack"><label>Комментарий<textarea name="text" required minlength="2" maxlength="3000"></textarea></label>${t.canManage?'<label class="check"><input type="checkbox" name="internal">Внутренний — только для руководителей</label>':''}<button type="submit">Добавить комментарий</button></form>`:''}`);organizeTicket();showTicketFiles(t.id);window.IFActions?.bind(t);if($('#to-meeting'))$('#to-meeting').onclick=()=>window.IFMeetings.assign(t);bindWorkflow(t);bindForm('#update',async b=>{await api('/tickets/'+id,{...b,controlled:!!b.controlled,published:!!b.published},'PATCH');$('#modal').close();await refresh();toast('Решение сохранено')});bindForm('#comment',async b=>{await api('/tickets/'+id+'/comment',{...b,internal:!!b.internal});$('#modal').close();await openTicket(id)});}catch(e){toast(e.message)}}
function exportCSV(){const rows=[['Номер','Инсайт','Отдел','Статус','Создано','Результат','Вендор','Отраслевое решение','Техническое решение'].map(x=>window.IFI18n.t(x)),...items.map(t=>[t.id,t.title,window.IFI18n.t(t.department),window.IFI18n.t(status[t.status]),t.created,t.result,cat.vendors.find(x=>x.id===t.vendor_id)?.name||'',window.IFI18n.t(cat.industry.find(x=>x.id===t.industry_id)?.label[0]||''),window.IFI18n.t(cat.technical.find(x=>x.id===t.technical_id)?.label[0]||'')])];const safe=s=>'"'+String(s??'').replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"';const blob=new Blob(['\ufeff'+rows.map(r=>r.map(safe).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='IdeaFIX-report.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
async function install(){if(installPrompt){await installPrompt.prompt();installPrompt=null}else toast('В меню браузера выберите «Установить приложение» или «На главный экран»')}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e});
window.addEventListener('online',()=>me&&refresh());
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
login();
(async()=>{try{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),8000);let response;try{response=await fetch('/api/me',{credentials:'same-origin',signal:controller.signal,cache:'no-store'})}finally{clearTimeout(timer)}if(!response.ok)return;const user=await response.json();if(!user?.id)return;me=user;await refresh(true);notificationRoute()}catch(e){if(!$('#auth')&&!me)login()}})();
setInterval(()=>{if(me&&!document.hidden)refresh()},15000);

function mountainProgress(stage){
 const keys=Object.keys(stages),at=Math.max(0,keys.indexOf(stage));
 const icons=['💡','✍️','🆔','💬','📊','⚖️','🚀','⚙️','🪙'];
 // Positions follow the photographed snow mountain, with Insight and Pilot in the sky.
 const points=[[19,23],[17,84],[36,78],[54,70],[72,63],[83,54],[56,26],[81,46],[88,37]];
 const trail=points.map(([x,y],i)=>(i?'L':'M')+x+' '+y).join(' ');
 const markers=keys.map((k,i)=>{
  const [x,y]=points[i],done=i<at,current=i===at;
  return '<g><circle cx="'+x+'" cy="'+y+'" r="'+(current?3.1:2.4)+'" fill="'+(done?'#20e76d':current?'#ff9d25':'#ccd5e5')+'" stroke="white" stroke-width=".6"'+(done?' filter="url(#glowMilestone)"':'')+'/><title>'+esc(stages[k])+'</title></g>';
 }).join('');
 const labels=keys.map((k,i)=>{
  const [x,y]=points[i],done=i<at,current=i===at;
  const bg=done?'rgba(229,255,236,.96)':current?'rgba(255,239,209,.98)':'rgba(246,249,255,.96)';
  return '<span title="'+esc(stages[k])+'" style="position:absolute;left:'+x+'%;top:'+y+'%;transform:translate('+(i%2===0?'-7%':'-93%')+',-140%);display:inline-flex;align-items:center;gap:3px;padding:3px 5px;border-radius:9px;background:'+bg+';color:#263d60;border:1px solid '+(done?'#22d36d':current?'#ff9824':'#cbd6e6')+';box-shadow:'+(done?'0 0 11px 3px rgba(25,235,92,.58)':current?'0 0 9px 2px rgba(255,154,35,.38)':'0 2px 5px #52657a33')+';font-size:clamp(9px,2.2vw,12px);font-weight:750;line-height:1.15;white-space:nowrap;max-width:48%;z-index:2"><span aria-hidden="true" style="font-size:clamp(14px,3.2vw,19px)">'+icons[i]+'</span>'+esc(stages[k])+'</span>';
 }).join('');
 return '<div aria-label="Девять этапов IdeaFIX с отдельными значками на снежной горе" style="position:relative;width:100%;aspect-ratio:1/1.18;max-height:510px;overflow:hidden;margin:12px 0 16px;border-radius:20px;background:#bad8f9 url(assets/alpine-hero.webp) center center/cover no-repeat"><svg viewBox="0 0 100 110" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%" xmlns="http://www.w3.org/2000/svg"><defs><filter id="glowMilestone" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path d="'+trail+'" fill="none" stroke="#ff7a2d" stroke-width="1.3" stroke-linecap="round" stroke-dasharray="2 1" vector-effect="non-scaling-stroke"/>'+markers+'</svg>'+labels+'</div><p class="hint">🟢 Пройдено: '+at+' из '+keys.length+' · 🟠 Текущий этап: '+esc(stages[keys[at]])+'</p>';
}
function workflowView(t){
 const w=t.workflow||{},keys=Object.keys(stages),at=keys.indexOf(t.stage);
 const fields=[['insight','Что заметили'],['proposal','Что предлагаем изменить'],['benefit','Польза для компании'],['discussion','Итоги обсуждения'],['cost','Затраты и ресурсы'],['effect','Ожидаемый эффект'],['feasibility','Реализуемость и риски'],['reason','Обоснование решения'],['pilot','План пилота'],['pilotResult','Результат пилота'],['owner','Ответственный'],['deadline','Срок внедрения'],['implementation','Что внедрено'],['before','Показатель до'],['after','Показатель после'],['result','Итог и обратная связь автору']];
 let html='<section class="workflow"><h3>От инсайта до результата</h3>'+mountainProgress(t.stage);
 if(t.stage==='discussion')html+='<div class="hint" style="margin:12px 0"><strong>После обсуждения</strong><p>Выберите дальнейшее действие по идее.</p><div style="display:flex;flex-wrap:wrap;gap:8px"><button type="button" id="discussion-to-bitrix" class="primary">Отправить в Битрикс24</button><button type="button" id="discussion-revise">Доработать</button></div><p id="discussion-action-status" role="status"></p></div>';
 html+=window.IFBitrix?.ticket(t)||'';
 if(!t.canManage)return html+fields.filter(([k])=>w[k]).map(([k,label])=>`<p class="pre"><b>${label}:</b> <span data-user-text>${esc(w[k])}</span></p>`).join('')+'</section>';
 return html+`<form id="workflow" class="stack"><label>Текущий этап<select name="stage">${options(stages,t.stage)}</select></label><p class="hint">Этапы проходят по порядку. Можно сохранить текущий этап или вернуться к доработке. Для перехода система проверит необходимые данные.</p>`+fields.map(([k,label])=>`<label>${label}${k==='deadline'?`<input type="date" name="${k}" value="${esc(w[k]||'')}">`:`<textarea name="${k}" maxlength="2000" rows="2">${esc(w[k]||(k==='insight'?t.body:k==='proposal'&&t.kind==='idea'?t.body:''))}</textarea>`}</label>`).join('')+`<label>Решение<select name="decision"><option value="">Ещё не принято</option>${options({approved:'Принять',revise:'Доработать',rejected:'Отклонить'},w.decision)}</select></label><div class="error" role="alert"></div><button type="submit" class="primary">Сохранить этап</button></form></section>`;
}
function bindWorkflow(t){
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
 const groups={insight:['insight'],proposal:['proposal','benefit'],registration:['insight','proposal'],discussion:['discussion'],evaluation:['cost','effect','feasibility'],decision:['decision','reason'],pilot:['pilot','owner','deadline','pilotResult'],implementation:['implementation','owner','deadline'],result:['before','after','result']};
 const show=()=>{for(const label of f.querySelectorAll('label')){const input=label.querySelector('[name]');label.hidden=input&&input.name!=='stage'&&!groups[selector.value].includes(input.name)}};selector.addEventListener('change',show);show();
}
window.addEventListener('resize',()=>{if($('#results'))renderList()});

window.addEventListener('ideafix-language',()=>{if(me&&!$('#modal').open)render()});


function dashboard(){const total=items.length;const inProgress=items.filter(t=>['review','work','clarify'].includes(t.status)).length;const finished=items.filter(t=>t.status==='done').length;const pilots=items.filter(t=>t.stage==='pilot').length;return '<div class="home-stats" aria-label="Статистика идей"><div><b>'+total+'</b><small>Всего идей</small></div><div><b>'+inProgress+'</b><small>В работе</small></div><div><b>'+pilots+'</b><small>В пилоте</small></div><div><b>'+finished+'</b><small>Реализовано</small></div></div><details class="dashboard-meetings"><summary>Ближайшие совещания и форумы</summary><div id="dashboard-upcoming"></div></details><h2 class="home-ideas-title">Мои идеи</h2>'}
function wireDashboard(){document.querySelectorAll('[data-shortcut]').forEach(b=>b.onclick=()=>{page=b.dataset.shortcut;shell();render()});document.querySelectorAll('[data-quick-status]').forEach(b=>b.onclick=()=>{filter=filter===b.dataset.quickStatus?'':b.dataset.quickStatus;$('#status-filter').value=filter;renderList()});window.IFChat?.poll();const upcoming=$('#dashboard-upcoming');if(upcoming)window.IFMeetings?.upcoming(upcoming)}

function notificationRoute(){if(!me)return;if(location.hash==='#chat'&&['director','lead'].includes(me.role)){page='chat';shell();render()}else{const m=location.hash.match(/^#ticket\/(\d+)$/);if(m)openTicket(m[1])}}
window.addEventListener('hashchange',notificationRoute);
