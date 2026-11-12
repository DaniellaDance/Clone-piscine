(()=>{
 const dictionaries=window.IFTranslations||{},cache=new WeakMap();let lang;try{lang=localStorage.getItem('ideafix-language')||'ru'}catch{lang='ru'}if(!['ru','en','kk'].includes(lang))lang='ru';
 const word=c=>!!c&&/[\p{L}\p{N}]/u.test(c),keys=Object.keys(dictionaries).sort((a,b)=>b.length-a.length);
 function t(source){if(lang==='ru')return source;const col=lang==='en'?0:1;const trim=source.trim();if(dictionaries[trim])return source.replace(trim,dictionaries[trim][col]);let out=source;for(const key of keys){if(!out.includes(key))continue;let pos=0;while((pos=out.indexOf(key,pos))!==-1){if((word(key[0])&&word(out[pos-1]))||(word(key.at(-1))&&word(out[pos+key.length]))){pos+=key.length;continue}const next=dictionaries[key][col];out=out.slice(0,pos)+next+out.slice(pos+key.length);pos+=next.length}}return out}
 function translateNode(n){if(n.nodeType===Node.TEXT_NODE){if(!n.parentElement||n.parentElement.closest('[data-user-text],script,style,textarea,input,#language'))return;const prev=cache.get(n),current=n.nodeValue;const source=prev&&current===prev.translated?prev.source:current;const translated=t(source);cache.set(n,{source,translated});if(current!==translated)n.nodeValue=translated;return}if(n.nodeType!==Node.ELEMENT_NODE)return;if(n.closest('[data-user-text],script,style,textarea,input,#language')){if(n.matches('input')&&!n.hasAttribute('data-user-text'))translateAttrs(n);return}translateAttrs(n);for(const child of [...n.childNodes])translateNode(child)}
 function translateAttrs(el){for(const key of ['placeholder','aria-label','title']){if(!el.hasAttribute(key))continue;const id='data-original-'+key;const original=el.getAttribute(id)||el.getAttribute(key);el.setAttribute(id,original);const val=t(original);if(el.getAttribute(key)!==val)el.setAttribute(key,val)}}
 let scheduled=false;function update(){scheduled=false;document.documentElement.lang=lang;document.title=lang==='en'?'FixIdea':lang==='kk'?'FixIdea':'FixIdea';ensureSwitch();translateNode(document.body)}
 function ensureSwitch(){
  let bar=document.getElementById('language');
  if(!bar){
   bar=document.createElement('details');bar.id='language';bar.className='language-picker';
   const summary=document.createElement('summary');summary.setAttribute('aria-label','Выбрать язык / Choose language / Тілді таңдау');summary.innerHTML='<span aria-hidden="true">◎</span> <span data-language-current></span> <span aria-hidden="true">▾</span>';bar.append(summary);
   const menu=document.createElement('div');menu.className='language-menu';menu.setAttribute('role','menu');menu.setAttribute('aria-label','Language / Тіл / Язык');
   for(const [id,label]of [['ru','RU · Русский'],['en','EN · English'],['kk','KZ · Қазақша']]){const button=document.createElement('button');button.type='button';button.textContent=label;button.dataset.lang=id;button.setAttribute('role','menuitemradio');button.onclick=()=>{bar.open=false;setLanguage(id)};menu.append(button)}bar.append(menu);
   bar.addEventListener('keydown',event=>{if(event.key==='Escape'){bar.open=false;summary.focus()}});

  }
  const parent=document.querySelector('.header')||document.body;if(bar.parentNode!==parent)parent.append(bar);
  const current=bar.querySelector('[data-language-current]'),label={ru:'RU',en:'EN',kk:'KZ'}[lang];if(current.textContent!==label)current.textContent=label;
  for(const button of bar.querySelectorAll('button[data-lang]')){button.classList.toggle('active',button.dataset.lang===lang);button.setAttribute('aria-checked',String(button.dataset.lang===lang))}
 }
 function setLanguage(next){lang=next;try{localStorage.setItem('ideafix-language',lang)}catch{}update();window.dispatchEvent(new CustomEvent('ideafix-language',{detail:lang}))}
 function schedule(){if(!scheduled){scheduled=true;queueMicrotask(update)}}
 document.addEventListener('click',event=>{const bar=document.getElementById('language');if(bar&&!bar.contains(event.target))bar.open=false});
 window.IFI18n={get lang(){return lang},t,setLanguage,update};
 const observer=new MutationObserver(records=>{if(records.some(r=>r.type==='childList'||r.type==='characterData'))schedule()});observer.observe(document.body,{childList:true,subtree:true,characterData:true});update();
})();

