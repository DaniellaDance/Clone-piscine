import {test} from 'node:test';import assert from 'node:assert/strict';
import {localNewsBrief,localIdeaAnalysis,localProtocol,handleAI} from './ai-assistant.mjs';
test('free rule-based analysis works without any API key',()=>{
 const brief=localNewsBrief({topic:'Hochiki',kind:'vendors',source_text:'Вендор представил новую линейку датчиков. Устройства позволяют ускорить монтаж и снизить число ложных срабатываний. Риск: поставки зависят от сроков производителя.',source_url:'https://example.com/news',pilots:[{id:7,title:'Пилот электронной проверки'}]});
 assert.ok(brief.summary.length>20);assert.ok(Array.isArray(brief.opportunities));assert.ok(brief.verification_needed.length>=2);
 const idea=localIdeaAnalysis({title:'Единая форма',description:'Предлагаю единую форму, это сократит повторный ввод.',department:'ИТ',stage:'registration',workflow:JSON.stringify({effect:''})});
 assert.ok(idea.summary.includes('Единая форма'));assert.ok(idea.missing_data.includes('Не описан измеримый эффект'));
 const protocol=localProtocol({topic:'Идеи',messages:[{text:'Решили проверить на одном участке.'},{text:'Нужно уточнить сроки?'}]});
 assert.equal(protocol.decisions.length,1);assert.equal(protocol.unresolved.length,1);
});
test('idea analysis is available free to leaders without configured providers',async()=>{
 const saved={freebuff:process.env.OPENAI_API_KEY,gemini:process.env.GEMINI_API_KEY,pref:process.env.AI_PROVIDER};
 delete process.env.OPENAI_API_KEY;delete process.env.GEMINI_API_KEY;delete process.env.AI_PROVIDER;
 let response=null,failed=null;
 const query=async()=>({rows:[{id:1,title:'Идея',body:'Предлагаю ускорить согласование, это снизит простой.',department:'ИТ',stage:'registration',workflow:'{}',published:true}]});
 try{
  await handleAI({url:new URL('https://test/api/ai/idea-analysis'),req:{method:'POST'},u:{id:'u1',role:'director'},body:async()=>({ticket_id:1}),query,send:r=>response=r,fail:(code,message)=>failed={code,message}});
  assert.equal(failed,null);assert.equal(response.provider,'rules');assert.equal(response.free_mode,true);assert.equal(response.ai_generated,false);assert.ok(response.analysis.summary.length>0);
 }finally{
  if(saved.freebuff!==undefined)process.env.OPENAI_API_KEY=saved.freebuff;
  if(saved.gemini!==undefined)process.env.GEMINI_API_KEY=saved.gemini;
  if(saved.pref!==undefined)process.env.AI_PROVIDER=saved.pref;
 }
});
