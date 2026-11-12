import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('./public/assets/app.js',import.meta.url),'utf8');
const finance=source.slice(source.indexOf('function projectFinanceRows('),source.indexOf('async function renderFinancialResults('));
const summary=source.slice(source.indexOf('function directorFinancialSummary('),source.indexOf('function showDirectorAnalytics('));
test('director summary calculates actual pilot totals and preserves missing data',()=>{
 const context={Intl,me:{id:'director'}};vm.createContext(context);vm.runInContext(finance+summary,context);
 const html=context.directorFinancialSummary([{id:1,title:'Пилот',canManage:true,stage:'pilot',workflow:{pilotIncome:'120000',pilotExpense:'45000'}}]);
 assert.match(html,/120\D*000/);assert.match(html,/45\D*000/);assert.match(html,/75\D*000/);
 const empty=context.directorFinancialSummary([{canManage:true,stage:'pilot',workflow:{}}]);assert.match(empty,/Нет данных/);
 const zero=context.projectFinanceRows([{id:1,canManage:true,stage:'pilot',workflow:{pilotIncome:'0',pilotExpense:'0'}}],context.me);assert.equal(zero[0].balance,0);
});
test('resizing a financial report never invokes list rendering',()=>{
 const callback=source.match(/window.addEventListener\('resize',(.+?)\);/)[1];let calls=0;
 const c={page:'results',$:()=>({}),renderList:()=>calls++};vm.createContext(c);vm.runInContext('('+callback+')()',c);assert.equal(calls,0);
 c.page='ideas';vm.runInContext('('+callback+')()',c);assert.equal(calls,1);
});
test('showcase reports the actual project stage even when status is generic',()=>{
 const fn=source.slice(source.indexOf('function showcaseState('),source.indexOf('function showcaseTile('));
 const c={stages:{pilot:'Пилот',implementation:'Внедрение'},status:{work:'В работе'}};vm.createContext(c);vm.runInContext(fn,c);
 assert.equal(c.showcaseState({stage:'pilot',status:'work'}),'Пилот');assert.equal(c.showcaseState({stage:'implementation',status:'work'}),'Внедрение');
});
