FROM node:alpine as build-stage
WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

#FINAL IMAGE WITH NECESSARY FILES ONLY
FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install --production

COPY --from=build-stage /usr/app/dist ./dist

RUN apk update \
    && apk upgrade

CMD ["npm", "start"]