# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Fix permissions for OpenShift (non-root random UID)
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx \
    && chmod -R 777 /var/cache/nginx /var/run /var/log/nginx

# Change NGINX to listen on port 8080
RUN sed -i 's/listen\s\+80;/listen 8080;/' /etc/nginx/conf.d/default.conf

EXPOSE 8080


CMD ["nginx", "-g", "daemon off;"]
