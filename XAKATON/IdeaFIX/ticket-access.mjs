// Explicit privacy is stored with the workflow; no schema migration is required.
export const ownerOf=(u,t)=>!!u&&!t.anonymous&&t.author===u.id;
export const privateInsight=t=>t.workflow?.visibility==='private'||(!t.workflow?.visibility&&!t.anonymous&&(t.stage==='insight'||(t.entry_type==='insight'&&t.stage==='registration')));
