FROM node:20-alpine AS frontend-build
WORKDIR /workspace/frontend
COPY frontend/package*.json ./
RUN npm ci --no-audit --no-fund
COPY frontend ./
RUN npm run build

FROM nginx:1.27-alpine
RUN apk add --no-cache wget
RUN rm -f /etc/nginx/conf.d/default.conf
COPY infra/nginx/templates /opt/nginx/templates
COPY infra/nginx/docker-entrypoint.d/20-select-config.sh /docker-entrypoint.d/20-select-config.sh
RUN chmod +x /docker-entrypoint.d/20-select-config.sh
COPY --from=frontend-build /workspace/frontend/dist /usr/share/nginx/html
EXPOSE 8080
EXPOSE 8443
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=5 CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null 2>&1 || exit 1
