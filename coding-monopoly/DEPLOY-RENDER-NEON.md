# Free public deployment: Render + Neon

This project uses **Render Free Web Service** for the Go server, Vue frontend and WebSocket connections, and **Neon Free PostgreSQL** for persistent questions and game data.

## 1. Create a Neon database

1. Visit https://console.neon.tech/ and create a free project.
2. Choose a region close to your players and create a database.
3. Click **Connect**, select the database, and copy its **PostgreSQL connection string** (with `sslmode=require`). Keep this string private. Do not commit it to GitHub.

## 2. Deploy on Render

1. Open https://render.com/deploy?repo=https://github.com/DaniellaDance/Clone-piscine
2. Connect your GitHub account and select the repository.
3. Render reads the root `render.yaml` blueprint: **one Free Docker web service**; no paid Render database.
4. Fill in `DATABASE_URL` with the Neon connection string and set a strong `ADMIN_PASSWORD`.
5. Deploy and wait for the build and startup. The first startup runs PostgreSQL migrations and imports all 108 multilingual questions.
6. Open the resulting `https://<your-service>.onrender.com/` URL on a phone or computer.

## Important

- Render Free sleeps after 15 minutes of inactivity and can take about one minute to wake up. Active WebSocket messages count as traffic.
- Neon Free has usage and storage limits; check current quotas before large classes.
- On a new Neon database the initialization imports 36 easy, 36 medium, and 36 hard questions. Later restarts preserve existing data.
- Never share the database URL, admin password or secret in a chat or commit.
- The game must be tested with multiple players in a live deployed room before class use.
