#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

# Validação de sistema operacional
OS_NAME="$(uname -s)"

case "$OS_NAME" in
  Linux*)
    if grep -qi microsoft /proc/version 2>/dev/null; then
      echo "Ambiente: Linux (WSL)"
    else
      echo "Ambiente: Linux"
    fi
    ;;
  Darwin*)
    echo "Ambiente: macOS"
    ;;
  MINGW*|MSYS*|CYGWIN*)
    echo "Ambiente: Windows (Git Bash)"
    ;;
  *)
    echo "ERRO: sistema operacional não suportado: $OS_NAME"
    exit 1
    ;;
esac

# Garante que está em um repositório git
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Erro: este script deve ser executado dentro de um repositório Git"
  exit 1
fi

# Captura a branch atual
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Sanitiza a branch (troca / por -)
TAG=${CURRENT_BRANCH//\//-}

# Se a branch for main, força a tag para latest
if [ "$TAG" == "main" ]; then
  TAG="latest"
fi

# Define ambiente baseado na branch
if [ "$CURRENT_BRANCH" == "main" ]; then
  ENVIRONMENT="production"
elif [ "$CURRENT_BRANCH" == "develop" ]; then
  ENVIRONMENT="develop"
else
  echo "ERRO: build Docker não permitido para a branch '$CURRENT_BRANCH'"
  echo "Branches permitidas: main, develop"
  echo "Execução local não deve gerar imagem Docker."
  exit 1
fi

ENV_FILE=".env.$ENVIRONMENT"

if [ ! -f "$ENV_FILE" ]; then
  echo "ERRO: arquivo de ambiente não encontrado: $ENV_FILE"
  echo "Branch atual: $CURRENT_BRANCH"
  echo "Ambiente resolvido: $ENVIRONMENT"
  echo "Build abortado."
  exit 1
fi

echo "Ambiente detectado para build: $ENVIRONMENT"

REPO_NAME="$(basename "$(git rev-parse --show-toplevel)")"

echo "Repositorio identificado: $REPO_NAME"
echo "Branch ativa detectada: $CURRENT_BRANCH"
echo "Construindo imagem para a tag: $TAG"

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --build-arg ENVIRONMENT=$ENVIRONMENT \
  --no-cache \
  -t ghcr.io/domatech-developer/$REPO_NAME:$TAG \
  --push .