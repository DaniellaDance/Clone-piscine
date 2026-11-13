import {test} from 'node:test';import assert from 'node:assert/strict';
import {validateTranslation,translateTexts,handleTranslation} from './translation.mjs';
test('content translation input is bounded and target is limited to English/Kazakh',()=>{
 assert.deepEqual(validateTranslation({language:'kk',texts:[' Идея ']}),{language:'kk',texts:['Идея']});
 for(const input of [{language:'de',texts:['hello']},{language:'en',texts:[]},{language:'en',texts:['x'.repeat(6001)]},{language:'kk',texts:[42]}])assert.throws(()=>validateTranslation(input),e=>e.status===400);
});
test('Gemini receives translation data and exact output alignment is enforced',async()=>{
 let request;const output=await translateTexts(['Учет склада','Пилот 42'],'en',{env:{GEMINI_API_KEY:'fake'},fetcher:async(url,options)=>{request=JSON.parse(options.body);return {ok:true,json:async()=>({candidates:[{content:{parts:[{text:JSON.stringify({translations:['Warehouse accounting','Pilot 42']})}]}}]})}}});
 assert.deepEqual(output,['Warehouse accounting','Pilot 42']);assert.match(request.systemInstruction.parts[0].text,/DATA/);assert.match(request.contents[0].parts[0].text,/Пилот ZXQFIXAAQXZ/);
});
test('missing or malformed provider never pretends the original is a translation',async()=>{
 await assert.rejects(translateTexts(['Склад'],'kk',{env:{}}),e=>e.status===503);
 await assert.rejects(translateTexts(['Склад'],'en',{env:{GEMINI_API_KEY:'fake'},fetcher:async()=>({ok:true,json:async()=>({candidates:[{content:{parts:[{text:'{"translations":[]}'}]}}]})})}),e=>e.status===503);
});
test('translation cache is user-scoped and keeps original ticket data untouched',async()=>{
 const calls=[];let sent;
 const query=async(sql,p)=>{calls.push({sql,p});if(sql.startsWith('SELECT'))return {rows:[]};return {rows:[{n:1}],rowCount:1}};
 const handled=await handleTranslation({url:new URL('https://test/api/translate'),req:{method:'POST'},u:{id:'u1'},body:async()=>({language:'kk',texts:['Название пилота','Название пилота']}),query,send:x=>sent=x,fail:()=>{throw Error('unexpected')},translator:async texts=>{assert.equal(texts.length,1);return ['Пилот атауы']}});
 assert.equal(handled,true);assert.deepEqual(sent.translations,['Пилот атауы','Пилот атауы']);assert.equal(calls[0].p[0],'u1');assert(!calls.some(c=>/UPDATE ideafix.tickets/.test(c.sql)));
});

test('dates and budgets survive provider translation verbatim',async()=>{
 const output=await translateTexts(['Срок 26.11.2026, бюджет 150000 KZT'],'en',{env:{GEMINI_API_KEY:'fake'},fetcher:async(url,options)=>{
  const input=JSON.parse(JSON.parse(options.body).contents[0].parts[0].text).texts[0];
  return {ok:true,json:async()=>({candidates:[{content:{parts:[{text:JSON.stringify({translations:[input.replace('Срок','Deadline').replace('бюджет','budget')]})}]}}]})};
 }});
 assert.deepEqual(output,['Deadline 26.11.2026, budget 150000 KZT']);
});
