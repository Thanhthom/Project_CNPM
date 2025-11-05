# Frontend (movie-ticket-fe) — development with Docker

If your local npm is failing due to malformed package.json files elsewhere on the filesystem, you can run the frontend app inside Docker which isolates the environment and avoids the host npm workspace scanning.

Prerequisites
- Docker Desktop (or Docker Engine) installed and running on your machine.

Quick start (from PowerShell)

```powershell
cd 'H:\Công nghệ phần mềm\Project\SE2025-1.1\Frontend\movie-ticket-fe'

# Build and start dev service (maps port 5173)
docker compose up --build
```

Open http://localhost:5173 in your browser. The container runs `npm run dev -- --host 0.0.0.0` so Vite accepts external connections.

Notes
- The source directory is mounted into the container so edits are reflected live.
- If you prefer not to use Docker, you'll need to fix any invalid `package.json` files on the host (see the project root or higher-level folders). If you want, run the PowerShell search I gave earlier and paste the results here and I will prepare fixes.
