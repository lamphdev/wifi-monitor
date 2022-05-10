FROM node:16-alpine3.14 as builder

WORKDIR /lib/sourcefe

RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build --prod



FROM nginx:latest AS ngi
COPY --from=builder /lib/sourcefe/dist/wifi-monitor /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf


EXPOSE 80