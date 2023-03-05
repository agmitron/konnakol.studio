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
 
FROM nginx:alpine AS server
WORKDIR /app
 
# TODO Don't run production as root
RUN addgroup --system --gid 1001 konnakol.studio
RUN adduser --system --uid 1001 editor
USER editor
 
COPY --from=builder /app/apps/client/editor/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]