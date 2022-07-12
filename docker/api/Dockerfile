FROM node:alpine

WORKDIR /home/node/api

COPY ../../api/package*.json ./

RUN npm install

EXPOSE 4021
EXPOSE 5555

CMD ["npm", "run", "dev" ]
