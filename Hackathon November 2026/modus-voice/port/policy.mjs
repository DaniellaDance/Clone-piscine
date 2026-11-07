export const isDirector=a=>['director','admin'].includes(a?.role);
export const staffFor=(a,s)=>s.employees.find(e=>e.id===a?.employee_id);
export function canView(a,t,s){
 if(isDirector(a))return true;
 if(a.role==='manager')return !!staffFor(a,s)&&t.department===staffFor(a,s).department;
 if(['employee','accountant'].includes(a.role))return t.createdBy===a.id||!!a.employee_id&&t.assigneeId===a.employee_id;
 return a.role==='client'&&t.createdBy===a.id;
}
export const canManage=(a,t,s)=>isDirector(a)||a.role==='manager'&&canView(a,t,s)||['employee','accountant'].includes(a.role)&&!!a.employee_id&&t.assigneeId===a.employee_id;
export function scopedBoard(a,s){
 const tickets=s.tickets.filter(t=>canView(a,t,s)),ids=new Set(tickets.map(t=>t.id));
 return {tickets,comments:s.comments.filter(c=>ids.has(c.ticket)),
 employees:isDirector(a)?s.employees:a.role==='manager'?s.employees.filter(e=>e.department===staffFor(a,s)?.department):s.employees.filter(e=>e.id===a.employee_id),
 escalations:s.escalations.filter(e=>ids.has(e.ticket)&&(isDirector(a)||e.manager.id===a.employee_id)),
 outbox:s.outbox.filter(e=>ids.has(e.ticket)),routes:{}};
}
export const canSeePerformance=(account,employee)=>isDirector(account)||account.role==='manager'&&employee.managerId===account.employee_id;
export function employeeReport(account,employee,tickets,now=Date.now()){
 const assigned=tickets.filter(t=>t.assigneeId===employee.id);
 const base={...employee,total:assigned.length,canSeePerformance:canSeePerformance(account,employee)};
 if(!base.canSeePerformance)return base;
 const done=assigned.filter(t=>t.status==='resolved'),overdueOpen=assigned.filter(t=>t.status!=='resolved'&&now>t.due);
 const speed=done.length?done.reduce((sum,t)=>sum+Math.min(1,Math.max(1,t.due-t.created)/Math.max(1,(t.resolvedAt||t.updated)-t.created)),0)/done.length:0;
 const completion=assigned.length?done.length/assigned.length:0;
 const coefficient=done.length||overdueOpen.length?Math.round(100*(0.6*speed+0.4*completion)):null;
 const rating=coefficient===null?'Нет данных':coefficient>=95?'Отлично':coefficient>=80?'Хорошо':coefficient>=60?'Удовлетворительно':'Плохо';
 return {...base,coefficient,rating,resolved:done.length,overdue:assigned.filter(t=>t.status==='resolved'?(t.resolvedAt||t.updated)>t.due:now>t.due).length,averageHours:done.length?Math.round(done.reduce((sum,t)=>sum+((t.resolvedAt||t.updated)-t.created)/3600000,0)/done.length*10)/10:null};
}
export const canSeePayroll=account=>isDirector(account)||account.role==='accountant';
export function bonusReport(account,state){
 if(!canSeePayroll(account))return [];
 return state.employees.map(employee=>{const stats=employeeReport({role:'director'},employee,state.tickets);const baseCents=state.bonusPlans?.[employee.id]?.baseCents??null;return {employeeId:employee.id,name:employee.name,department:employee.department,baseCents,amountCents:baseCents===null||stats.coefficient===null?null:Math.round(baseCents*stats.coefficient/100),status:'Предварительный расчёт, не начисление',updated:state.bonusPlans?.[employee.id]?.updated??null};});
}


export function analyticsReport(account,state,now=Date.now()){
 if(!isDirector(account)&&account.role!=='manager')return null;
 const visible=scopedBoard(account,state);
 const summarize=tickets=>({total:tickets.length,new:tickets.filter(t=>t.status==='new').length,work:tickets.filter(t=>t.status==='work').length,resolved:tickets.filter(t=>t.status==='resolved').length,overdue:tickets.filter(t=>t.status!=='resolved'&&t.due<now).length});
 const departments=[...new Set([...visible.employees.map(e=>e.department),...visible.tickets.map(t=>t.department)])].sort();
 return {summary:summarize(visible.tickets),departments:departments.map(department=>({department,...summarize(visible.tickets.filter(t=>t.department===department))})),employees:visible.employees.map(e=>({id:e.id,name:e.name,department:e.department,...summarize(visible.tickets.filter(t=>t.assigneeId===e.id))}))};
}
