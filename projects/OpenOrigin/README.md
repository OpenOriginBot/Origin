# OpenOrigin

OpenOrigin is a client-work operating system scaffold.

## Stack

- Frontend: Vite + React + TypeScript + Tailwind CSS + shadcn/ui + Zustand + TanStack Query + Lucide React
- Backend: FastAPI + SQLAlchemy 2.0 + Pydantic v2
- Database: Supabase PostgreSQL
- Deployment: Vercel

## Structure

- `apps/web` — frontend application
- `apps/api` — backend API service
- `docs` — project documentation

## Conventions

- Do not use emoji in product UI or copy
- Use Lucide for icons
- Keep frontend and backend typed end-to-end where practical

## Quick start

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

### Backend

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Environment

Copy the example env files before running:

- `apps/web/.env.example` -> `apps/web/.env`
- `apps/api/.env.example` -> `apps/api/.env`
