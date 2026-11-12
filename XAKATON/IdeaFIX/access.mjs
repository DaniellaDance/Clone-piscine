import {privateInsight,ownerOf} from './ticket-access.mjs';
export const isTop=u=>!!u&&['director','admin'].includes(u.role);
export const isLeader=u=>!!u&&['director','admin','lead'].includes(u.role);
export const sameDepartment=(u,r)=>!!u&&!!u.department&&u.department===r.department;
export const canManageRecord=(u,r)=>canSeeTicket(u,r)&&(isTop(u)||(u?.role==='lead'&&sameDepartment(u,r)&&(r.author===u.id||!r.idea_audience||r.idea_audience==='department')));
export function canSeeTicket(u,t){
 if(privateInsight(t))return ownerOf(u,t);if(t.workflow?.visibility==='leaders')return ownerOf(u,t)||isTop(u)||(u?.role==='lead'&&sameDepartment(u,t));
 if(t.workflow?.visibility==='department'&&!ownerOf(u,t))return isTop(u)||sameDepartment(u,t);
 if(t.workflow?.visibility==='leaders'&&ownerOf(u,t))return true;
 if(t.kind==='idea'&&!t.anonymous&&t.idea_audience&&t.idea_audience!=='department'){
  if(t.author===u?.id)return true;
  return t.idea_audience==='all'?!!u:t.idea_audience==='leaders'?isLeader(u):false;
 }
 if(isTop(u))return true;if(!sameDepartment(u,t))return false;
 return u.role==='lead'||t.recipient===u.id||(!t.anonymous&&t.author===u.id)||(!t.anonymous&&(t.published||t.kind==='idea'||['pilot','implementation','result'].includes(t.stage)));
}
export function ticketVisibilitySql(alias,{viewer,top,department,lead}){
 const a=alias?alias+'.':'';
 const ordinary=`(${top} OR (${a}department=${department} AND (${lead} OR ${a}recipient=${viewer} OR (NOT ${a}anonymous AND ${a}author=${viewer}) OR (NOT ${a}anonymous AND (${a}published OR ${a}kind='idea' OR ${a}stage IN ('pilot','implementation','result'))))))`;
 const gate=`(${a}author=${viewer} OR (coalesce(${a}workflow->>'visibility','')<>'private' AND NOT (coalesce(${a}workflow->>'visibility','')='' AND NOT ${a}anonymous AND (${a}stage='insight' OR (${a}entry_type='insight' AND ${a}stage='registration'))) AND (coalesce(${a}workflow->>'visibility','')<>'leaders' OR ${top} OR (${lead} AND ${a}department=${department}))))`;
 return `(${gate} AND (CASE WHEN ${a}kind='idea' AND NOT ${a}anonymous AND ${a}idea_audience<>'department' THEN (${a}author=${viewer} OR ${a}idea_audience='all' OR (${a}idea_audience='leaders' AND (${top} OR ${lead}))) ELSE ${ordinary} END))`;
}
export function canReadMeetingResult(u,r){
 if(!isLeader(u))return false;if(isTop(u))return true;
 return r.meeting_id?r.meeting_department===u.department:r.owner===u.id;
}
export const departments=['ИТ','Закупки','Продажи','Склад','Логистика','HR','Руководство'];
export function canMessageRecipient(sender,recipient){
 if(!sender||!recipient)return false;if(isTop(sender))return true;
 if(sender.role==='employee')return sameDepartment(sender,recipient)&&['lead','employee'].includes(recipient.role);
 if(sender.role==='lead')return isTop(recipient)||(sameDepartment(sender,recipient)&&recipient.role==='employee');
 return false;
}

