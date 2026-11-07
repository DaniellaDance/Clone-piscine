export function recordResponse(ticket,account,body,now){
 const response=String(body||'').trim();if(!response)throw Error('Чтобы перевести заявку в работу, сначала ответьте по существу вопроса.');
 if(!ticket.firstResponseAt){ticket.firstResponseAt=now;ticket.firstResponseBy=account.id;}
 if(ticket.status==='new')ticket.status='work';ticket.updated=now;return response;
}
