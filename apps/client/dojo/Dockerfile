FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
# RUN turbo prune --scope=dojo --docker
 
# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/apps/client/dojo/package.json .
# COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install
 
# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=dojo...
 
FROM nginx:alpine AS server
WORKDIR /app
 
# # TODO Don't run production as root
# RUN addgroup --system --gid 1001 konnakol.studio
# RUN adduser --system --uid 1001 dojo
# USER dojo
 
COPY --from=builder /app/apps/client/dojo/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]