import {test} from 'node:test';
import assert from 'node:assert/strict';
import {canSeeTicket,canManageRecord as canManageTicket} from './access.mjs';
import {privateInsight} from './ticket-access.mjs';
const t={author:'a',department:'ИТ',stage:'insight',entry_type:'insight',workflow:{visibility:'private'},published:true,recipient:'b'};
test('personal insight is visible only to its author, including direct access and management',()=>{for(const role of ['employee','lead','director','admin']){const u={id:'b',role,department:'ИТ'};assert.equal(canSeeTicket(u,t),false);assert.equal(canManageTicket(u,t),false)}assert.equal(canSeeTicket({id:'a',role:'employee'},t),true)});
test('leaders-only ideas stay hidden from ordinary recipients and published feeds',()=>{const idea={...t,stage:'proposal',workflow:{visibility:'leaders'}};assert.equal(canSeeTicket({id:'b',role:'employee',department:'ИТ'},idea),false);assert.equal(canSeeTicket({id:'c',role:'lead',department:'ИТ'},idea),true)});
test('department sharing never exposes the idea to another department',()=>{const idea={...t,stage:'proposal',recipient:null,workflow:{visibility:'department'}};assert.equal(canSeeTicket({id:'b',role:'employee',department:'ИТ'},idea),true);assert.equal(canSeeTicket({id:'b',role:'employee',department:'HR'},idea),false)});
test('legacy unpublished insights default to personal access',()=>{assert.equal(privateInsight({...t,stage:'registration',workflow:{},published:false}),true)});
