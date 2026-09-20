# TW4

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen?logo=node.js)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)](https://www.docker.com/)
[![Status](https://img.shields.io/badge/status-stable-success)](https://github.com/Brayden-Code-4/TW4)

**TW4** is a lightweight REST API for tracking documentation tasks. Clone it, start it natively or with Docker, and create your first task in under five minutes.

**Repository:** [github.com/Brayden-Code-4/TW4](https://github.com/Brayden-Code-4/TW4)

---

## Overview

TW4 stores writing work as JSON tasks (`todo`, `doing`, `done`) behind a small HTTP API. It is built for developers who want a local, no-database tracker they can script with `curl`.

| | |
| --- | --- |
| **What it does** | CRUD API for documentation tasks |
| **Who it is for** | Developers and technical writers automating a writing backlog |
| **Runtime** | Node.js 20+ (zero npm dependencies) |
| **Data** | JSON file on disk (`data/tasks.json`) |
| **Auth** | `X-API-Key` header on create, update, and delete |

Core routes:

| Method | Path | Auth |
| --- | --- | --- |
| `GET` | `/health` | No |
| `GET` | `/api/v1/tasks` | No |
| `GET` | `/api/v1/tasks/:id` | No |
| `POST` | `/api/v1/tasks` | Yes |
| `PATCH` | `/api/v1/tasks/:id` | Yes |
| `DELETE` | `/api/v1/tasks/:id` | Yes |

---

## Prerequisites

| Tool | Version | Required | Native | Docker | Why |
| --- | --- | --- | --- | --- | --- |
| [Git](https://git-scm.com/downloads) | 2.40+ | Yes | Yes | Yes | Clone the repository |
| [Node.js](https://nodejs.org/) | **20.0 or later** | Native path | Yes | No | Run the API on the host |
| npm | 10+ (ships with Node.js) | Native path | Yes | No | Run `npm start` |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | 24+ | Docker path | No | Yes | Build and run the container |
| Docker Compose | v2 (ships with Docker Desktop) | Docker path | No | Yes | `docker compose up` |
| curl | any | Recommended | Yes | Yes | Quickstart requests (Windows 10+ includes `curl`) |

Check versions:

```bash
git --version
node -v
npm -v
docker --version
docker compose version
```

**What you should see:** Node prints `v20` or higher, for example `v20.19.0` or `v24.15.0`. Skip the Docker commands if you follow the native path.

---

## Installation (native)

Use this path to run TW4 on your machine with Node.js.

### 1. Clone the repository

```bash
git clone https://github.com/Brayden-Code-4/TW4.git
cd TW4
```

### 2. Create the environment file

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Open `.env` and set `API_KEY` to a secret you will send as `X-API-Key`. Leave `PORT=3000` unless that port is already taken.

### 3. Install and start

```bash
npm install
npm start
```

`npm install` completes with no extra packages. TW4 has zero runtime dependencies.

**What you should see:**

```text
[2026-09-20T17:00:00.000Z] INFO TW4 API listening on http://0.0.0.0:3000
```

Leave this terminal open. The API stays up until you press `Ctrl+C`.

### 4. Verify the process

In a second terminal:

```bash
curl http://127.0.0.1:3000/health
```

**What you should see:**

```json
{"status":"ok","service":"tw4","environment":"development","uptime_seconds":1}
```

---

## Installation (Docker)

Use this path for a clean, reproducible environment. You do not need Node.js on the host.

### 1. Clone the repository

```bash
git clone https://github.com/Brayden-Code-4/TW4.git
cd TW4
```

### 2. Create the environment file

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Set `API_KEY` in `.env`. Compose reads this file for `API_KEY`, `PORT`, and `LOG_LEVEL`.

### 3. Build and start

```bash
docker compose up --build
```

| Setting | Value |
| --- | --- |
| Image | `tw4-api:1.0.0` |
| Port mapping | `${PORT:-3000}:3000` |
| Volume | named volume `tw4_data` → `/app/data` |
| Health check | `GET /health` every 30s via `node src/healthcheck.js` |

**What you should see:** Docker builds the image, then logs `TW4 API listening on http://0.0.0.0:3000`.

### 4. Verify the container

```bash
curl http://127.0.0.1:3000/health
docker compose ps
```

**What you should see:** the same JSON health payload as the native path, and `tw4-api` listed as running / healthy.

One-shot `docker run` (after a local build):

```bash
docker build -t tw4-api:1.0.0 .
docker run --rm -p 3000:3000 -e API_KEY=change-me-now --name tw4-api tw4-api:1.0.0
```

Stop Compose with `Ctrl+C`, then:

```bash
docker compose down
```

---

## Quickstart

These commands assume TW4 is already running on port 3000 (native `npm start` or `docker compose up`). Replace `change-me-now` with the `API_KEY` from your `.env`.

### 1. Confirm the API is up

```bash
curl http://127.0.0.1:3000/health
```

**What you should see:** `"status":"ok"`.

### 2. Create a task

Git Bash, macOS, or Linux:

```bash
curl -s -X POST http://127.0.0.1:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "X-API-Key: change-me-now" \
  --data-binary '{"title":"Write the architecture overview","status":"todo"}'
```

Windows PowerShell:

```powershell
$body = @{ title = "Write the architecture overview"; status = "todo" } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:3000/api/v1/tasks -ContentType "application/json" -Headers @{ "X-API-Key" = "change-me-now" } -Body $body
```

**What you should see:** HTTP 201 and a JSON object with an `id`, `"title":"Write the architecture overview"`, and `"status":"todo"`. Copy the `id` for the next calls.

### 3. List tasks

```bash
curl http://127.0.0.1:3000/api/v1/tasks
```

**What you should see:** `"count": 1` (or more) and your task in `data`.

### 4. Filter, update, and delete

```bash
curl "http://127.0.0.1:3000/api/v1/tasks?status=todo"

curl -X PATCH http://127.0.0.1:3000/api/v1/tasks/<TASK_ID> \
  -H "Content-Type: application/json" \
  -H "X-API-Key: change-me-now" \
  -d "{\"status\":\"doing\"}"

curl -X DELETE http://127.0.0.1:3000/api/v1/tasks/<TASK_ID> \
  -H "X-API-Key: change-me-now"
```

**What you should see:** the filter returns only `todo` items; PATCH returns `"status":"doing"`; DELETE returns `"deleted": true`.

---

## Configuration

Copy `.env.example` to `.env`. Native `npm start` loads `.env` automatically. Compose injects selected values into the container.

| Name | Description | Required | Default | Example |
| --- | --- | --- | --- | --- |
| `HOST` | Address the HTTP server binds to. Use `0.0.0.0` in Docker so the host can reach the container. | No | `0.0.0.0` | `0.0.0.0` |
| `PORT` | Host and container port for the API | No | `3000` | `3000` |
| `API_KEY` | Shared secret sent as `X-API-Key` on POST, PATCH, PUT, and DELETE | Yes (writes) | `change-me-now` | `n7f8-your-secret` |
| `DATA_FILE` | Path to the JSON task store | No | `./data/tasks.json` | `/app/data/tasks.json` |
| `LOG_LEVEL` | `error`, `warn`, `info`, or `debug` | No | `info` | `debug` |
| `NODE_ENV` | `development` or `production` | No | `development` | `production` |

Writes without a valid `X-API-Key` return `401`. If `API_KEY` is empty, writes return `500` with `server_misconfigured`.

---

## Project structure

```text
TW4/
├── README.md
├── LICENSE
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
├── data/                 # JSON store (created at runtime)
└── src/
    ├── server.js         # HTTP API
    └── healthcheck.js    # Docker HEALTHCHECK
```

---

## Contributing

1. Fork [Brayden-Code-4/TW4](https://github.com/Brayden-Code-4/TW4) and clone your fork.
2. Create a branch: `git checkout -b feat/short-description`.
3. Copy `.env.example` to `.env`, run `npm start`, and hit `/health`.
4. Keep the API JSON-only, preserve existing status codes, and avoid new runtime dependencies unless the change needs them.
5. Open a pull request that states the behavior change and how you tested it (`curl` output is enough).

Report bugs in [GitHub Issues](https://github.com/Brayden-Code-4/TW4/issues) with the request you sent, the status code, and the response body.

---

## License

This project is licensed under the [MIT License](LICENSE).
