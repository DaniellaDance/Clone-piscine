window.IFBitrix={
 ticket(t){return t.stage==='proposal'&&t.canSendProposal?`<section class="hint bitrix-proposal"><h3>Отправить руководителю отдела в Битрикс24</h3><p>Выберите руководителя из списка. Задача появится в его разделе «Мои задачи» только после нажатия кнопки отправки.</p><div id="recipient-mode" class="tabs"><button type="button" id="recipient-leaders" class="active">Руководители отделов</button><button type="button" id="recipient-partners">Партнёры</button></div><div id="partner-panel" hidden><form id="partner-send" class="stack"><label>Партнёр<select name="partner_id" required><option value="">Выберите партнёра</option></select></label><button type="submit" class="primary">Подготовить отправку партнёру</button><p id="partner-state" role="status"></p><div class="error" role="alert"></div></form><details><summary>Добавить партнёра</summary><form id="partner-add" class="stack"><label>Компания<input name="company" required maxlength="120"></label><label>Контактное лицо<input name="contact_name" required maxlength="120"></label><label>Email<input type="email" name="contact_email" required maxlength="200"></label><button type="submit">Сохранить партнёра</button><div class="error" role="alert"></div></form></details><p class="hint">Пока почтовый канал не подключён, сообщение только подготавливается, но не доставляется автоматически.</p></div><div id="leader-panel"><form id="bitrix-send" class="stack"><label>Руководитель отдела<select name="recipient_id" required data-user-text><option value="">Выберите руководителя</option></select></label><p id="bitrix-state" role="status">Загружаем список руководителей…</p><button type="submit" class="primary" disabled>Отправить задачу руководителю</button><div class="error" role="alert"></div><div id="bitrix-result"></div></form></div></section>`:''},
 async bindTicket(t){
  const f=document.querySelector('#bitrix-send');if(!f)return;
  const select=f.elements.recipient_id,submit=f.querySelector('[type=submit]'),state=f.querySelector('#bitrix-state');
  select.onchange=()=>{submit.disabled=!select.value};
  const leaderPanel=f.closest('#leader-panel'),partnerPanel=document.querySelector('#partner-panel');
  const leadersBtn=document.querySelector('#recipient-leaders'),partnersBtn=document.querySelector('#recipient-partners');
  const changeMode=partner=>{leaderPanel.hidden=partner;partnerPanel.hidden=!partner;leadersBtn.classList.toggle('active',!partner);partnersBtn.classList.toggle('active',partner)};
  leadersBtn.onclick=()=>changeMode(false);partnersBtn.onclick=()=>changeMode(true);
  const partnerSelect=partnerPanel.querySelector('[name=partner_id]'),partnerState=partnerPanel.querySelector('#partner-state');
  const loadPartners=async()=>{try{const partners=await api('/partners');partnerSelect.innerHTML='<option value="">Выберите партнёра</option>';for(const p of partners){const option=document.createElement('option');option.value=p.id;option.textContent=p.company+' — '+p.contact_name+' ('+p.contact_email+')';partnerSelect.append(option)}partnerState.textContent=partners.length?'Выберите партнёра из списка':'Добавьте первого партнёра'}catch(e){partnerState.textContent=e.message}};
  bindForm('#partner-add',async b=>{await api('/partners',b);await loadPartners();partnerState.textContent='Партнёр добавлен'});
  bindForm('#partner-send',async b=>{const result=await api('/tickets/'+t.id+'/partner-send',b);partnerState.textContent=result.message});
  await loadPartners();

  try{
   let start=0,people=[],pages=0;
   do{
    const data=await api('/bitrix/users?start='+start);
    if(!f.isConnected)return;
    people.push(...data.users);
    start=data.next;pages++;
   }while(start!==null&&pages<20);
   const leaders=people.filter(p=>/руковод|начальник|директор|заведующ|head of|department head|director|chief/i.test(p.position||'')).sort((a,b)=>a.name.localeCompare(b.name,'ru'));
   for(const p of leaders){
    const option=document.createElement('option');option.value=p.id;option.textContent=p.name+(p.position?' — '+p.position:'');select.append(option);
   }
   state.textContent=leaders.length?'Выберите руководителя отдела': 'В Битрикс24 не найдены сотрудники с должностью руководителя. Проверьте заполнение должностей в Битрикс24.';
   if(start!==null)state.textContent+=' Показаны первые '+people.length+' сотрудников; список может быть неполным.';
  }catch(e){if(f.isConnected)state.textContent='Не удалось загрузить руководителей: '+e.message}
  bindForm('#bitrix-send',async b=>{
   const result=await api('/tickets/'+t.id+'/bitrix',{recipient_id:b.recipient_id});
   if(!f.isConnected)return;
   const target=f.querySelector('#bitrix-result');target.replaceChildren();
   const a=document.createElement('a');a.href=result.task_url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Открыть задачу в Битрикс24';target.append(a);
   state.textContent=result.already_sent?'Задача уже была создана':'Задача создана у выбранного руководителя';toast(state.textContent);
  });
 },
 async settings(view){const panel=document.createElement('section');panel.className='panel';panel.innerHTML='<h2>Битрикс24</h2><p>b24-hdamjr.bitrix24.kz</p><p id="bitrix-connection" role="status">Проверяем подключение…</p>';view.querySelector('.page-head').after(panel);
 try{const status=await api('/bitrix/status');if(!panel.isConnected)return;panel.querySelector('#bitrix-connection').textContent=status.configured?'Подключён. Предложения создают задачи выбранным сотрудникам.':'Не подключён. Для отправки задач нужен входящий вебхук.';if(['director','admin'].includes(me.role)){const b=document.createElement('button');b.textContent=status.configured?'Обновить подключение Битрикс24':'Подключить Битрикс24';b.onclick=()=>this.connect();panel.append(b)}}catch(e){panel.querySelector('#bitrix-connection').textContent=e.message}
 },
 connect(){if(!['director','admin'].includes(me?.role)){toast('Подключение настраивает директор или администратор');return}modal('Подключить Битрикс24',`<form id="bitrix-connect" class="stack"><p>В вашем портале создайте входящий вебхук с правами «Задачи» и «Пользователи».</p><p>URL вебхука вводится только здесь. Он хранится на сервере и не показывается сотрудникам.</p><label>URL входящего вебхука<input type="password" name="webhook" required autocomplete="off" spellcheck="false" placeholder="https://b24-hdamjr.bitrix24.kz/rest/…/…/"></label><p><a href="https://apidocs.bitrix24.ru/local-integrations/local-webhooks.html" target="_blank" rel="noopener noreferrer">Как создать входящий вебхук</a></p><button type="submit" class="primary">Проверить и подключить</button><div class="error" role="alert"></div></form>`);bindForm('#bitrix-connect',async(b,f)=>{await api('/bitrix/config',{webhook:b.webhook},'PUT');f.reset();$('#modal').close();await render();toast('Битрикс24 подключён')})}
};

