import {strict as a} from 'node:assert';import {canView,canManage,scopedBoard} from './policy.mjs';
const s={employees:[{id:'e1',department:'A'},{id:'e2',department:'A'},{id:'e3',department:'B'}],tickets:[{id:'t1',department:'A',createdBy:'u1',assigneeId:'e2'},{id:'t2',department:'A',createdBy:'u2',assigneeId:'e2'},{id:'t3',department:'B',createdBy:'u3',assigneeId:'e3'}],comments:[{ticket:'t1'},{ticket:'t2'},{ticket:'t3'}],escalations:[{ticket:'t2',manager:{id:'e1'}},{ticket:'t3',manager:{id:'e3'}}],outbox:[{ticket:'t1'},{ticket:'t2'},{ticket:'t3'}]};
const employee={id:'u1',employee_id:'e1',role:'employee'},manager={id:'m',employee_id:'e1',role:'manager'},director={role:'director'};
a.deepEqual(scopedBoard(employee,s).tickets.map(t=>t.id),['t1']);a.deepEqual(scopedBoard(employee,s).comments,[{ticket:'t1'}]);a.deepEqual(scopedBoard(employee,s).outbox,[{ticket:'t1'}]);
a.deepEqual(scopedBoard(manager,s).tickets.map(t=>t.id),['t1','t2']);a.equal(scopedBoard(director,s).tickets.length,3);
a.equal(canView(employee,s.tickets[1],s),false);a.equal(canManage(employee,s.tickets[0],s),false);a.equal(canManage(manager,s.tickets[1],s),true);a.equal(canManage(manager,s.tickets[2],s),false);a.equal(canManage(director,s.tickets[2],s),true);
a.equal(scopedBoard({id:'u2',employee_id:'e2',role:'employee'},s).tickets.length,2);a.equal(scopedBoard({role:'manager',employee_id:null},s).tickets.length,0);
console.log('PASS: own/assigned requests; department scope; director scope; comments, notifications and mutations');
