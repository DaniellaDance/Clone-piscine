import assert from 'node:assert/strict';import {hasAbuse} from './text-policy.mjs';
for(const text of ['Ты идиот','Это дебилы','м у д а к','х.у.й','п1и2з3д','БЛЯТЬ','cука','xуй','Ебаный прибор'])assert.equal(hasAbuse(text),true,text);
for(const text of ['Не работает камера, прошу помочь','Подстрахуй коллегу','Страхование оборудования','Нужна новая втулка','Устройство гудит','Хулиган повредил камеру','Проблема с рубильником'])assert.equal(hasAbuse(text),false,text);
assert.equal(hasAbuse('Нормальный заголовок','Ты идиот'),true);
console.log('PASS: profanity, insults, mixed alphabet and separated letters; neutral technical language accepted');
