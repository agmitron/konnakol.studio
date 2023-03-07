FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm i -g turbo
RUN npm i -g pnpm
COPY . .
# TODO: figure out how to increase install speed
# RUN turbo prune --scope=editor --docker
 
RUN pnpm install
 
# Build the project
# TODO: figure out how to increase build speed
RUN turbo run build --filter=editor...
 
FROM alpine as STORAGE

COPY --from=builder /app/apps/client/editor/build /app
VOLUME /app
