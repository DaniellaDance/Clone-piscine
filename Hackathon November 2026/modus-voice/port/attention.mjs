export const needsAttention=(ticket,regular=false)=>ticket.status!=='resolved'&&(ticket.priority==='urgent'||regular);
