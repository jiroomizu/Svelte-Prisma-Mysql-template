FROM node:alpine

WORKDIR /home/node/app

COPY ../../app/package*.json ./
COPY ../../app/src ./
COPY ../../app/static ./
COPY ../../app/.env ./
COPY ../../app/svelte.config.js ./
COPY ../../app/vite.config.js ./

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview" ]
