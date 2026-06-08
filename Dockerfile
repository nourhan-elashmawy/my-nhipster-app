FROM node:24.16.0-alpine

WORKDIR /usr/node-app

ENV NODE_SERVER_PORT=8080
ENV CYPRESS_INSTALL_BINARY=0

COPY . .

RUN corepack enable && corepack prepare pnpm@10.26.0 --activate
RUN pnpm install --frozen-lockfile
RUN pnpm --filter ./server run build
RUN pnpm --filter ./client run build
RUN pnpm store prune
RUN rm -rf target tmp

EXPOSE 8080

ENTRYPOINT ["/usr/node-app/server/scripts/entrypoint.sh"]