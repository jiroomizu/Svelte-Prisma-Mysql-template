FROM node:alpine

WORKDIR /home/node/app

COPY ../../app/package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev" ]
