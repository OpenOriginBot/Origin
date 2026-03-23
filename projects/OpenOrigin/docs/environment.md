# Environment Setup

## Files

- `apps/web/.env.example` — frontend template
- `apps/web/.env.local` — frontend local secrets / local overrides
- `apps/api/.env.example` — backend template
- `apps/api/.env` — backend local secrets

Do not commit real secrets.

## Frontend variables

```env
VITE_APP_NAME=OpenOrigin
VITE_APP_ENV=development
VITE_APP_URL=http://127.0.0.1:8800
VITE_API_BASE_URL=http://127.0.0.1:8801
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Notes:
- `VITE_*` variables are exposed to the browser.
- Never place server-only secrets in frontend env files.

## Backend variables

```env
APP_NAME=OpenOrigin API
APP_ENV=development
APP_DEBUG=true
API_V1_PREFIX=/api/v1
APP_URL=http://127.0.0.1:8801
WEB_URL=http://127.0.0.1:8800
DATABASE_URL=
SUPABASE_PROJECT_REF=
SUPABASE_DB_URL=
SUPABASE_SCHEMA=public
CORS_ORIGINS=["http://127.0.0.1:8800"]
GITHUB_REPO=OpenOriginBot/Origin
GITHUB_TOKEN=
VERCEL_TOKEN=
```

Notes:
- Put real database and deployment tokens only in `apps/api/.env` or your deployment platform secret manager.
- `GITHUB_TOKEN` and `VERCEL_TOKEN` should be treated as compromised if they were pasted into chat; rotate them before use.

## Suggested local setup

### apps/web/.env.local

```env
VITE_APP_NAME=OpenOrigin
VITE_APP_ENV=development
VITE_APP_URL=http://127.0.0.1:8800
VITE_API_BASE_URL=http://127.0.0.1:8801
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### apps/api/.env

```env
APP_NAME=OpenOrigin API
APP_ENV=development
APP_DEBUG=true
API_V1_PREFIX=/api/v1
APP_URL=http://127.0.0.1:8801
WEB_URL=http://127.0.0.1:8800
DATABASE_URL=
SUPABASE_PROJECT_REF=
SUPABASE_DB_URL=
SUPABASE_SCHEMA=public
CORS_ORIGINS=["http://127.0.0.1:8800"]
GITHUB_REPO=OpenOriginBot/Origin
GITHUB_TOKEN=
VERCEL_TOKEN=
```

## Vercel deployment

Set these in Vercel project environment variables instead of committing them:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- any backend runtime variables if API is deployed separately

## GitHub / Vercel / Supabase

- GitHub token: server-side only
- Vercel token: local CLI / server-side only
- Supabase anon key: frontend allowed
- Supabase service-role key: server-side only, never expose to browser
