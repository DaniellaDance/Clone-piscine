import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
test('nearest meeting remains visible while homepage refresh waits for the network',async()=>{
 const source=readFileSync(new URL('./public/assets/meetings.js',import.meta.url),'utf8');
 let respond;
 const context={window:{},Intl,Date,me:{id:'one',role:'employee'},esc:x=>String(x),api:async()=>[
  {id:2,title:'Позже',starts_at:new Date(Date.now()+86400000*2).toISOString()},
  {id:1,title:'Ближайшая',starts_at:new Date(Date.now()+86400000).toISOString()},
 ]};
 vm.runInNewContext(source,context);
 const root=()=>({isConnected:true,innerHTML:'',querySelectorAll:()=>[]});
 const first=root();await context.window.IFMeetings.upcoming(first);
 assert.match(first.innerHTML,/Ближайшая/);assert.doesNotMatch(first.innerHTML,/Позже/);
 context.api=()=>new Promise(resolve=>{respond=resolve});
 const next=root(),pending=context.window.IFMeetings.upcoming(next);
 assert.equal(next.innerHTML,first.innerHTML);
 respond([]);await pending;assert.match(next.innerHTML,/пока не запланированы/);
 context.me={id:'another',role:'employee'};context.api=async()=>{throw Error('offline')};
 const other=root();await context.window.IFMeetings.upcoming(other);
 assert.doesNotMatch(other.innerHTML,/Ближайшая/);
});
