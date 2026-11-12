'use strict';
let pendingInstall=null;
const installButton=document.getElementById('install-application'),installStatus=document.getElementById('install-status');
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{installStatus.textContent='Не удалось подготовить установку. Обновите страницу при стабильном интернете.'});
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();pendingInstall=event;installButton.hidden=false;installStatus.textContent='Приложение готово к установке.'});
installButton.onclick=async()=>{if(!pendingInstall)return;installButton.disabled=true;try{await pendingInstall.prompt();const result=await pendingInstall.userChoice;installStatus.textContent=result.outcome==='accepted'?'Установка подтверждена. Проверьте значок Fix Idea на телефоне.':'Установка отменена.';pendingInstall=null;installButton.hidden=true}catch{installStatus.textContent='Установка сейчас недоступна. Попробуйте меню Chrome → «Установить приложение».'}finally{installButton.disabled=false}};
window.addEventListener('appinstalled',()=>{installButton.hidden=true;installStatus.textContent='Fix Idea установлен.'});
if(window.matchMedia('(display-mode: standalone)').matches)installStatus.textContent='Fix Idea уже открыт как приложение.';
