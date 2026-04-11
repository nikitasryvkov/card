FROM node:20-alpine AS frontend-build
WORKDIR /workspace/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

FROM nginx:1.27-alpine
RUN rm -f /etc/nginx/conf.d/default.conf
COPY infra/nginx/templates /etc/nginx/templates
COPY infra/nginx/docker-entrypoint.d/20-select-config.sh /docker-entrypoint.d/20-select-config.sh
RUN chmod +x /docker-entrypoint.d/20-select-config.sh
COPY --from=frontend-build /workspace/frontend/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
