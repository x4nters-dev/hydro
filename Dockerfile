FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

COPY .env.production .env
RUN npm run db:migrate

EXPOSE 3000

CMD ["node", "--env-file=.env", "build"]