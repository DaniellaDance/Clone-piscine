import {canMessageRecipient} from './access.mjs';
import {syncDayTask} from './planner-bitrix.mjs';
export async function mirrorIdea({query,ticket,u,kind,meeting,call,explicit=false}){
 if(!explicit)return {status:'manual_required',message:'Идея сохранена только на сайте. Для отправки подключите «Мой Битрикс» и нажмите «Отправить идею в Битрикс — задачу».'};
 const account=(await query('SELECT webhook FROM ideafix.bitrix_accounts WHERE app_user=$1',[u.id])).rows[0];
 if(!account?.webhook)throw Object.assign(new Error('Сначала подключите «Мой Битрикс»'),{status:409});
 // A direct recipient owns the task; otherwise the initiating user owns it.
 // Never distribute an idea to a department or infer a person from a free-text name.
 if(ticket.anonymous)return {status:'skipped',message:'Анонимное обращение не передаётся в личный Битрикс'};
 const owner=ticket.recipient||u.id;
 if(owner!==u.id){const recipient=(await query('SELECT id,role,department FROM ideafix.users WHERE id=$1',[owner])).rows[0];if(!canMessageRecipient(u,recipient))throw Object.assign(new Error('Получатель недоступен для вашей роли и отдела'),{status:403});}
 const key=`idea:${ticket.id}:${kind}:${meeting?.id||0}:${owner}`;
 const title=({pilot:'Пилот',discussion:'Обсуждение идеи',idea:'Новая идея'})[kind]||'Идея';
 const now=new Date(),day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Almaty',year:'numeric',month:'2-digit',day:'2-digit'}).format(meeting?new Date(meeting.starts_at):now);
 const starts=meeting?.starts_at||now.toISOString();
 const description=[ticket.offering_name?'Продукт / услуга: '+ticket.offering_name:'',ticket.body,kind==='pilot'?'План пилота: '+(ticket.workflow?.pilot||''):'',meeting?'Совещание: '+meeting.title:'',meeting?'Место: '+(meeting.location||''):'','IdeaFix · обращение №'+ticket.id].filter(Boolean).join('\n\n').slice(0,2000);
 const r=await query(`INSERT INTO ideafix.planner_tasks(owner,title,description,planned_for,due_at,status,source,external_key,work_task,sync_status,duration_minutes) VALUES($1,$2,$3,$4,$5,'new','idea-event',$6,true,'queued',30) ON CONFLICT(owner,external_key) WHERE external_key IS NOT NULL DO UPDATE SET external_key=excluded.external_key RETURNING *`,[owner,`${title} #${ticket.id}: ${ticket.title}`.slice(0,200),description,day,starts,key]);
 return syncDayTask(query,r.rows[0],call,{explicitIdea:true});
}
