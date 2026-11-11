import {test} from 'node:test';
import assert from 'node:assert/strict';
import {formatDiscussionProtocol, handleDiscussions} from './discussions.mjs';

const me={id:'lead-1',role:'lead',name:'Руководитель',department:'ИТ'};
const leaderMessage=(text,n)=>({id:n,author:'lead-1',text,created:'2026-11-11T16:00:00.000Z',name:'Руководитель',department:'ИТ'});
const topic={id:8,ticket_id:114,title:'Пилот электронной проверки',kind:'idea',department:'ИТ',created:'2026-11-11T15:00:00.000Z',closed_at:null};
const makeArgs=(path,method,user,query,pool)=>({
 url:new URL('http://localhost/api'+path),req:{method},u:user,
 body:async()=>({ticket_id:114,text:'Согласовать электронную проверку'}),
 query,pool,res:{writeHead(){},end(){}},
 send:(data,code)=>{makeArgs.last={data,code}},
 fail:(status,message)=>{throw Object.assign(new Error(message),{status})}
});
test('full protocol retains all sent words in chronological order',()=>{
 const txt=formatDiscussionProtocol({...topic,closed_at:'2026-11-11T16:50:00Z'},[
  leaderMessage('Первая важная мысль по пилоту',1),
  {...leaderMessage('Вторая фраза без потери текста',2),name:'Директор',department:'Руководство'}
 ]);
 assert.match(txt,/Первая важная мысль по пилоту/);
 assert.match(txt,/Вторая фраза без потери текста/);
 assert.ok(txt.indexOf('Первая важная')<txt.indexOf('Вторая фраза'));
 assert.match(txt,/Всего сообщений: 2/);
});
test('ordinary employee cannot access leadership discussions',async()=>{
 let accessed=false;
 const args=makeArgs('/discussions/candidates','GET',{...me,role:'employee'},async()=>{accessed=true});
 await assert.rejects(handleDiscussions(args),e=>e.status===403);
 assert.equal(accessed,false);
});
test('only allowed ideas/problems returned to leader',async()=>{
 const args=makeArgs('/discussions/candidates','GET',me,async(sql,params)=>{
  assert.match(sql,/NOT anonymous/);assert.deepEqual(params,[false,'ИТ']);
  return {rows:[{id:114,kind:'idea',title:'Идея'},{id:115,kind:'problem',title:'Проблема'},{id:116,kind:'praise',title:'Благодарность'}]};
 });
 await handleDiscussions(args);
 assert.deepEqual(makeArgs.last.data.map(v=>v.id),[114,115]);
});
test('topic closure stores every message as a persistent downloadable file',async()=>{
 const statements=[];let savedFile=null;
 const query=async(sql,params)=>{
  if(sql.includes('FROM ideafix.discussion_topics d'))return {rows:[topic]};
  throw Error('Unexpected lookup: '+sql);
 };
 const client={
  async query(sql,args){
   statements.push(sql);
   if(sql.includes('FOR UPDATE'))return {rows:[{closed_at:null}]};
   if(sql.includes('FROM ideafix.discussion_messages m'))return {rows:[leaderMessage('Первое сообщение',1),leaderMessage('Второе сообщение',2)]};
   if(sql.includes('UPDATE ideafix.discussion_topics'))return {rows:[{closed_at:'2026-11-11T16:50:00Z'}]};
   if(sql.includes('INSERT INTO ideafix.discussion_exports')){savedFile=args[2];assert.equal(args[3],2);return {rows:[]}};
   return {rows:[]};
  },
  release(){}
 };
 const args=makeArgs('/discussions/topics/8/close','POST',me,query,{connect:async()=>client});
 await handleDiscussions(args);
 assert.equal(makeArgs.last.data.filename,'IdeaFIX-discussion-8.txt');
 assert.ok(Buffer.isBuffer(savedFile));
 assert.match(savedFile.toString('utf8'),/Первое сообщение/);
 assert.match(savedFile.toString('utf8'),/Второе сообщение/);
 assert.ok(statements.indexOf('COMMIT')>statements.findIndex(x=>x.includes('INSERT INTO ideafix.discussion_exports')));
});
