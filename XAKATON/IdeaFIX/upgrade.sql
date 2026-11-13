-- Additive upgrade. Existing data, authentication and privacy are preserved.
ALTER TABLE ideafix.users ADD COLUMN IF NOT EXISTS unavailable_until timestamptz;
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS assignee_id text REFERENCES ideafix.users(id);
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS assignment_reason text NOT NULL DEFAULT '';
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS version integer NOT NULL DEFAULT 1;
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS resolved_at timestamptz;
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS escalated_at timestamptz;
CREATE TABLE IF NOT EXISTS ideafix.routing_rules(department text NOT NULL,kind text NOT NULL DEFAULT '*',owner text REFERENCES ideafix.users(id),backup text REFERENCES ideafix.users(id),response_days integer NOT NULL DEFAULT 2 CHECK(response_days BETWEEN 1 AND 90),resolution_days integer NOT NULL DEFAULT 10 CHECK(resolution_days BETWEEN 1 AND 90),PRIMARY KEY(department,kind));
INSERT INTO ideafix.routing_rules(department) SELECT unnest(ARRAY['ИТ','Закупки','Продажи','Склад','Логистика','HR','Руководство']) ON CONFLICT DO NOTHING;
CREATE TABLE IF NOT EXISTS ideafix.ticket_followers(ticket integer REFERENCES ideafix.tickets(id),user_id text REFERENCES ideafix.users(id),PRIMARY KEY(ticket,user_id));
CREATE TABLE IF NOT EXISTS ideafix.inbox_events(id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,user_id text REFERENCES ideafix.users(id),ticket integer REFERENCES ideafix.tickets(id),kind text NOT NULL,title text NOT NULL,created timestamptz NOT NULL DEFAULT now(),read_at timestamptz);
CREATE TABLE IF NOT EXISTS ideafix.integration_outbox(id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,ticket integer,event text NOT NULL,status text NOT NULL DEFAULT 'prepared',attempts integer NOT NULL DEFAULT 0,created timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS ideafix.ticket_audit(id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,ticket integer NOT NULL,version integer NOT NULL,event text NOT NULL,created timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS ticket_inbox_user ON ideafix.inbox_events(user_id,id DESC);
CREATE INDEX IF NOT EXISTS ticket_owner_status ON ideafix.tickets(assignee_id,status);
CREATE INDEX IF NOT EXISTS ticket_department_status ON ideafix.tickets(department,status);
CREATE INDEX IF NOT EXISTS ticket_kind_created ON ideafix.tickets(kind,created DESC);
CREATE INDEX IF NOT EXISTS ticket_due_open ON ideafix.tickets(due) WHERE status NOT IN ('done','reject');
CREATE OR REPLACE FUNCTION ideafix.business_due(start_at timestamptz,minutes integer) RETURNS timestamptz LANGUAGE plpgsql IMMUTABLE AS $$
DECLARE local_at timestamp:=start_at AT TIME ZONE 'Asia/Almaty';remain numeric:=minutes::numeric*60;part numeric;next_day timestamp;
BEGIN
 IF minutes<0 OR minutes>527040 THEN RAISE EXCEPTION 'Invalid business minutes';END IF;
 WHILE remain>0 LOOP
  IF extract(isodow FROM local_at)>=6 THEN local_at:=date_trunc('day',local_at)+(8-extract(isodow FROM local_at))::integer*interval '1 day';CONTINUE;END IF;
  next_day:=date_trunc('day',local_at)+interval '1 day';part:=extract(epoch FROM next_day-local_at);
  IF remain<part THEN local_at:=local_at+remain*interval '1 second';remain:=0;
  ELSE local_at:=next_day;remain:=remain-part;END IF;
 END LOOP;
 IF minutes>0 AND extract(isodow FROM local_at)>=6 THEN local_at:=date_trunc('day',local_at)+(8-extract(isodow FROM local_at))::integer*interval '1 day';END IF;
 RETURN local_at AT TIME ZONE 'Asia/Almaty';
END $$;
CREATE OR REPLACE FUNCTION ideafix.upgrade_ticket_before() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE rule ideafix.routing_rules;chosen text;private_draft boolean;
BEGIN
 private_draft:=coalesce(NEW.workflow->>'visibility','')='private';
 IF TG_OP='INSERT' THEN
  SELECT * INTO rule FROM ideafix.routing_rules WHERE department=NEW.department AND kind IN ('*',NEW.kind) ORDER BY (kind=NEW.kind) DESC LIMIT 1;
  NEW.due:=ideafix.business_due(NEW.created,coalesce(rule.resolution_days,10)*1440);
  NEW.first_response_due:=ideafix.business_due(NEW.created,least(coalesce(NEW.first_response_minutes,1440),coalesce(rule.response_days,2)*1440));
 ELSE NEW.version:=OLD.version+1;
 END IF;
 IF NOT private_draft AND (NEW.assignee_id IS NULL OR (TG_OP='UPDATE' AND coalesce(OLD.workflow->>'visibility','')='private')) THEN
  SELECT * INTO rule FROM ideafix.routing_rules WHERE department=NEW.department AND kind IN ('*',NEW.kind) ORDER BY (kind=NEW.kind) DESC LIMIT 1;
  SELECT id INTO chosen FROM ideafix.users WHERE id=rule.owner AND (unavailable_until IS NULL OR unavailable_until<=now());
  NEW.assignment_reason:='Назначено по правилу';
  IF chosen IS NULL THEN SELECT id INTO chosen FROM ideafix.users WHERE id=rule.backup AND (unavailable_until IS NULL OR unavailable_until<=now());NEW.assignment_reason:='Замещающий по правилу';END IF;
  IF chosen IS NULL THEN SELECT id INTO chosen FROM ideafix.users WHERE role='lead' AND department=NEW.department AND (unavailable_until IS NULL OR unavailable_until<=now()) ORDER BY id LIMIT 1;NEW.assignment_reason:='Резерв: руководитель отдела';END IF;
  IF chosen IS NULL THEN SELECT id INTO chosen FROM ideafix.users WHERE role IN ('director','admin') AND (unavailable_until IS NULL OR unavailable_until<=now()) ORDER BY (role='director') DESC,id LIMIT 1;NEW.assignment_reason:='Резерв: руководство компании';END IF;
  NEW.assignee_id:=chosen;
  IF chosen IS NULL THEN NEW.assignment_reason:='Ожидает назначения: нет доступного руководителя';END IF;
 END IF;
 IF NEW.status IN ('done','reject') AND length(trim(NEW.result))<5 THEN RAISE EXCEPTION 'Outcome is required' USING ERRCODE='23514';END IF;
 IF NEW.status IN ('done','reject') AND (TG_OP='INSERT' OR OLD.status NOT IN ('done','reject')) THEN NEW.resolved_at:=now();END IF;
 IF TG_OP='UPDATE' AND NEW.status NOT IN ('done','reject') AND OLD.status IN ('done','reject') THEN NEW.resolved_at:=NULL;NEW.escalated_at:=NULL;END IF;
 RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS upgrade_ticket_before ON ideafix.tickets;
CREATE TRIGGER upgrade_ticket_before BEFORE INSERT OR UPDATE ON ideafix.tickets FOR EACH ROW EXECUTE FUNCTION ideafix.upgrade_ticket_before();
CREATE OR REPLACE FUNCTION ideafix.upgrade_ticket_after() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE label text;kind text;recipient_id text;private_draft boolean;
BEGIN
 private_draft:=coalesce(NEW.workflow->>'visibility','')='private';
 IF TG_OP='INSERT' THEN kind:='created';label:='Зарегистрировано обращение';
 ELSIF NEW.escalated_at IS DISTINCT FROM OLD.escalated_at AND NEW.escalated_at IS NOT NULL THEN kind:='overdue';label:='Просрочка: обращение на контроле руководителя';
 ELSIF NEW.status IS DISTINCT FROM OLD.status THEN kind:='status';label:='Статус обращения изменён: '||NEW.status;
 ELSIF NEW.assignee_id IS DISTINCT FROM OLD.assignee_id THEN kind:='assigned';label:='Назначен ответственный';
 ELSE RETURN NEW;END IF;
 INSERT INTO ideafix.ticket_audit(ticket,version,event) VALUES(NEW.id,NEW.version,kind);
 IF NOT private_draft THEN
  INSERT INTO ideafix.integration_outbox(ticket,event) VALUES(NEW.id,kind);
 END IF;
 FOR recipient_id IN SELECT DISTINCT who FROM (
   SELECT NEW.author AS who UNION SELECT CASE WHEN NOT private_draft THEN NEW.assignee_id END
   UNION SELECT f.user_id FROM ideafix.ticket_followers f WHERE f.ticket=NEW.id AND NOT private_draft
   UNION SELECT u.id FROM ideafix.users u WHERE NOT private_draft AND kind='overdue' AND (u.role IN ('director','admin') OR (u.role='lead' AND u.department=NEW.department))
  ) recipients WHERE who IS NOT NULL LOOP
  INSERT INTO ideafix.inbox_events(user_id,ticket,kind,title) VALUES(recipient_id,NEW.id,kind,label);
 END LOOP;
 IF TG_OP='UPDATE' AND kind='overdue' THEN INSERT INTO ideafix.events(ticket,actor,text,internal) VALUES(NEW.id,'Система',label,false);END IF;
 RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS upgrade_ticket_after ON ideafix.tickets;
CREATE TRIGGER upgrade_ticket_after AFTER INSERT OR UPDATE ON ideafix.tickets FOR EACH ROW EXECUTE FUNCTION ideafix.upgrade_ticket_after();
CREATE OR REPLACE FUNCTION ideafix.protect_ticket_audit() RETURNS trigger LANGUAGE plpgsql AS $$BEGIN RAISE EXCEPTION 'Audit log is append-only';END $$;
DROP TRIGGER IF EXISTS ticket_audit_append_only ON ideafix.ticket_audit;
CREATE TRIGGER ticket_audit_append_only BEFORE UPDATE OR DELETE ON ideafix.ticket_audit FOR EACH ROW EXECUTE FUNCTION ideafix.protect_ticket_audit();

CREATE TABLE IF NOT EXISTS ideafix.creation_limits(user_id text PRIMARY KEY REFERENCES ideafix.users(id),window_start timestamptz NOT NULL,n integer NOT NULL);
-- Existing open items keep their dates; assign only where a responsible person is missing.
UPDATE ideafix.tickets SET assignment_reason=assignment_reason WHERE assignee_id IS NULL AND status NOT IN ('done','reject') AND coalesce(workflow->>'visibility','')<>'private' AND EXISTS(SELECT 1 FROM ideafix.users WHERE role IN ('lead','director','admin') AND (unavailable_until IS NULL OR unavailable_until<=now()));
CREATE OR REPLACE FUNCTION ideafix.notify_ticket_comment() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE a text;
BEGIN
 IF NOT NEW.internal AND NEW.actor<>'Система' THEN
  SELECT author INTO a FROM ideafix.tickets WHERE id=NEW.ticket;
  IF a IS NOT NULL THEN INSERT INTO ideafix.inbox_events(user_id,ticket,kind,title) VALUES(a,NEW.ticket,'comment','Новый комментарий или запрос уточнения');END IF;
 END IF;RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS notify_ticket_comment ON ideafix.events;
CREATE TRIGGER notify_ticket_comment AFTER INSERT ON ideafix.events FOR EACH ROW EXECUTE FUNCTION ideafix.notify_ticket_comment();

ALTER TABLE ideafix.integration_outbox ADD COLUMN IF NOT EXISTS next_attempt_at timestamptz NOT NULL DEFAULT now();
ALTER TABLE ideafix.integration_outbox ADD COLUMN IF NOT EXISTS locked_until timestamptz;
ALTER TABLE ideafix.integration_outbox ADD COLUMN IF NOT EXISTS last_error text NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS integration_outbox_ready ON ideafix.integration_outbox(next_attempt_at) WHERE status='prepared';

-- User-scoped translation cache: originals are never overwritten.
CREATE TABLE IF NOT EXISTS ideafix.translations(user_id text NOT NULL REFERENCES ideafix.users(id),language text NOT NULL CHECK(language IN ('en','kk')),source_hash text NOT NULL,translated text NOT NULL,created timestamptz NOT NULL DEFAULT now(),PRIMARY KEY(user_id,language,source_hash));
CREATE TABLE IF NOT EXISTS ideafix.translation_limits(user_id text PRIMARY KEY REFERENCES ideafix.users(id),window_start timestamptz NOT NULL,n integer NOT NULL);

CREATE TABLE IF NOT EXISTS ideafix.discussion_files(id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,topic_id bigint NOT NULL REFERENCES ideafix.discussion_topics(id),author text NOT NULL REFERENCES ideafix.users(id),filename text NOT NULL,mime text NOT NULL,bytes bytea NOT NULL,created timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS discussion_files_topic ON ideafix.discussion_files(topic_id,id);
ALTER TABLE ideafix.discussion_messages ADD COLUMN IF NOT EXISTS file_id bigint REFERENCES ideafix.discussion_files(id);
