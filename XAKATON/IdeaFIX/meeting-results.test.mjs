import {test} from 'node:test';
import assert from 'node:assert/strict';
import {matchMeeting,meetingIdeas,resultFile,handleMeetingResults} from './meeting-results.mjs';
const r={title:'Совещание отдела',scheduled_start:'2026-11-13T10:00:00Z',meeting_url:'https://meet.google.com/abc'};
const m={id:1,title:r.title,starts_at:r.scheduled_start,location:r.meeting_url};
test('matching requires unique time+URL or time+title; no approximate unrelated matching',()=>{
 assert.equal(matchMeeting(r,[m]),1);assert.equal(matchMeeting(r,[m,{...m,id:2}]),null);
 assert.equal(matchMeeting({...r,meeting_url:''},[{...m,title:'  СОВЕЩАНИЕ  отдела '}]),1);
 assert.equal(matchMeeting(r,[{...m,starts_at:'2026-11-14T10:00:00Z'}]),null);
 assert.equal(matchMeeting({...r,scheduled_start:null},[m]),null);
 assert.equal(matchMeeting({...r,title:'Другая',meeting_url:''},[m]),null);
});
test('ideas are quoted passages with source; absent ideas are not invented',()=>{
 const data={summary:'## Идеи и предложения\n- Запустить пилот\n## Бюджет\n1000',transcript:[]};
 assert.deepEqual(meetingIdeas(data),[{text:'Запустить пилот',source:'Итоги Fathom'}]);
 assert.deepEqual(meetingIdeas({summary:'Обсудили продажи',transcript:[]}),[]);
 assert.match(resultFile({summary:'',transcript:[{timestamp:'00:01',speaker:'Анна',text:'Предлагаю пилот.'}]},'ideas'),/Анна/);
});
const fail=(status,message)=>{throw Object.assign(new Error(message),{status})};
test('unrelated departments cannot download meeting files',async()=>{
 await assert.rejects(handleMeetingResults({url:new URL('http://x/api/meeting-results/1/transcript'),req:{method:'GET'},u:{id:'lead-sales',role:'lead',department:'Продажи'},query:async()=>({rows:[{owner:'director',meeting_id:3,meeting_department:'ИТ'}]}),fail}),{status:404});
});
test('authorized download is generated entirely from persisted text without fetching media',async()=>{
 let content,headers;await handleMeetingResults({url:new URL('http://x/api/meeting-results/1/transcript'),req:{method:'GET'},res:{writeHead(s,h){headers=h},end(s){content=s}},u:{id:'d',role:'director'},query:async()=>({rows:[{id:1,owner:'d',title:'Meeting',transcript:[{timestamp:'00:01',speaker:'Анна',text:'Полный текст.'}]}]}),fail});
 assert.match(content,/Полный текст/);assert.match(headers['Content-Disposition'],/attachment/);
});
