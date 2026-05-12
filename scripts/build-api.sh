#!/bin/bash

BASE_URL="https://api.grupojobs.com.br/build"
API_KEY="%6!Dbge59k!1jc"

echo "🔍 Iniciando verificação de ambiente..."

REPO_URL=$(git config --get remote.origin.url)
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

TAG_TO_SEND=""
ENV_FILE=""

case "$CURRENT_BRANCH" in
  "main")
    TAG_TO_SEND="latest"
    ENV_FILE=".env.production"
    ;;
  "develop")
    TAG_TO_SEND="develop"
    ENV_FILE=".env.develop"
    ;;
  *)
    echo "❌ ERRO: Build não permitido na branch '$CURRENT_BRANCH'."
    exit 1
    ;;
esac

if [ ! -f "$ENV_FILE" ]; then
    echo "⚠️  AVISO: $ENV_FILE não encontrado. O build seguirá sem injeção de ENV."
    ENV_DATA=""
else
    echo "🔐 Lendo: $ENV_FILE"
    ENV_DATA=$(cat "$ENV_FILE" | sed 's/"/\\"/g' | awk '{printf "%s\\n", $0}')
fi

echo "🚀 Enviando solicitação para o VPS..."
echo "   Repo: $REPO_URL | Tag: $TAG_TO_SEND"
echo "---------------------------------------------------"

curl -X POST "$BASE_URL" \
    -H "Content-Type: application/json" \
    -H "x-api-key: $API_KEY" \
    -d "{
      \"repo\": \"$REPO_URL\",
      \"tag\": \"$TAG_TO_SEND\",
      \"env_content\": \"$ENV_DATA\"
    }" \
    --no-buffer