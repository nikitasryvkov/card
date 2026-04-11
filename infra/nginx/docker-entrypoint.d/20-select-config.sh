#!/bin/sh
set -eu

if [ -n "${DOMAIN:-}" ]; then
    export NGINX_PRIMARY_DOMAIN="${DOMAIN}"
    export NGINX_SERVER_NAME="${DOMAIN}"
else
    export NGINX_PRIMARY_DOMAIN="localhost"
    export NGINX_SERVER_NAME="_"
fi

HTTP_TEMPLATE="/opt/nginx/templates/http.conf.template"
HTTPS_TEMPLATE="/opt/nginx/templates/https.conf.template"
TARGET_CONFIG="/etc/nginx/conf.d/default.conf"

if [ -f "/etc/letsencrypt/live/${NGINX_PRIMARY_DOMAIN}/fullchain.pem" ] && [ -f "/etc/letsencrypt/live/${NGINX_PRIMARY_DOMAIN}/privkey.pem" ]; then
    envsubst '${NGINX_PRIMARY_DOMAIN} ${NGINX_SERVER_NAME}' < "${HTTPS_TEMPLATE}" > "${TARGET_CONFIG}"
    echo "Using HTTPS Nginx config for ${NGINX_PRIMARY_DOMAIN}"
else
    envsubst '${NGINX_PRIMARY_DOMAIN} ${NGINX_SERVER_NAME}' < "${HTTP_TEMPLATE}" > "${TARGET_CONFIG}"
    echo "Using HTTP-only Nginx config"
fi
