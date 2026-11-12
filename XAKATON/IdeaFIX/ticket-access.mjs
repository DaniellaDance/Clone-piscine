// Explicit privacy is stored with the workflow; no schema migration is required.
export const ownerOf=(u,t)=>!!u&&!t.anonymous&&t.author===u.id;
export const privateInsight=t=>t.workflow?.visibility==='private'||(!t.workflow?.visibility&&!t.anonymous&&(t.stage==='insight'||(t.entry_type==='insight'&&t.stage==='registration')));
export function canSeeTicket(u,t){
 if(!u)return false;if(ownerOf(u,t))return true;if(privateInsight(t))return false;
 if(u.role==='employee'&&t.workflow?.visibility==='leaders')return false;
 if(['director','admin'].includes(u.role))return true;
 if(u.role==='lead')return t.department===u.department||t.recipient===u.id;
 return t.recipient===u.id||!!t.published&&(t.workflow?.visibility!=='department'||t.department===u.department);
}
export const canManageTicket=(u,t)=>canSeeTicket(u,t)&&(['director','admin'].includes(u.role)||(u.role==='lead'&&u.department===t.department));
// Gate other SQL surfaces before rows leave Postgres (aliases and positional parameters are internal).
export function privacySQL(alias,userParam,roleParam,departmentParam){const a=alias?alias+'.':'';return `(${a}author=${userParam} OR (coalesce(${a}workflow->>'visibility','')<>'private' AND NOT (coalesce(${a}workflow->>'visibility','')='' AND NOT ${a}anonymous AND (${a}stage='insight' OR (${a}entry_type='insight' AND ${a}stage='registration'))) AND (${roleParam}<>'employee' OR coalesce(${a}workflow->>'visibility','')<>'leaders') AND (${roleParam}<>'employee' OR coalesce(${a}workflow->>'visibility','')<>'department' OR ${a}department=${departmentParam})) )`;}
