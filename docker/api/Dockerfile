FROM node:alpine

WORKDIR /home/node/api

COPY ../../api/package*.json ./
COPY ../../api/prisma ./
COPY ../../api/src ./
COPY ../../api/.env ./

RUN npm install

EXPOSE 4021
EXPOSE 5555

RUN npx prisma migrate dev

# uncomment this to seed some sample data
RUN npx prisma db seed

RUN npx prisma generate

CMD ["npm", "run", "start" ]
