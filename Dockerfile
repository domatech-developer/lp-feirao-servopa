# Make sure it uses up to date node js version
FROM node:23-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else npm install; \
  fi

FROM base AS builder
ARG ENVIRONMENT
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY .env.$ENVIRONMENT .env.local

# Uncomment if you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PRIVATE_STANDALONE=true

RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  elif [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  else npm run build; \
  fi

FROM base AS runner
ARG ENVIRONMENT
WORKDIR /app

ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Writable cache dir
ENV NEXT_CACHE_DIR=/tmp/next-cache
RUN mkdir -p /app/.next/cache/images /tmp/next-cache/images \
 && chown -R nextjs:nodejs /app/.next /tmp/next-cache \
 && chmod -R u+rwX,g+rwX /app/.next /tmp/next-cache

USER nextjs

# Porta interna fixa do container
ENV PORT=3100
EXPOSE 3100

ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]