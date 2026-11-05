# Coding Monopoly — Tomorrow School Go questions

This folder contains 108 Go quiz questions from three source files (36 per difficulty).
SQL files: `questions/easy.sql`, `questions/medium.sql`, `questions/hard.sql`.

## Import full game source
GitHub Actions → **Import Coding Monopoly** → **Run workflow**.
The workflow clones https://github.com/Erkebulan-Akhmediya/coding-monopoly and copies the game into this folder, preserving the three custom question SQL files.

## Database and game
After the game source is imported, follow the upstream README and DEPLOY.md.
Run migrations (000001 through 000005) and seed the board. Then load:
```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f questions/easy.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f questions/medium.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f questions/hard.sql
```
Set room topic to `tomorrow_school_easy`, `tomorrow_school_medium`, or `tomorrow_school_hard` to select each bank. All 108 questions are multiple choice.
The original text is in Russian; the English/Kazakh fields currently contain Russian placeholders and need translation before multilingual release.
Do not run the seed command after loading the questions if it clears the database.

## Notes
The SQL files use deterministic UUIDs and delete only their own topic's questions before reloading. They are designed for the PostgreSQL schema in the upstream migrations.
