# TW4

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub](https://img.shields.io/badge/GitHub-Brayden--Code--4%2FTW4-black?logo=github)](https://github.com/Brayden-Code-4/TW4)
[![Status](https://img.shields.io/badge/status-deliverable%201-brightgreen)](#)

Public GitHub repository for the TW4Tech technical writing portfolio. This README is the front door to the project: a developer should understand what this repo is, clone it, and start working in under five minutes.

**Repository:** [github.com/Brayden-Code-4/TW4](https://github.com/Brayden-Code-4/TW4)

---

## Overview

**TW4** is the group’s public documentation repository for the [TW4Tech](https://github.com/Brayden-Code-4/TW4) program. We publish developer-facing documentation as Markdown on GitHub.

This repository currently ships **Deliverable 1: README documentation**. Later deliverables (user guides, developer guides, API reference, architecture, technical blog) will be added as Markdown pages. They are not part of this file.

| Item | Detail |
| --- | --- |
| Project | TW4 |
| Audience | Developers onboarding to this repository |
| Format | GitHub Flavored Markdown |
| License | MIT |

---

## Prerequisites

| Tool | Version | Required | Why |
| --- | --- | --- | --- |
| [Git](https://git-scm.com/downloads) | 2.40+ | Yes | Clone the repository |
| A web browser | current | Yes | Read the README on GitHub |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/) | 24+ | No (this deliverable) | Needed later for product Docker guides, not to run this repo today |

Check Git:

```bash
git --version
```

**What you should see:** a version string such as `git version 2.45.0`.

---

## Installation (native)

This repository is documentation, not an application. Native setup means cloning the repo and opening this file.

### 1. Clone the repository

```bash
git clone https://github.com/Brayden-Code-4/TW4.git
cd TW4
```

### 2. Confirm the files

```bash
ls
```

On Windows PowerShell:

```powershell
dir
```

**What you should see:**

- `README.md` — this guide
- `LICENSE` — MIT license text

### 3. Read the README locally (optional)

```bash
code README.md
```

Or open `README.md` in any text editor. On GitHub, the same file renders automatically on the repository home page.

---

## Installation (Docker)

This repository **does not include an application** in Deliverable 1, so there is **no `Dockerfile` and no `docker compose` service to start**.

If you run:

```bash
docker compose up
```

**What you should see:** Docker reports that no compose file exists. That is expected.

Docker installation steps for the **product** we document (image, environment variables, ports, health checks) belong in the User & Installation Guides, not in this README.

---

## Quickstart

```bash
git clone https://github.com/Brayden-Code-4/TW4.git
cd TW4
```

Then open [https://github.com/Brayden-Code-4/TW4](https://github.com/Brayden-Code-4/TW4) in a browser.

**What you should see:** this README rendered on the repository home page, with the title **TW4**, badges, and the sections below.

That is the full loop for Deliverable 1: clone → read → start contributing.

---

## Configuration

There is no runtime server in this deliverable, so there are no required environment variables. Repository settings that matter:

| Name | Description | Required | Default | Example |
| --- | --- | --- | --- | --- |
| Git remote `origin` | GitHub clone URL | Yes | `https://github.com/Brayden-Code-4/TW4.git` | `https://github.com/Brayden-Code-4/TW4.git` |
| Default branch | Branch GitHub shows on the home page | Yes | `main` | `main` |
| Visibility | Repo must be public for the deliverable | Yes | `public` | `public` |
| `LICENSE` | SPDX license applied to this repo | Yes | MIT | MIT |

If you fork the project, change the remote:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/TW4.git
```

---

## Project structure

```text
TW4/
├── README.md    # You are here (Deliverable 1)
└── LICENSE      # MIT License
```

---

## Contributing

Contributions to this README are welcome.

1. Fork [Brayden-Code-4/TW4](https://github.com/Brayden-Code-4/TW4).
2. Create a branch: `git checkout -b docs/readme-fix`.
3. Edit `README.md` in GitHub Flavored Markdown:
   - Keep heading hierarchy (`#`, `##`, `###`).
   - Put commands in syntax-highlighted fenced code blocks.
   - Use tables for tools and configuration.
   - Start numbered steps with an action verb (`Clone`, `Run`, `Open`).
   - Add a **What you should see** checkpoint after commands.
4. Test every copy-paste command in a clean terminal.
5. Open a pull request that explains what changed and why.

Do not add a documentation website, `package.json`, or Docker assets in this deliverable. Those belong to later TW4Tech deliverables.

---

## License

This project is licensed under the [MIT License](LICENSE).
