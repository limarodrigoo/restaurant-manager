FROM node:20.16.0-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=./src/prisma/schema

RUN npm run build

FROM node:20.16.0-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/dist ./dist

COPY ./src/prisma ./dist/prisma

RUN npx prisma generate --schema=./dist/prisma/schema

CMD [ "npm", "run", "start:prod" ]