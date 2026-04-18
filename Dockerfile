# Build stage
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Set default port for local/preview environment
ENV PORT=3000

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 3000

# Using nginx-alpine's built-in envsubst support in /etc/nginx/templates/
CMD ["nginx", "-g", "daemon off;"]
