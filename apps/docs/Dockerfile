FROM node:24-alpine AS base
ENV TURBO_TELEMETRY_DISABLED=1
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS pruner
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN pnpm dlx turbo prune "@workspace/docs" --docker

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/full/ .
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build

FROM nginx:stable-alpine AS runner
COPY --from=builder /app/apps/docs/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/docs/.output/public /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
