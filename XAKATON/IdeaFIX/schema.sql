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
