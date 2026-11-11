CREATE SCHEMA IF NOT EXISTS ideafix;
CREATE TABLE IF NOT EXISTS ideafix.users(id text PRIMARY KEY, login text UNIQUE NOT NULL, name text NOT NULL, password text NOT NULL, role text NOT NULL DEFAULT 'employee', department text NOT NULL);
CREATE TABLE IF NOT EXISTS ideafix.sessions(token text PRIMARY KEY, user_id text REFERENCES ideafix.users(id), expires timestamptz NOT NULL);
CREATE TABLE IF NOT EXISTS ideafix.text_check_limits(user_id text PRIMARY KEY REFERENCES ideafix.users(id) ON DELETE CASCADE,window_start timestamptz NOT NULL DEFAULT now(),n integer NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS ideafix.meetings(id serial PRIMARY KEY,title text NOT NULL,kind text NOT NULL DEFAULT 'meeting',starts_at timestamptz NOT NULL,department text NOT NULL DEFAULT '',location text NOT NULL DEFAULT '',owner text NOT NULL REFERENCES ideafix.users(id),created timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS ideafix.tickets(id serial PRIMARY KEY, author text REFERENCES ideafix.users(id), anonymous boolean NOT NULL DEFAULT false, access_hash text, title text NOT NULL, body text NOT NULL, kind text NOT NULL, department text NOT NULL, priority text NOT NULL, status text NOT NULL DEFAULT 'new', created timestamptz NOT NULL DEFAULT now(), due timestamptz NOT NULL, first_response timestamptz, result text NOT NULL DEFAULT '', controlled boolean NOT NULL DEFAULT false, published boolean NOT NULL DEFAULT false);
CREATE TABLE IF NOT EXISTS ideafix.meeting_agenda(meeting_id integer NOT NULL REFERENCES ideafix.meetings(id) ON DELETE CASCADE,ticket_id integer NOT NULL REFERENCES ideafix.tickets(id) ON DELETE CASCADE,added_by text NOT NULL REFERENCES ideafix.users(id),added timestamptz NOT NULL DEFAULT now(),PRIMARY KEY(meeting_id,ticket_id));
CREATE TABLE IF NOT EXISTS ideafix.events(id serial PRIMARY KEY, ticket integer REFERENCES ideafix.tickets(id), actor text NOT NULL, text text NOT NULL, internal boolean NOT NULL DEFAULT false, created timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS ideafix.votes(ticket integer REFERENCES ideafix.tickets(id), voter text REFERENCES ideafix.users(id), PRIMARY KEY(ticket,voter));
CREATE TABLE IF NOT EXISTS ideafix.settings(id integer PRIMARY KEY DEFAULT 1, data jsonb NOT NULL);
INSERT INTO ideafix.settings(id,data) VALUES(1,'{"high":24,"medium":72,"low":168}') ON CONFLICT DO NOTHING;
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS stage text NOT NULL DEFAULT 'registration';
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS workflow jsonb NOT NULL DEFAULT '{}';
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS entry_type text NOT NULL DEFAULT 'insight';
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS vendor_id text NOT NULL DEFAULT '';
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS industry_id text NOT NULL DEFAULT '';
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS technical_id text NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS ideafix.bitrix_config(id integer PRIMARY KEY CHECK(id=1), webhook text NOT NULL);
CREATE TABLE IF NOT EXISTS ideafix.bitrix_deliveries(ticket integer REFERENCES ideafix.tickets(id), recipient bigint NOT NULL, recipient_name text NOT NULL, status text NOT NULL, task_id bigint, created timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(ticket,recipient));


ALTER TABLE ideafix.bitrix_config ADD COLUMN IF NOT EXISTS pilot_group bigint;
ALTER TABLE ideafix.bitrix_config ADD COLUMN IF NOT EXISTS pilot_recipient bigint;
CREATE TABLE IF NOT EXISTS ideafix.pilot_bitrix_deliveries(ticket integer PRIMARY KEY REFERENCES ideafix.tickets(id),status text NOT NULL,task_id bigint,created timestamptz NOT NULL DEFAULT now());

ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS recipient text REFERENCES ideafix.users(id);

CREATE TABLE IF NOT EXISTS ideafix.leadership_chat(id serial PRIMARY KEY,author text NOT NULL REFERENCES ideafix.users(id),text text NOT NULL,urgent boolean NOT NULL DEFAULT false,created timestamptz NOT NULL DEFAULT now());

CREATE TABLE IF NOT EXISTS ideafix.chat_channels(provider text PRIMARY KEY,enabled boolean NOT NULL DEFAULT false,title text NOT NULL,config jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS ideafix.chat_deliveries(message_id integer NOT NULL REFERENCES ideafix.leadership_chat(id),provider text NOT NULL,status text NOT NULL,remote_id text,created timestamptz NOT NULL DEFAULT now(),PRIMARY KEY(message_id,provider));

CREATE TABLE IF NOT EXISTS ideafix.channel_tests(request_key text PRIMARY KEY,provider text NOT NULL,created timestamptz NOT NULL DEFAULT now());

CREATE TABLE IF NOT EXISTS ideafix.vendor_scopes(vendor_id text PRIMARY KEY,industry_ids jsonb NOT NULL DEFAULT '[]',source text NOT NULL);

CREATE TABLE IF NOT EXISTS ideafix.push_subscriptions(endpoint text PRIMARY KEY,user_id text NOT NULL REFERENCES ideafix.users(id) ON DELETE CASCADE,subscription jsonb NOT NULL,created timestamptz NOT NULL DEFAULT now());

CREATE TABLE IF NOT EXISTS ideafix.planner_tasks(id serial PRIMARY KEY,owner text NOT NULL REFERENCES ideafix.users(id),title text NOT NULL,description text NOT NULL DEFAULT '',planned_for date NOT NULL,due_at timestamptz,status text NOT NULL DEFAULT 'new' CHECK(status IN ('new','work','done')),is_demo boolean NOT NULL DEFAULT false,created timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS planner_tasks_owner_day ON ideafix.planner_tasks(owner,planned_for);
CREATE UNIQUE INDEX IF NOT EXISTS planner_demo_unique ON ideafix.planner_tasks(owner,title,planned_for) WHERE is_demo;
CREATE TABLE IF NOT EXISTS ideafix.planner_bitrix_links(app_user text PRIMARY KEY REFERENCES ideafix.users(id),bitrix_user bigint UNIQUE NOT NULL,bitrix_name text NOT NULL);

ALTER TABLE ideafix.planner_tasks ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'local';
ALTER TABLE ideafix.planner_tasks ADD COLUMN IF NOT EXISTS external_key text;
ALTER TABLE ideafix.planner_tasks ADD COLUMN IF NOT EXISTS work_task boolean NOT NULL DEFAULT false;
ALTER TABLE ideafix.planner_tasks ADD COLUMN IF NOT EXISTS sync_status text NOT NULL DEFAULT 'personal';
ALTER TABLE ideafix.planner_tasks ADD COLUMN IF NOT EXISTS bitrix_task bigint;
ALTER TABLE ideafix.planner_tasks ADD COLUMN IF NOT EXISTS duration_minutes integer NOT NULL DEFAULT 30;
CREATE UNIQUE INDEX IF NOT EXISTS planner_calendar_unique ON ideafix.planner_tasks(owner,external_key) WHERE external_key IS NOT NULL;

CREATE TABLE IF NOT EXISTS ideafix.bitrix_accounts(app_user text PRIMARY KEY REFERENCES ideafix.users(id),webhook text NOT NULL);

ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS offering_id text NOT NULL DEFAULT '';
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS offering_name text NOT NULL DEFAULT '';

CREATE TABLE IF NOT EXISTS ideafix.bitrix_actions(ticket integer NOT NULL REFERENCES ideafix.tickets(id),app_user text NOT NULL REFERENCES ideafix.users(id),action text NOT NULL CHECK(action IN ('discussion','project')),status text NOT NULL,remote_id bigint,PRIMARY KEY(ticket,app_user,action));

ALTER TABLE ideafix.meetings ADD COLUMN IF NOT EXISTS vendor_id text NOT NULL DEFAULT '';
CREATE INDEX IF NOT EXISTS meetings_vendor_time ON ideafix.meetings(vendor_id,starts_at);

ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS first_response_minutes integer NOT NULL DEFAULT 1440;
ALTER TABLE ideafix.tickets ADD COLUMN IF NOT EXISTS first_response_due timestamptz;

CREATE TABLE IF NOT EXISTS ideafix.media_messages (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, sender_id text NOT NULL REFERENCES ideafix.users(id), recipient_id text NOT NULL REFERENCES ideafix.users(id), media_type text NOT NULL CHECK(media_type IN ('audio','video')), media_url text, transcript text NOT NULL DEFAULT '', transcript_status text NOT NULL DEFAULT 'pending' CHECK(transcript_status IN ('pending','ready','failed')), created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS media_messages_recipient_created ON ideafix.media_messages(recipient_id,created_at DESC);

CREATE TABLE IF NOT EXISTS ideafix.ticket_files (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, ticket integer NOT NULL REFERENCES ideafix.tickets(id) ON DELETE CASCADE, filename text NOT NULL, mime text NOT NULL, bytes bytea NOT NULL, summary text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS ticket_files_ticket ON ideafix.ticket_files(ticket);

CREATE TABLE IF NOT EXISTS ideafix.partners (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, company text NOT NULL, contact_name text NOT NULL, contact_email text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS ideafix.partner_outbox (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, ticket integer NOT NULL REFERENCES ideafix.tickets(id), partner bigint NOT NULL REFERENCES ideafix.partners(id), sender text NOT NULL REFERENCES ideafix.users(id), status text NOT NULL DEFAULT 'prepared', created_at timestamptz NOT NULL DEFAULT now());


-- Independent conversations, one selected idea/problem per leadership discussion.
CREATE TABLE IF NOT EXISTS ideafix.discussion_topics (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ticket_id integer NOT NULL REFERENCES ideafix.tickets(id) ON DELETE CASCADE,
  created_by text NOT NULL REFERENCES ideafix.users(id),
  created timestamptz NOT NULL DEFAULT now(),
  closed_at timestamptz,
  closed_by text REFERENCES ideafix.users(id)
);
CREATE INDEX IF NOT EXISTS ideafix_discussion_topics_created ON ideafix.discussion_topics(created DESC);
CREATE TABLE IF NOT EXISTS ideafix.discussion_messages (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  topic_id bigint NOT NULL REFERENCES ideafix.discussion_topics(id) ON DELETE CASCADE,
  author text NOT NULL REFERENCES ideafix.users(id),
  text text NOT NULL CHECK(length(text) BETWEEN 1 AND 3000),
  created timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS ideafix_discussion_messages_order ON ideafix.discussion_messages(topic_id,id);
CREATE TABLE IF NOT EXISTS ideafix.discussion_exports (
  topic_id bigint PRIMARY KEY REFERENCES ideafix.discussion_topics(id) ON DELETE CASCADE,
  filename text NOT NULL,
  bytes bytea NOT NULL,
  message_count integer NOT NULL,
  generated_at timestamptz NOT NULL DEFAULT now()
);
