FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
COPY .env.production .env

RUN npm run build

EXPOSE 3000

CMD ["node", "--env-file=.env", "build"]