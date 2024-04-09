FROM node:16-alpine
# FROM node:16-alpine as builder

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node ./package.json .

RUN npm install

COPY --chown=node:node . .

RUN npm run build



FROM nginx:alpine

COPY --from=0 /home/node/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
