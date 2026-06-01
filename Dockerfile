FROM node:22.14.0-alpine

# Create app directory

WORKDIR /usr/node-app

ENV NODE_SERVER_PORT=8080
ENV CYPRESS_INSTALL_BINARY=0

COPY . .

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm --filter ./server run build
RUN pnpm --filter ./client run build
RUN pnpm store prune
RUN rm -rf target tmp

EXPOSE 8080

ENTRYPOINT ["/usr/node-app/server/scripts/entrypoint.sh" ]
