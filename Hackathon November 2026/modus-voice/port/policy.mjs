export const isDirector=a=>['director','admin'].includes(a?.role);
export const staffFor=(a,s)=>s.employees.find(e=>e.id===a?.employee_id);
export function canView(a,t,s){
 if(isDirector(a))return true;
 if(a.role==='manager')return !!staffFor(a,s)&&t.department===staffFor(a,s).department;
 if(a.role==='employee')return t.createdBy===a.id||!!a.employee_id&&t.assigneeId===a.employee_id;
 return a.role==='client'&&t.createdBy===a.id;
}
export const canManage=(a,t,s)=>isDirector(a)||a.role==='manager'&&canView(a,t,s)||a.role==='employee'&&!!a.employee_id&&t.assigneeId===a.employee_id;
export function scopedBoard(a,s){
 const tickets=s.tickets.filter(t=>canView(a,t,s)),ids=new Set(tickets.map(t=>t.id));
 return {tickets,comments:s.comments.filter(c=>ids.has(c.ticket)),
 employees:isDirector(a)?s.employees:a.role==='manager'?s.employees.filter(e=>e.department===staffFor(a,s)?.department):s.employees.filter(e=>e.id===a.employee_id),
 escalations:s.escalations.filter(e=>ids.has(e.ticket)&&(isDirector(a)||e.manager.id===a.employee_id)),
 outbox:s.outbox.filter(e=>ids.has(e.ticket)),routes:{}};
}
