#!/bin/sh
set -eu
: "${DATABASE_URL:?DATABASE_URL is required}"
echo "Preparing Coding Monopoly database..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -c 'CREATE TABLE IF NOT EXISTS app_schema_migrations (version text PRIMARY KEY);'
for file in /app/migrations/*.up.sql; do
  version=$(basename "$file" .up.sql)
  applied=$(psql "$DATABASE_URL" -At -v ON_ERROR_STOP=1 -c "SELECT count(*) FROM app_schema_migrations WHERE version='$version'")
  if [ "$applied" = "0" ]; then
    echo "Applying migration $version"
    psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -1 -f "$file" -c "INSERT INTO app_schema_migrations(version) VALUES ('$version')"
  fi
done
for level in easy medium hard; do
  echo "Loading $level questions"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "/app/questions/$level.sql"
done
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -c "SELECT difficulty, count(*) FROM problems WHERE topic LIKE 'tomorrow_school_%' GROUP BY difficulty ORDER BY difficulty;"
