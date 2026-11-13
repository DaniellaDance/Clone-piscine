import {canSeeTicket} from './access.mjs';
// Closed leadership discussions: one topic per meeting thread, durable in Postgres.
// Only director/department leads can select, chat, finalize and download protocols.
const leaders = u => u && ['director', 'admin', 'lead'].includes(u.role);
const asId = (value, fail) => {
  const n = Number(value);
  if (!Number.isSafeInteger(n) || n <= 0) fail(400, 'Неверный номер обсуждения');
  return n;
};
const safeText = (value, fail) => {
  if (typeof value !== 'string' || value.trim().length < 1 || value.length > 3000)
    fail(400, 'Сообщение должно содержать от 1 до 3000 символов');
  return value.trim();
};
const stamp = value => new Intl.DateTimeFormat('ru-RU', {
  timeZone: 'Asia/Almaty', dateStyle: 'short', timeStyle: 'medium'
}).format(new Date(value));
export function formatDiscussionProtocol(topic, messages) {
  const lines = [
    'IdeaFIX · ПРОТОКОЛ РАБОЧЕГО ОБСУЖДЕНИЯ',
    'Обсуждение № ' + topic.id,
    'Тема: #' + topic.ticket_id + ' · ' + topic.title,
    'Категория: ' + (topic.kind === 'idea' ? 'Идея' : topic.kind === 'problem' ? 'Проблема' : 'Обращение'),
    'Отдел: ' + topic.department,
    'Начало: ' + stamp(topic.created) + ' (Алматы)',
    'Завершение: ' + stamp(topic.closed_at || new Date()) + ' (Алматы)',
    'Участники: ' + [...new Set(messages.map(m => m.name + ' (' + m.department + ')'))].join(', '),
    '',
    'ПОЛНАЯ ЗАПИСЬ ПЕРЕПИСКИ'
  ];
  messages.forEach((m, i) => {
    lines.push('', (i + 1) + '. [' + stamp(m.created) + '] ' + m.name + ' · ' + m.department, m.text);
  });
  lines.push('', 'Всего сообщений: ' + messages.length, 'Конец протокола.');
  return lines.join('\n') + '\n';
}

export async function handleDiscussions({url, req, u, body, query, pool, send, fail, res}) {
  if (!url.pathname.startsWith('/api/discussions')) return false;
  if (!leaders(u)) fail(403, 'Обсуждения доступны директору и руководителям отделов');

  if (url.pathname === '/api/discussions/candidates') {
    if (req.method !== 'GET') fail(405, 'Метод недоступен');
    const rows = (await query(
      "SELECT id,title,kind,department,stage,author,anonymous,idea_audience,workflow,entry_type FROM ideafix.tickets WHERE NOT anonymous AND ($1 OR department=$2) ORDER BY created DESC LIMIT 200",
      [['director','admin'].includes(u.role), u.department]
    )).rows;
    send(rows.filter(t => ['idea', 'problem'].includes(t.kind)&&canSeeTicket(u,t)));
    return true;
  }

  if (url.pathname === '/api/discussions/topics') {
    if (req.method === 'GET') {
      const rows = (await query(
        "SELECT d.id,d.ticket_id,d.created,d.closed_at,t.title,t.kind,t.department,t.author,t.anonymous,t.idea_audience,t.workflow,t.entry_type,t.stage,u.name AS created_by_name FROM ideafix.discussion_topics d JOIN ideafix.tickets t ON t.id=d.ticket_id JOIN ideafix.users u ON u.id=d.created_by WHERE ($1 OR t.department=$2) ORDER BY d.created DESC LIMIT 100",[u.role==='director',u.department]
      )).rows;
      send(rows.filter(t=>canSeeTicket(u,t))); return true;
    }
    if (req.method !== 'POST') fail(405, 'Метод недоступен');
    const data = await body(req);
    const ticketId = asId(data.ticket_id, fail);
    const t = (await query('SELECT id,title,kind,department,anonymous,published,author,idea_audience,workflow,entry_type,stage FROM ideafix.tickets WHERE id=$1', [ticketId])).rows[0];
    if (!t||!canSeeTicket(u,t)) fail(404, 'Идея или проблема не найдена');
    if (t.anonymous || !['idea','problem'].includes(t.kind)) fail(403, 'Для общего обсуждения можно выбирать только неанонимные идеи и проблемы');
    if (!['director','admin'].includes(u.role) && t.department !== u.department)
      fail(403, 'Можно выбирать только идеи и проблемы своего отдела');
    const record = (await query(
      'INSERT INTO ideafix.discussion_topics(ticket_id,created_by) VALUES($1,$2) RETURNING id,ticket_id,created,closed_at',
      [ticketId, u.id]
    )).rows[0];
    send({...record,title:t.title,kind:t.kind,department:t.department}, 201);
    return true;
  }

  const m = url.pathname.match(/^\/api\/discussions\/topics\/(\d+)(?:\/(messages|close|export|files)(?:\/(\d+))?)?$/);
  if (!m) fail(404, 'Обсуждение не найдено');
  const topicId = asId(m[1], fail), action = m[2] || '';if(m[3]&&action!=='files')fail(404,'Файл не найден');
  const topic = (await query(
    'SELECT d.id,d.ticket_id,d.created,d.closed_at,t.title,t.kind,t.department,t.author,t.anonymous,t.idea_audience,t.workflow,t.entry_type,t.stage FROM ideafix.discussion_topics d JOIN ideafix.tickets t ON t.id=d.ticket_id WHERE d.id=$1',
    [topicId]
  )).rows[0];
  if (!topic || !canSeeTicket(u,topic) || (!['director','admin'].includes(u.role) && topic.department!==u.department)) fail(404, 'Обсуждение не найдено');

  if(action==='files'){
    if(req.method==='GET'&&m[3]){
      const f=(await query('SELECT filename,bytes FROM ideafix.discussion_files WHERE id=$1 AND topic_id=$2',[asId(m[3],fail),topicId])).rows[0];if(!f)fail(404,'Файл не найден');
      res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Disposition':"attachment; filename*=UTF-8''"+encodeURIComponent(f.filename),'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'});res.end(f.bytes);return true;
    }
    if(req.method==='GET'){send((await query('SELECT id,filename,mime,octet_length(bytes) AS size,created FROM ideafix.discussion_files WHERE topic_id=$1 ORDER BY id',[topicId])).rows);return true}
    if(req.method!=='POST'||m[3])fail(405,'Метод недоступен');
    const data=await body(req,4200000),filename=String(data.filename||'').trim().replace(/[\\/\r\n]/g,'_').slice(0,160),mime=String(data.mime||'application/octet-stream').slice(0,100);
    if(!filename||!/[.](pdf|docx?|xlsx?|pptx?|txt|csv|json|png|jpe?g|webp|mp3|wav|mp4|webm)$/i.test(filename))fail(400,'Этот тип вложения не разрешён');
    if(!/^[a-z\d.+-]+\/[a-z\d.+-]+$/i.test(mime)||typeof data.base64!=='string'||data.base64.length>2800000||!/^[A-Za-z0-9+/]+={0,2}$/.test(data.base64))fail(400,'Проверьте файл: не более 2 МБ');
    const bytes=Buffer.from(data.base64,'base64');if(!bytes.length||bytes.length>2097152)fail(413,'Максимальный размер файла — 2 МБ');
    const client=await pool.connect();let result;try{await client.query('BEGIN');const lock=(await client.query('SELECT closed_at FROM ideafix.discussion_topics WHERE id=$1 FOR UPDATE',[topicId])).rows[0];if(!lock)fail(404,'Обсуждение не найдено');if(lock.closed_at)fail(409,'Обсуждение завершено; новые файлы не принимаются');const count=(await client.query('SELECT count(*)::int AS n FROM ideafix.discussion_files WHERE topic_id=$1',[topicId])).rows[0].n;if(count>=20)fail(400,'Не более 20 файлов в одном обсуждении');result=(await client.query('INSERT INTO ideafix.discussion_files(topic_id,author,filename,mime,bytes) VALUES($1,$2,$3,$4,$5) RETURNING id,filename,mime,octet_length(bytes) AS size',[topicId,u.id,filename,mime,bytes])).rows[0];await client.query('INSERT INTO ideafix.discussion_messages(topic_id,author,text,file_id) VALUES($1,$2,$3,$4)',[topicId,u.id,'Прикреплён файл: '+filename,result.id]);await client.query('COMMIT')}catch(e){await client.query('ROLLBACK').catch(()=>{});throw e}finally{client.release()}send(result,201);return true;
  }

  if (!action && req.method === 'GET') {send(topic); return true;}
  if (action === 'messages' && req.method === 'GET') {
    const rows = (await query(
      'SELECT m.id,m.text,m.created,m.author,u.name,u.department,m.file_id,f.filename,f.mime,octet_length(f.bytes) AS file_size FROM ideafix.discussion_messages m JOIN ideafix.users u ON u.id=m.author LEFT JOIN ideafix.discussion_files f ON f.id=m.file_id AND f.topic_id=m.topic_id WHERE m.topic_id=$1 ORDER BY m.id',
      [topicId]
    )).rows;
    send(rows); return true;
  }

  if ((action === 'messages' || action === 'close') && req.method === 'POST') {
    const data = action === 'messages' ? await body(req) : null;
    const messageText = action === 'messages' ? safeText(data.text, fail) : null;
    const client = await pool.connect();
    let result;
    try {
      await client.query('BEGIN');
      const locked = (await client.query('SELECT closed_at FROM ideafix.discussion_topics WHERE id=$1 FOR UPDATE', [topicId])).rows[0];
      if (!locked) fail(404, 'Обсуждение не найдено');
      if (locked.closed_at) fail(409, 'Обсуждение завершено; сообщения больше не принимаются');
      if (action === 'messages') {
        result = (await client.query(
          'INSERT INTO ideafix.discussion_messages(topic_id,author,text) VALUES($1,$2,$3) RETURNING id,text,created',
          [topicId,u.id,messageText]
        )).rows[0];
        result = {...result,author:u.id,name:u.name,department:u.department};
      } else {
        const rows = (await client.query(
          'SELECT m.id,m.text,m.created,u.name,u.department FROM ideafix.discussion_messages m JOIN ideafix.users u ON u.id=m.author WHERE m.topic_id=$1 ORDER BY m.id',
          [topicId]
        )).rows;
        result = (await client.query(
          'UPDATE ideafix.discussion_topics SET closed_at=now(),closed_by=$2 WHERE id=$1 RETURNING closed_at',
          [topicId,u.id]
        )).rows[0];
        const content = formatDiscussionProtocol({...topic,closed_at:result.closed_at}, rows);
        const filename = 'IdeaFIX-discussion-' + topicId + '.txt';
        await client.query(
          'INSERT INTO ideafix.discussion_exports(topic_id,filename,bytes,message_count) VALUES($1,$2,$3,$4) ON CONFLICT(topic_id) DO UPDATE SET filename=EXCLUDED.filename,bytes=EXCLUDED.bytes,message_count=EXCLUDED.message_count,generated_at=now()',
          [topicId,filename,Buffer.from(content,'utf8'),rows.length]
        );
        result = {...result,filename,message_count:rows.length};
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK').catch(()=>{});
      throw e;
    } finally {client.release();}
    send(result,action==='messages'?201:200);
    return true;
  }

  if (action === 'export' && req.method === 'GET') {
    if (!topic.closed_at) fail(409, 'Сначала завершите обсуждение, чтобы сохранить протокол');
    const file = (await query(
      'SELECT filename,bytes FROM ideafix.discussion_exports WHERE topic_id=$1',
      [topicId]
    )).rows[0];
    if (!file) fail(404, 'Протокол ещё не сформирован');
    res.writeHead(200,{
      'Content-Type':'text/plain; charset=utf-8',
      'Content-Disposition':"attachment; filename*=UTF-8''"+encodeURIComponent(file.filename),
      'Cache-Control':'private, no-store',
      'X-Content-Type-Options':'nosniff'
    });
    res.end(file.bytes);
    return true;
  }

  fail(405, 'Метод недоступен');
}


