# IT Agency Platform Blueprint

Production-ready starter blueprint for an IT agency website with:

- `backend/`: Java 21 + Spring Boot 3.3 + JWT security + PostgreSQL + Flyway
- `frontend/`: React 18 + TypeScript + Vite + Tailwind CSS + TanStack Query
- `infra/`: Nginx reverse proxy and static frontend delivery
- `docs/`: architecture tree and database schema notes

## Quick Start

1. Review the architecture in `docs/BLUEPRINT.md`.
2. Update environment secrets in `docker-compose.yml` before production use.
3. Start the stack:

```bash
docker compose up --build
```

## Default Endpoints

- Website: `http://localhost/`
- API: `http://localhost/api`
- Swagger UI: `http://localhost/swagger-ui/index.html`
- Actuator health: `http://localhost/actuator/health`

## Notes

- The backend currently includes production-grade foundations plus implemented auth and portfolio CRUD.
- Lead CRM, ticketing, invoices, and dashboard reporting are represented in the schema and folder blueprint so they can be expanded without reworking the base architecture.
- For HTTPS deployment with Nginx and Let's Encrypt, see `docs/NGINX_SSL.md`.
