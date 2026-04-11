# IT Agency Platform Blueprint

Production-ready starter blueprint for an IT agency website with:

- `backend/`: Java 21 + Spring Boot 3.3 + JWT security + PostgreSQL + Flyway
- `frontend/`: React 18 + TypeScript + Vite + Tailwind CSS + TanStack Query
- `infra/`: Nginx reverse proxy and static frontend delivery
- `docs/`: architecture tree and database schema notes

## Quick Start

1. Review the architecture in `docs/BLUEPRINT.md`.
2. Copy `.env.example` and fill in real secrets before any local or production run.
3. Start the stack:

```bash
cp .env.example .env
docker compose --env-file .env up --build
```

## Default Endpoints

- Website: `http://localhost/`
- API: `http://localhost/api`
- Readiness probe through Nginx: `http://localhost/healthz`
- Swagger UI: disabled by default, enable with `APP_DOCS_ENABLED=true`

## Notes

- The backend now uses an `HttpOnly` auth cookie plus CSRF protection for browser sessions.
- PostgreSQL is no longer published on a public host port; only Nginx is exposed by default.
- Swagger and most actuator endpoints are disabled or admin-restricted by default for safer production posture.
- The backend currently includes production-grade foundations plus implemented auth and portfolio CRUD.
- Lead CRM, ticketing, invoices, and dashboard reporting are represented in the schema and folder blueprint so they can be expanded without reworking the base architecture.
- For HTTPS deployment with Nginx and Let's Encrypt, see `docs/NGINX_SSL.md`.
