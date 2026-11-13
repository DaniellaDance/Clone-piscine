import {test} from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import vm from 'node:vm';
test('dynamic content changes RU → EN → KK → RU, preserving the source and avoiding extra RU requests',async()=>{
 const original='Пилот склада',text={nodeType:3,nodeValue:original},header={},current={textContent:'RU'},created=new Map();
 const element={nodeType:1,childNodes:[text],closest:s=>s==='[data-user-text]'?element:null,hasAttribute:()=>false,matches:()=>false};text.parentElement=element;
 const body={nodeType:1,childNodes:[element],closest:()=>null,hasAttribute:()=>false,append:el=>created.set(el.id,el)};
 const bar={parentNode:header,querySelector:()=>current,querySelectorAll:()=>[]};
 const document={body,documentElement:{lang:'ru'},querySelector:s=>s==='.header'?header:null,getElementById:id=>id==='language'?bar:created.get(id),addEventListener(){},createTextNode:s=>({textContent:s}),createElement:()=>({dataset:{},setAttribute(){},replaceChildren(){},append(){},remove(){created.delete(this.id)}})};
 let calls=0;const window={IFTranslations:{},dispatchEvent(){}};
 const context={window,document,Node:{TEXT_NODE:3,ELEMENT_NODE:1},localStorage:{getItem:()=>null,setItem(){}},MutationObserver:class{observe(){}},queueMicrotask,AbortSignal,CustomEvent:class{},fetch:async(url,options)=>{calls++;const b=JSON.parse(options.body);return {ok:true,json:async()=>({translations:b.texts.map(()=>b.language==='en'?'Warehouse pilot':'Қойма пилоты')})}}};
 vm.runInNewContext(await readFile(new URL('./public/assets/i18n.js',import.meta.url),'utf8'),context);
 assert.equal(text.nodeValue,original);window.IFI18n.setLanguage('en');await new Promise(r=>setTimeout(r,15));assert.equal(text.nodeValue,'Warehouse pilot');window.IFI18n.setLanguage('kk');await new Promise(r=>setTimeout(r,15));assert.equal(text.nodeValue,'Қойма пилоты');const count=calls;window.IFI18n.setLanguage('ru');assert.equal(text.nodeValue,original);assert.equal(calls,count);
});
