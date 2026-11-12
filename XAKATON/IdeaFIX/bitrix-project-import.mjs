import {bitrixCall,BITRIX_PORTAL} from './bitrix.mjs';
const permitted=u=>['director','admin'].includes(u.role);
const normalize=s=>String(s).replace(/_/g,'').toLowerCase();
const field=(row,name)=>{const key=Object.keys(row).find(k=>normalize(k)===normalize(name));return key?row[key]:undefined};
export function financialAmount(value){if(value===null||value===undefined||String(value).trim()===''||Array.isArray(value))return null;const n=Number(String(value).replace(',','.'));return Number.isFinite(n)&&n>=0&&n<=1e12?n:null}
export function bitrixFinanceRows(groups,tasks,incomeField='',expenseField='',pilotGroup=''){
 const sum=(rows,name)=>{if(!name||!rows.length)return null;const values=rows.map(t=>financialAmount(field(t,name)));return values.every(n=>n!==null)?values.reduce((a,b)=>a+b,0):null};
 return groups.flatMap(g=>{const groupId=String(field(g,'ID')),name=String(field(g,'NAME')||'Проект '+groupId),list=tasks.filter(t=>String(field(t,'GROUP_ID'))===groupId);const pilot=pilotGroup?groupId===pilotGroup:/^пилотные проекты$/iu.test(name.trim());
 if(pilot)return list.map(t=>({key:'pilot:'+field(t,'ID'),title:String(field(t,'TITLE')||'Пилот'),phase:'pilot',income:incomeField?financialAmount(field(t,incomeField)):null,expense:expenseField?financialAmount(field(t,expenseField)):null,source_url:BITRIX_PORTAL+'/workgroups/group/'+groupId+'/tasks/task/view/'+field(t,'ID')+'/',task_count:1}));
 return [{key:'project:'+groupId,title:name,phase:'project',income:sum(list,incomeField),expense:sum(list,expenseField),source_url:BITRIX_PORTAL+'/workgroups/group/'+groupId+'/',task_count:list.length}];
 });
}
async function pages(call,base,method,payload,read){const out=[];let start=0;for(let page=0;page<200;page++){const data=await call(base,method,{...payload,start});const rows=read(data);if(!Array.isArray(rows))throw Object.assign(Error('Битрикс вернул неожиданный формат списка'),{status:502});out.push(...rows);if(data.next===undefined||data.next===null)return out;const next=Number(data.next);if(!Number.isSafeInteger(next)||next<=start)throw Object.assign(Error('Битрикс не подтвердил следующую страницу'),{status:502});start=next}throw Object.assign(Error('Слишком большой список: уточните доступные проекты в Битриксе'),{status:413})}
export async function handleProjectImport({url,req,u,body,query,send,fail},call=bitrixCall){
 if(url.pathname==='/api/project-finances'&&req.method==='GET'){if(!permitted(u))fail(403,'Финансы доступны руководителям');send((await query('SELECT remote_key AS key,title,phase,income,expense,source_url,imported_at FROM ideafix.bitrix_project_finances WHERE owner=$1 ORDER BY title,phase',[u.id])).rows);return true}
 if(url.pathname!=='/api/bitrix/project-import')return false;
 if(!permitted(u))fail(403,'Импорт доступен руководителям');if(!['GET','POST'].includes(req.method))fail(405,'Метод недоступен');
 const account=(await query('SELECT webhook FROM ideafix.bitrix_accounts WHERE app_user=$1',[u.id])).rows[0];if(!account?.webhook)fail(409,'Сначала подключите «Мой Битрикс» в настройках.');
 const input=req.method==='GET'?Object.fromEntries(url.searchParams):await body(req);
 const meta=await call(account.webhook,'tasks.task.getFields');const fields=meta.result?.fields||meta.result||{};
 const numericFields=Object.entries(fields).filter(([name,m])=>/^UF_/i.test(name)&&['double','integer','number','float','money'].includes(String(m.type||m.userTypeId||'').toLowerCase())).map(([id,m])=>({id,name:String(m.title||m.label||id)}));
 for(const key of ['income_field','expense_field'])if(input[key]&&!numericFields.some(f=>f.id===input[key]))fail(400,'Выберите числовое поле задачи из Битрикса');
 if(input.income_field&&input.income_field===input.expense_field)fail(400,'Для дохода и расхода выберите разные поля');
 const groups=await pages(call,account.webhook,'sonet_group.get',{FILTER:{PROJECT:'Y'},ORDER:{NAME:'ASC'}},r=>r.result);
 if(input.pilot_group&&!groups.some(g=>String(field(g,'ID'))===String(input.pilot_group)))fail(400,'Выберите проект с пилотами из списка');
 const tasks=groups.length?await pages(call,account.webhook,'tasks.task.list',{filter:{GROUP_ID:groups.map(g=>field(g,'ID'))},select:['ID','TITLE','GROUP_ID',...new Set([input.income_field,input.expense_field].filter(Boolean))],order:{ID:'ASC'}},r=>r.result?.tasks):[];
 const rows=bitrixFinanceRows(groups,tasks,input.income_field,input.expense_field,String(input.pilot_group||''));
 if(req.method==='GET'){send({rows,fields:numericFields,groups:groups.map(g=>({id:String(field(g,'ID')),name:String(field(g,'NAME'))})),note:'Суммы проектов складываются из выбранных числовых полей их задач. Пилоты — задачи выбранного проекта «Пилотные проекты». Пустые или недоступные суммы не считаются нулями.'});return true}
 if(!Array.isArray(input.selected_keys)||!input.selected_keys.length||input.selected_keys.length>10000)fail(400,'Выберите проекты или пилоты для импорта');
 const selected=new Set(input.selected_keys);if([...selected].some(key=>!rows.some(r=>r.key===key)))fail(409,'Список Битрикса изменился. Загрузите его заново.');
 // One atomic statement: duplicate imports update the same external records.
 const records=rows.filter(r=>selected.has(r.key)).map(r=>({...r,owner:u.id}));
 const saved=await query(`INSERT INTO ideafix.bitrix_project_finances(owner,remote_key,title,phase,income,expense,source_url,imported_at) SELECT owner,key,title,phase,income,expense,source_url,now() FROM jsonb_to_recordset($1::jsonb) AS r(owner text,key text,title text,phase text,income numeric,expense numeric,source_url text) ON CONFLICT(owner,remote_key) DO UPDATE SET title=excluded.title,phase=excluded.phase,income=excluded.income,expense=excluded.expense,source_url=excluded.source_url,imported_at=now() RETURNING remote_key`,[JSON.stringify(records)]);
 send({ok:true,imported:saved.rows.length});return true;
}
