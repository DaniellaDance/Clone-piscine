import {test} from 'node:test';
import assert from 'node:assert/strict';
import {canSeeTicket,canManageRecord,canMessageRecipient,canReadMeetingResult} from './access.mjs';
import {handleChat} from './chat.mjs';
import {handleMediaMessages} from './media-messages.mjs';
import {handleIdeaPrivacy} from './idea-privacy.mjs';
import {handleDemoFinances} from './demo-finances.mjs';
const employee={id:'e',role:'employee',department:'ИТ'},lead={id:'l',role:'lead',department:'ИТ'},director={id:'d',role:'director',department:'Руководство'},other={id:'x',role:'employee',department:'Продажи'},otherLead={id:'ol',role:'lead',department:'Продажи'};
const fail=(status,message)=>{throw Object.assign(new Error(message),{status})};
test('a published idea, own authorship and direct recipient never bypass department boundary',()=>{
 const t={id:1,department:'Продажи',kind:'idea',published:true,author:'e',recipient:'l'};
 for(const u of [employee,lead]){assert.equal(canSeeTicket(u,t),false);assert.equal(canManageRecord(u,t),false)}
 assert.equal(canSeeTicket(director,t),true);assert.equal(canSeeTicket(other,t),true);
});
test('employees see ideas and projects in own department but cannot manage them or see meeting results',()=>{
 assert.equal(canSeeTicket(employee,{department:'ИТ',kind:'idea'}),true);
 assert.equal(canSeeTicket(employee,{department:'ИТ',kind:'problem',stage:'pilot'}),true);
 assert.equal(canSeeTicket(employee,{department:'ИТ',kind:'problem'}),false);
 assert.equal(canManageRecord(employee,{department:'ИТ',kind:'idea'}),false);
 assert.equal(canReadMeetingResult(employee,{owner:'e',meeting_id:1,meeting_department:'ИТ'}),false);
});
test('leader can read director meeting for own department, but cannot access another department even as owner',()=>{
 assert.equal(canReadMeetingResult(lead,{owner:'d',meeting_id:1,meeting_department:'ИТ'}),true);
 assert.equal(canReadMeetingResult(lead,{owner:'l',meeting_id:1,meeting_department:'Продажи'}),false);
});
test('messaging hierarchy is enforced independently of recipient IDs supplied by client',()=>{
 const peer={...employee,id:'peer'};
 assert.equal(canMessageRecipient(employee,lead),true);assert.equal(canMessageRecipient(employee,peer),true);
 for(const r of [director,other,otherLead])assert.equal(canMessageRecipient(employee,r),false);
 assert.equal(canMessageRecipient(lead,employee),true);assert.equal(canMessageRecipient(lead,director),true);
 for(const r of [other,otherLead])assert.equal(canMessageRecipient(lead,r),false);
 for(const r of [employee,lead,other,otherLead])assert.equal(canMessageRecipient(director,r),true);
});
test('director explicitly chooses own idea audience, including a company-wide exception',()=>{
 const t={kind:'idea',author:'d',department:'Руководство',published:true,idea_audience:'private'};
 assert.equal(canSeeTicket(director,t),true);assert.equal(canSeeTicket(lead,t),false);assert.equal(canSeeTicket(employee,t),false);
 assert.equal(canSeeTicket(lead,{...t,idea_audience:'leaders'}),true);assert.equal(canSeeTicket(employee,{...t,idea_audience:'leaders'}),false);
 assert.equal(canSeeTicket(other,{...t,idea_audience:'all'}),true);assert.equal(canManageRecord(lead,{...t,department:'ИТ',idea_audience:'leaders'}),false);
});
test('employee chat and forbidden media send are rejected before any write',async()=>{
 await assert.rejects(handleChat({url:new URL('http://x/api/leadership-chat'),u:employee,req:{method:'GET'},fail}),{status:403});
 let wrote=false;await assert.rejects(handleMediaMessages({url:new URL('http://x/api/media-messages'),req:{method:'POST'},u:employee,body:async()=>({recipient_id:'d',media_type:'audio',transcript:'Текст'}),query:async sql=>{if(sql.includes('SELECT id,role,department'))return {rowCount:1,rows:[director]};wrote=true;return {rows:[]}},fail}),{status:403});assert.equal(wrote,false);
});
test('allowed media requests terminate routing after their response',async()=>{
 let sent;
 const handled=await handleMediaMessages({url:new URL('http://x/api/media-messages'),req:{method:'GET'},u:employee,query:async()=>({rows:[]}),send:r=>{sent=r},fail});
 assert.equal(handled,true);assert.deepEqual(sent,[]);
});
test('leader chat is scoped to own department even when URL names another one',async()=>{
 let params;await handleChat({url:new URL('http://x/api/leadership-chat?department=Продажи'),req:{method:'GET'},u:lead,query:async(sql,p)=>{params=p;return {rows:[]}},send(){},fail});assert.deepEqual(params,[0,false,'ИТ']);
 await assert.rejects(handleChat({url:new URL('http://x/api/leadership-chat'),req:{method:'POST'},u:lead,body:async()=>({text:'Сообщение',department:'Продажи'}),fail}),{status:403});
});
test('privacy preference updates only the director own ideas in one atomic statement',async()=>{
 let sql,params;await handleIdeaPrivacy({url:new URL('http://x/api/profile/idea-visibility'),req:{method:'PUT'},u:director,body:async()=>({audience:'leaders'}),query:async(s,p)=>{sql=s;params=p;return {rows:[]}},send(){},fail});assert.match(sql,/WHERE author IN \(SELECT id FROM preference\)/);assert.deepEqual(params,['leaders','d']);
 await assert.rejects(handleIdeaPrivacy({url:new URL('http://x/api/profile/idea-visibility'),req:{method:'PUT'},u:lead,fail}),{status:403});
});
test('demo financial records are labelled and require director access',async()=>{
 let result;await handleDemoFinances({url:new URL('http://x/api/project-finances/demo'),req:{method:'GET'},u:director,query:async sql=>{assert.match(sql,/demo_project_finances/);return {rows:[{key:'demo-project-1',income:'100',expense:'40'}]}},send:r=>result=r,fail});assert.equal(result[0].is_demo,true);assert.equal(result[0].currency,'KZT');
 await assert.rejects(handleDemoFinances({url:new URL('http://x/api/project-finances/demo'),req:{method:'GET'},u:employee,fail}),{status:403});
});
