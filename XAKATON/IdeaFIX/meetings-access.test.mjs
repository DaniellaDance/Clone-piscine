import {test} from 'node:test';
import assert from 'node:assert/strict';
import {handleMeetings} from './meetings.mjs';
const meeting={id:9,title:'Совет руководителей',department:'',starts_at:'2026-11-20T05:00:00Z'};
const ticket={id:7,title:'Идея',department:'ИТ'};
const manage=(u,t)=>u.role==='director'||u.role==='lead'&&u.department===t.department;
async function add(u,m=meeting){let saved=false;const query=async sql=>{if(sql.includes('SELECT * FROM ideafix.meetings'))return {rows:[m]};if(sql.includes('SELECT * FROM ideafix.tickets'))return {rows:[ticket]};if(sql.startsWith('INSERT INTO ideafix.meeting_agenda')){saved=true;return {rowCount:1,rows:[{ticket_id:7}]}}throw new Error(sql)};let result;await handleMeetings({url:new URL('https://test.invalid/api/meetings/9/agenda'),req:{method:'POST'},u,body:async()=>({ticket_id:7}),query,manage,event:async()=>{},send:r=>result=r,fail:(status,message)=>{throw Object.assign(new Error(message),{status})}});return {saved,result}}
test('director and a department leader can add an accessible idea to a company meeting',async()=>{for(const u of [{id:'d',role:'director',department:'Руководство'},{id:'l',role:'lead',department:'ИТ'}]){const r=await add(u);assert.equal(r.saved,true);assert.equal(r.result.ok,true)}});
test('leaders cannot include inaccessible ideas or access another department meeting',async()=>{await assert.rejects(()=>add({id:'hr',role:'lead',department:'HR'}),{status:403});await assert.rejects(()=>add({id:'it',role:'lead',department:'ИТ'},{...meeting,department:'HR'}),{status:403})});
test('ordinary employees cannot change the meeting agenda',async()=>{await assert.rejects(()=>add({id:'e',role:'employee',department:'ИТ'}),{status:403})});
