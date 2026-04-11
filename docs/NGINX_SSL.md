# Nginx SSL Deployment

This project now supports a two-stage Nginx setup:

- first start: HTTP-only mode on port 80 for ACME validation
- after certificate issuance: automatic HTTPS config on port 443

## Files

- `docker-compose.yml`: base stack
- `docker-compose.prod.yml`: production overlay with domain and Let's Encrypt volumes
- `.env.example`: local environment template
- `.env.prod.example`: production environment template
- `infra/nginx/templates/http.conf.template`: bootstrap HTTP config
- `infra/nginx/templates/https.conf.template`: HTTPS config
- `infra/nginx/docker-entrypoint.d/20-select-config.sh`: chooses the active config based on whether a certificate exists

## 1. Prepare DNS

Point these DNS records to your server IP:

- `@` -> server IPv4

## 2. Prepare production env

Create a real env file from the template:

```bash
cp .env.prod.example .env.prod
```

Fill in:

- `DOMAIN`
- `LETSENCRYPT_EMAIL`
- `POSTGRES_PASSWORD`
- `APP_JWT_SECRET`

## 3. First start

Start the stack in bootstrap mode:

```bash
docker compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

At this stage Nginx serves HTTP on port 80, exposes `/.well-known/acme-challenge/`, and keeps the app behind the reverse proxy only.

## 4. Issue the certificate

Run Certbot:

```bash
docker compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml run --rm certbot \
  certonly --webroot -w /var/www/certbot \
  -d ${DOMAIN} \
  --email ${LETSENCRYPT_EMAIL} \
  --agree-tos --no-eff-email
```

## 5. Reload Nginx into HTTPS mode

Restart only the Nginx container:

```bash
docker compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml restart nginx
```

After restart, the entrypoint script detects the certificate and enables HTTPS on port 443.

## 6. Renew certificates

Recommended host cron entry:

```bash
0 3 * * * cd /opt/it-agency && docker compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml run --rm certbot renew --webroot -w /var/www/certbot --quiet && docker compose --env-file .env.prod -f docker-compose.yml -f docker-compose.prod.yml restart nginx
```

## Notes

- Port 80 must remain reachable from the internet for Let's Encrypt validation.
- Port 443 must remain reachable for the final HTTPS endpoint.
- PostgreSQL is kept on the internal Docker network and is not published publicly.
- Swagger/OpenAPI are disabled by default in production unless `APP_DOCS_ENABLED=true`.
- Public health checks should go through `https://<domain>/healthz`, not directly to internal actuator routes.
