import {test} from 'node:test';import assert from 'node:assert/strict';
import {mirrorIdea} from './bitrix-events.mjs';
import {syncDayTask} from './planner-bitrix.mjs';
test('saving or scheduling an idea never queues or sends it without a separate action',async()=>{
 for(const kind of ['idea','pilot','discussion'])assert.equal((await mirrorIdea({query:()=>assert.fail('No DB writes'),ticket:{id:1},u:{id:'actor'},kind,call:()=>assert.fail('No Bitrix call')})).status,'manual_required');
});
test('explicit send requires the initiating user to connect their own account',async()=>{
 await assert.rejects(()=>mirrorIdea({explicit:true,query:async(sql,p)=>{assert.match(sql,/bitrix_accounts/);assert.equal(p[0],'actor');return {rows:[]}},ticket:{id:1,recipient:'recipient'},u:{id:'actor'},kind:'idea',call:()=>assert.fail()}),{status:409});
});
test('connecting or retrying planner tasks cannot send old queued idea events',async()=>{
 assert.equal((await syncDayTask(()=>assert.fail(),{id:1,work_task:true,source:'idea-event',sync_status:'queued'},()=>assert.fail())).status,'manual_required');
});
test('explicit send with personal connection creates one task despite repeated clicks',async()=>{
 let state='queued',sends=0;
 const query=async(sql,p)=>{
  if(sql.includes('INSERT INTO ideafix.planner_tasks'))return {rows:[{id:1,owner:p[0],title:p[1],description:p[2],due_at:p[4],source:'idea-event',work_task:true,sync_status:state,bitrix_task:state==='sent'?99:null}]};
  if(sql.includes('SELECT bitrix_user'))return {rows:[{bitrix_user:27}]};
  if(sql.includes('SELECT webhook'))return {rows:[{webhook:'https://b24-hdamjr.bitrix24.kz/rest/27/test/'}]};
  if(sql.includes("SET sync_status='pending'")){state='pending';return {rowCount:1}}
  if(sql.includes("SET sync_status='sent'"))state='sent';
  return {rows:[]};
 };
 const args={explicit:true,query,ticket:{id:3,title:'Идея',body:'Текст'},u:{id:'actor'},kind:'idea',call:async()=>{sends++;return {result:{task:{id:99}}}}};
 assert.equal((await mirrorIdea(args)).status,'sent');await mirrorIdea(args);assert.equal(sends,1);
});
