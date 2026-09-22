# TW4

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen?logo=node.js)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker)](https://www.docker.com/)

TW4 is a small REST API for documentation tasks (`todo`, `doing`, `done`). This README explain how to get it running on your machine in a few minutes, with Node or Docker.

Repo: [github.com/Brayden-Code-4/TW4](https://github.com/Brayden-Code-4/TW4)

## Overview

Nothing fancy: no database, no extra packages. Tasks are saved in `data/tasks.json`. You can script it with `curl`. Writes need an `X-API-Key` header.

| | |
| --- | --- |
| Runtime | Node.js 20+ |
| Data | JSON file |
| Auth | `X-API-Key` on POST / PATCH / DELETE |

| Method | Path | Auth |
| --- | --- | --- |
| `GET` | `/health` | No |
| `GET` | `/api/v1/tasks` | No |
| `GET` | `/api/v1/tasks/:id` | No |
| `POST` | `/api/v1/tasks` | Yes |
| `PATCH` | `/api/v1/tasks/:id` | Yes |
| `DELETE` | `/api/v1/tasks/:id` | Yes |

## Prerequisites

| Tool | Version | Native | Docker |
| --- | --- | --- | --- |
| [Git](https://git-scm.com/downloads) | 2.40+ | Yes | Yes |
| [Node.js](https://nodejs.org/) | 20+ | Yes | No |
| npm | 10+ (comes with Node) | Yes | No |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | 24+ | No | Yes |
| Docker Compose | v2 | No | Yes |

```bash
git --version
node -v
npm -v
```

You want Node `v20` or higher. Skip the Docker checks if you run it natively.

## Installation (native)

### 1. Clone

```bash
git clone https://github.com/Brayden-Code-4/TW4.git
cd TW4
```

### 2. Env file

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

Put your own value in `API_KEY`. Keep `PORT=3000` unless that port is already taken.

### 3. Start

```bash
npm install
npm start
```

`npm install` is basically a no-op here, there are no extra packages to download.

If it started, the terminal prints something like:

```text
INFO TW4 API listening on http://0.0.0.0:3000
```

Leave this terminal open, the API stay up until you press `Ctrl+C`.

### 4. Check

Other terminal:

```bash
curl http://127.0.0.1:3000/health
```

You should get JSON with `"status":"ok"`.

## Installation (Docker)

Same clone + `.env` as above. You don't need Node on the host for this way.

```bash
docker compose up --build
```

| Setting | Value |
| --- | --- |
| Image | `tw4-api:1.0.0` |
| Ports | `3000:3000` |
| Volume | `tw4_data` → `/app/data` |
| Healthcheck | `GET /health` |

Then:

```bash
curl http://127.0.0.1:3000/health
docker compose ps
```

Without Compose:

```bash
docker build -t tw4-api:1.0.0 .
docker run --rm -p 3000:3000 -e API_KEY=change-me-now --name tw4-api tw4-api:1.0.0
```

Stop with `Ctrl+C`, then `docker compose down`.

## Quickstart

API already running on port 3000. Replace `change-me-now` by the `API_KEY` from your `.env`.

```bash
curl http://127.0.0.1:3000/health
```

Git Bash / Linux / macOS:

```bash
curl -s -X POST http://127.0.0.1:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "X-API-Key: change-me-now" \
  --data-binary '{"title":"Write the architecture overview","status":"todo"}'
```

PowerShell:

```powershell
$body = @{ title = "Write the architecture overview"; status = "todo" } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:3000/api/v1/tasks -ContentType "application/json" -Headers @{ "X-API-Key" = "change-me-now" } -Body $body
```

A `201` response means it worked. Copy the `id`, then:

```bash
curl http://127.0.0.1:3000/api/v1/tasks

curl "http://127.0.0.1:3000/api/v1/tasks?status=todo"

curl -X PATCH http://127.0.0.1:3000/api/v1/tasks/<TASK_ID> \
  -H "Content-Type: application/json" \
  -H "X-API-Key: change-me-now" \
  --data-binary '{"status":"doing"}'

curl -X DELETE http://127.0.0.1:3000/api/v1/tasks/<TASK_ID> \
  -H "X-API-Key: change-me-now"
```

## Configuration

Copy `.env.example` → `.env`. `npm start` reads it. Compose uses `API_KEY`, `PORT` and `LOG_LEVEL`.

| Name | Description | Required | Default | Example |
| --- | --- | --- | --- | --- |
| `HOST` | Bind address. Keep `0.0.0.0` in Docker. | No | `0.0.0.0` | `0.0.0.0` |
| `PORT` | API port | No | `3000` | `3000` |
| `API_KEY` | Sent as `X-API-Key` for writes | Yes (writes) | `change-me-now` | `n7f8-your-secret` |
| `DATA_FILE` | JSON store path | No | `./data/tasks.json` | `/app/data/tasks.json` |
| `LOG_LEVEL` | `error`, `warn`, `info`, `debug` | No | `info` | `debug` |
| `NODE_ENV` | `development` or `production` | No | `development` | `production` |

Bad or missing key → `401`. Empty `API_KEY` in env → `500`.

## Layout

```text
TW4/
├── README.md
├── LICENSE
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
├── data/
└── src/
    ├── server.js
    └── healthcheck.js
```

## Contributing

Fork, branch (`git checkout -b feat/whatever`), copy `.env`, run `npm start`, hit `/health`. Keep responses as JSON and don't add packages unless you really need it.

Open a pull request that says what you changed. If something don't work, open an issue with the request, the status code and the body.

## License

[MIT](LICENSE)
