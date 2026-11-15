(()=>{
'use strict';
let active=null,topic=null,busy=false,recognizer=null;
const isLeader=()=>me&&['director','admin','lead'].includes(me.role);
const base=id=>'/discussions/topics/'+Number(id);
const heading='<div class="discussion-heading"><h1>Обсуждение идей и проблем</h1><button id="disc-back" type="button">Все обсуждения</button></div>';
const title=t=>'#'+t.ticket_id+' · '+esc(t.title)+' ('+(t.kind==='idea'?'идея':'проблема')+' · '+esc(t.department)+')';
function download(id,format='txt'){const a=document.createElement('a');a.href='/api'+base(id)+'/export'+(format==='word'?'?format=word':'');a.download='IdeaFIX-discussion-'+id+(format==='word'?'.doc':'.txt');document.body.append(a);a.click();a.remove()}
function stopVoice(){if(recognizer){try{recognizer.stop()}catch{}recognizer=null}}
async function open(){if(!isLeader()){modal('Обсуждение','<p>Рабочий чат доступен директору и руководителям отделов.</p>');return}page='discussions';shell();await render()}
async function render(){
 if(!isLeader())return;
 const v=$('#view');if(!v)return;
 v.classList.remove('list-screen');v.classList.add('discussion-screen');
 if(active){await show(active);return}
 v.innerHTML=heading+'<section class="panel"><h2>Выбрать вопрос обсуждения</h2><p class="muted">Тема доступна директору и руководителям, имеющим доступ к записи.</p><div class="discussion-create"><select id="disc-ticket" aria-label="Тема"></select><button id="disc-create" class="primary" type="button">Начать обсуждение</button></div></section><section class="panel"><h2>Обсуждения и сохранённые протоколы</h2><div id="disc-topics">Загрузка…</div></section>';
 $('#disc-back').hidden=true;
 try{
  const [choices,topics]=await Promise.all([api('/discussions/candidates'),api('/discussions/topics')]);
  const select=$('#disc-ticket');if(!select)return;
  select.innerHTML='<option value="">Выбрать вопрос обсуждения</option>'+choices.map(t=>'<option value="'+t.id+'">'+title(t)+'</option>').join('');
  $('#disc-topics').innerHTML=topics.length?topics.map(t=>'<div class="discussion-topic"><span><b>'+title(t)+'</b><small>'+(t.closed_at?'Завершено':'В процессе')+' · '+fmt(t.created)+'</small></span><button type="button" data-disc="'+t.id+'">Открыть</button></div>').join(''):'<p>Обсуждений пока нет.</p>';
  document.querySelectorAll('[data-disc]').forEach(b=>b.onclick=()=>{active=Number(b.dataset.disc);show(active)});
  $('#disc-create').onclick=async()=>{if(!select.value){toast('Выбрать вопрос обсуждения');return}const b=$('#disc-create');b.disabled=true;try{const t=await api('/discussions/topics',{ticket_id:Number(select.value)});active=t.id;await show(active)}catch(e){toast(e.message)}finally{b.disabled=false}};
 }catch(e){const p=$('#disc-topics');if(p)p.textContent=e.message;toast(e.message)}
}
async function show(id){
 stopVoice();
 try{
  const [details,rows]=await Promise.all([api(base(id)),api(base(id)+'/messages')]);
  if(page!=='discussions')return;
  topic=details;const v=$('#view');v.classList.remove('list-screen');v.classList.add('discussion-screen');
  v.innerHTML=heading+'<div class="discussion-subject"><b>'+title(details)+'</b><span>'+(details.closed_at?'Завершено':'В процессе')+'</span></div><div id="disc-messages" role="log" aria-label="Сообщения обсуждения"></div>'+(details.closed_at?'<div class="discussion-actions"><button id="disc-download" class="primary">Скачать TXT</button><button id="disc-download-word" type="button">Скачать Word (.doc)</button><button type="button" id="disc-ai-protocol">✦ ИИ-протокол и поручения</button></div><div id="disc-ai-output"></div>':'<form id="disc-send"><label>Сообщение<textarea name="text" id="disc-text" rows="2" maxlength="3000" placeholder="Обсудите идею или проблему…"></textarea></label><label class="discussion-file-picker">📎 Прикрепить файл (автозагрузка)<input id="disc-file-input" type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.json,.png,.jpg,.jpeg,.webp,.mp3,.wav,.mp4,.webm"></label><div id="disc-selected-files" class="muted"></div><div class="discussion-actions"><button type="button" id="disc-voice">🎙 Надиктовать</button><button type="submit" class="primary">Отправить</button><button type="button" id="disc-close">Завершить и сохранить файл</button><button type="button" id="disc-ai-protocol">✦ ИИ-протокол и поручения</button></div><p class="hint">Протокол включает все отправленные сообщения, в том числе отправленную диктовку.</p><p class="error" role="alert"></p></form><div id="disc-ai-output"></div>');
  $('#disc-back').onclick=()=>{active=null;topic=null;stopVoice();render()};
  paint(rows);
  $('#disc-ai-protocol').onclick=()=>aiProtocol(id);
  if(details.closed_at){$('#disc-download').onclick=()=>download(id);$('#disc-download-word').onclick=()=>download(id,'word');return}
  const fileInput=$('#disc-file-input'),selection=$('#disc-selected-files'),sendButton=$('#disc-send button[type="submit"]'),closeButton=$('#disc-close');
  let uploading=false;
  selection.setAttribute('role','status');selection.setAttribute('aria-live','polite');
  selection.textContent='Выберите до 3 файлов по 2 МБ. После выбора они прикрепляются автоматически.';
  const readBase64=file=>new Promise((resolve,reject)=>{
   const reader=new FileReader();
   reader.onload=()=>{const result=String(reader.result||'');const comma=result.indexOf(',');if(comma<0){reject(new Error('Не удалось прочитать '+file.name));return}resolve(result.slice(comma+1))};
   reader.onerror=()=>reject(new Error('Не удалось прочитать '+file.name));
   reader.readAsDataURL(file);
  });
  fileInput.onchange=async()=>{
   const files=Array.from(fileInput.files||[]);
   fileInput.value='';
   if(!files.length)return;
   if(uploading){selection.textContent='Предыдущая загрузка ещё выполняется. Повторите выбор после её окончания.';return}
   if(files.length>3||files.some(f=>f.size>2097152||f.size===0)){
    const message='Можно выбрать до 3 непустых файлов, каждый не более 2 МБ.';
    selection.textContent=message;toast(message);return;
   }
   const allowed=/\.(pdf|docx?|xlsx?|pptx?|txt|csv|json|png|jpe?g|webp|mp3|wav|mp4|webm)$/i;
   if(files.some(f=>!allowed.test(f.name))){selection.textContent='Формат файла не поддерживается. Допустимы документы, изображения, аудио и видео.';return}
   uploading=true;fileInput.disabled=true;sendButton.disabled=true;closeButton.disabled=true;
   let completed=0;
   try{
    for(const file of files){
     selection.textContent='Прикрепляем '+file.name+' ('+(completed+1)+' из '+files.length+')…';
     const base64=await readBase64(file);
     await api(base(id)+'/files',{filename:file.name,mime:file.type||'application/octet-stream',base64});
     completed++;
     selection.textContent='Прикреплено '+completed+' из '+files.length+'…';
    }
    selection.textContent='✓ '+completed+' файл(ов) прикреплено. Они уже видны в переписке.';
    await refresh();
   }catch(error){
    selection.textContent='Ошибка прикрепления после '+completed+' файл(ов): '+error.message+'. Выберите оставшиеся файлы повторно.';
    toast('Файл не прикрепился: '+error.message);
    await refresh();
   }finally{
    uploading=false;fileInput.disabled=false;sendButton.disabled=false;closeButton.disabled=false;
   }
  };
  bindForm('#disc-send',async form=>{
   if(uploading)throw new Error('Дождитесь завершения прикрепления файла');
   stopVoice();const text=String(form.text||'').trim();
   if(!text)throw new Error('Введите сообщение. Файл прикрепляется автоматически при выборе.');
   await api(base(id)+'/messages',{text});
   const area=$('#disc-text');if(area)area.value='';
   await refresh();
  });
  $('#disc-close').onclick=async()=>{if(!confirm('Завершить обсуждение? Будет сохранён полный протокол всех сообщений.'))return;const b=$('#disc-close');b.disabled=true;try{stopVoice();await api(base(id)+'/close',{});await show(id);download(id);toast('Протокол сохранён и готов к скачиванию')}catch(e){toast(e.message);b.disabled=false}};
  $('#disc-voice').onclick=dictate;
 }catch(e){toast(e.message);active=null;await render()}
}
async function aiProtocol(id){
 const btn=$('#disc-ai-protocol'),out=$('#disc-ai-output');if(!btn||!out)return;btn.disabled=true;out.textContent='ИИ готовит проект протокола…';
 try{const data=await api('/ai/discussion-protocol',{topic_id:Number(id)}),p=data.protocol||{};
 const list=(name,rows)=>'<h3>'+name+'</h3><ul>'+((Array.isArray(rows)?rows:[]).map(x=>'<li>'+esc(typeof x==='string'?x:(x.task||'Поручение')+' — '+(x.owner||'Не назначен')+'; срок: '+(x.deadline||'Не указан'))+'</li>').join('')||'<li>Не указано</li>')+'</ul>';
 const text=['ПРОЕКТ ПРОТОКОЛА',p.summary||'',...(p.decisions||[]).map(x=>'Решение: '+x),...(p.assignments||[]).map(x=>'Поручение: '+x.task+'; ответственный: '+x.owner+'; срок: '+x.deadline),...(p.unresolved||[]).map(x=>'Открытый вопрос: '+x),'Рекомендация: '+(p.recommended_action||'')].join('\n');
 out.innerHTML='<section class="panel" style="background:#edf5ff;color:#193354"><h2>Проект протокола ИИ</h2><p>'+esc(p.summary||'—')+'</p>'+list('Решения',p.decisions)+list('Поручения',p.assignments)+list('Открытые вопросы',p.unresolved)+'<p><b>Следующий шаг:</b> '+esc(p.recommended_action||'—')+'</p><p class="hint">Проверьте содержание. Отправка в Bitrix24 возможна только отдельным действием руководителя.</p><button type="button" id="disc-ai-copy">Скопировать проект протокола</button></section>';
 $('#disc-ai-copy').onclick=()=>navigator.clipboard?.writeText(text).then(()=>toast('Проект скопирован')).catch(()=>toast('Копирование недоступно'));
 }catch(e){out.textContent=e.message}finally{btn.disabled=false}
}
function paint(rows){
 const root=$('#disc-messages');if(!root)return;const bottom=root.scrollHeight-root.scrollTop-root.clientHeight<80;
 root.innerHTML=rows.length?rows.map(m=>'<article class="discussion-message'+(m.author===me.id?' own':'')+'"><small>'+esc(m.name)+' · '+esc(m.department)+' · '+fmt(m.created)+'</small><p data-user-text>'+esc(m.text)+'</p>'+(m.file_id?'<a class="discussion-file-link" data-no-translate href="/api'+base(active)+'/files/'+Number(m.file_id)+'" download>📎 '+esc(m.filename)+' · '+Math.ceil(Number(m.file_size||0)/1024)+' КБ</a>':'')+'</article>').join(''):'<p class="muted">Сообщений пока нет.</p>';
 if(bottom)root.scrollTop=root.scrollHeight;
}
async function refresh(){
 if(!active||page!=='discussions'||busy||document.hidden)return;busy=true;
 try{const [t,rows]=await Promise.all([api(base(active)),api(base(active)+'/messages')]);if(page!=='discussions')return;if(t.closed_at&&!topic?.closed_at){await show(active);return}topic=t;paint(rows)}catch{}finally{busy=false}
}
function dictate(){
 const input=$('#disc-text'),button=$('#disc-voice');if(!input||!button)return;
 if(recognizer){stopVoice();button.textContent='🎙 Надиктовать';return}
 const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!Recognition){toast('В этом браузере нет распознавания речи. Введите сообщение текстом.');return}
 const rec=new Recognition(),prefix=input.value.trim();recognizer=rec;rec.lang='ru-RU';rec.continuous=true;rec.interimResults=true;
 rec.onresult=e=>{let transcript='';for(let i=0;i<e.results.length;i++)transcript+=e.results[i][0].transcript.trim()+' ';input.value=(prefix?prefix+' ':'')+transcript.trim()};
 rec.onend=()=>{recognizer=null;const b=$('#disc-voice');if(b)b.textContent='🎙 Надиктовать'};
 rec.onerror=()=>{stopVoice();const b=$('#disc-voice');if(b)b.textContent='🎙 Надиктовать'};
 try{rec.start();button.textContent='■ Остановить запись'}catch(e){recognizer=null;toast(e.message)}
}
window.IFDiscussions={open,render};
setInterval(refresh,5000);
})();
