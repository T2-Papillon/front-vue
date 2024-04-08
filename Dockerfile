# # vue npm build
# FROM node:20.11.0-alpine as build

# build stage
FROM node:20.11.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]

