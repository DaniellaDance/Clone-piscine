import {strict as a} from 'node:assert';import {canView,canManage,scopedBoard} from './policy.mjs';
const s={employees:[{id:'e1',department:'A'},{id:'e2',department:'A'},{id:'e3',department:'B'}],tickets:[{id:'t1',department:'A',createdBy:'u1',assigneeId:'e2'},{id:'t2',department:'A',createdBy:'u2',assigneeId:'e2'},{id:'t3',department:'B',createdBy:'u3',assigneeId:'e3'}],comments:[{ticket:'t1'},{ticket:'t2'},{ticket:'t3'}],escalations:[{ticket:'t2',manager:{id:'e1'}},{ticket:'t3',manager:{id:'e3'}}],outbox:[{ticket:'t1'},{ticket:'t2'},{ticket:'t3'}]};
const employee={id:'u1',employee_id:'e1',role:'employee'},manager={id:'m',employee_id:'e1',role:'manager'},director={role:'director'};
a.deepEqual(scopedBoard(employee,s).tickets.map(t=>t.id),['t1']);a.deepEqual(scopedBoard(employee,s).comments,[{ticket:'t1'}]);a.deepEqual(scopedBoard(employee,s).outbox,[{ticket:'t1'}]);
a.deepEqual(scopedBoard(manager,s).tickets.map(t=>t.id),['t1','t2']);a.equal(scopedBoard(director,s).tickets.length,3);
a.equal(canView(employee,s.tickets[1],s),false);a.equal(canManage(employee,s.tickets[0],s),false);a.equal(canManage(manager,s.tickets[1],s),true);a.equal(canManage(manager,s.tickets[2],s),false);a.equal(canManage(director,s.tickets[2],s),true);
a.equal(scopedBoard({id:'u2',employee_id:'e2',role:'employee'},s).tickets.length,2);a.equal(scopedBoard({role:'manager',employee_id:null},s).tickets.length,0);
console.log('PASS: own/assigned requests; department scope; director scope; comments, notifications and mutations');
const {employeeReport}=await import('./policy.mjs');
const person={id:'e2',managerId:'e1'},own={role:'employee',employee_id:'e2'},boss={role:'manager',employee_id:'e1'},otherBoss={role:'manager',employee_id:'e3'};
const assigned=[{assigneeId:'e2',status:'resolved',created:0,due:100,resolvedAt:50},{assigneeId:'e2',status:'work',created:0,due:100}];
a.equal(employeeReport(own,person,assigned,200).total,2);a(!('coefficient' in employeeReport(own,person,assigned,200)));a(!('rating' in employeeReport(otherBoss,person,assigned,200)));
a.equal(employeeReport(boss,person,assigned,200).coefficient,80);a.equal(employeeReport(director,person,assigned,200).total,2);
a.equal(employeeReport(boss,person,[],200).coefficient,null);
console.log('PASS: all assigned requests counted; performance fields only for director and immediate manager; speed/volume formula');
const {bonusReport}=await import('./policy.mjs');
const bs={employees:[person],tickets:assigned,bonusPlans:{e2:{baseCents:100000}}};
a.equal(bonusReport({role:'accountant'},bs)[0].amountCents,80000);
a(!('coefficient' in bonusReport({role:'accountant'},bs)[0]));
a.equal(bonusReport(own,bs).length,0);
a.equal(bonusReport(boss,bs).length,0);
console.log('PASS: bonus uses coefficient, money rounded in kopecks, employee/manager excluded from payroll');


const {analyticsReport}=await import('./policy.mjs');
const report=analyticsReport(manager,s,200);
a.deepEqual(report.departments.map(d=>d.department),['A']);
a.equal(report.summary.total,2);
a.equal(report.employees.some(e=>e.id==='e3'),false);
a.equal(analyticsReport(director,s,200).summary.total,3);
a.equal(analyticsReport(employee,s,200),null);
a.equal(analyticsReport({role:'manager',employee_id:null},s,200).summary.total,0);
console.log('PASS: analytics limited to manager department, director sees all, employees have no analytics');

const chartState={...s,tickets:[{id:'a',department:'A',assigneeId:'e2',status:'new',due:100},{id:'b',department:'A',assigneeId:'e2',status:'work',due:300},{id:'c',department:'A',assigneeId:'e1',status:'resolved',due:100},{id:'d',department:'B',assigneeId:'e3',status:'new',due:100}]};
a.deepEqual(analyticsReport(manager,chartState,200).summary,{total:3,new:1,work:1,resolved:1,overdue:1});
a.deepEqual(analyticsReport(manager,chartState,200).employees.find(e=>e.id==='e2'),{id:'e2',name:undefined,department:'A',total:2,new:1,work:1,resolved:0,overdue:1});
