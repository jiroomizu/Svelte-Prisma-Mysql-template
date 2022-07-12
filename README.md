# A template with Svelte-Kit, GrapQL API/Prisma, MySQL, and TypeScript

A simple stack template for the use of single page portfolio website which is made with Svelte-Kit, node.js, GraphQL Yoga, Prisma, and MySQL.

This repo is consisted from three instances, front-end app, GraphQL api server, and MySQL server, and is intended to show how to connect these services.

Each instances can be run as docker container, especially MySQL server is relying on it and almost no need to touch it because Prisma CLI / Prisma Studio and GraphiQL Yoga UI help us.

## prerequisite

- node.js or alternatives
- git
- Docker Desktop

## How to start

- Clone this repo, copy `/api/.env.example`, `/app/.env.example`, `/db/.env.example`, as `.env` in each directory, then edit them accordingly.  
  You can ignore VITE_ACCESS_TOKEN, it is not required in development mode.
- Then run the command below.

```bash
docker compose build
docker compose up -d
docker exec -it api npx prisma migrate dev
```

- Wait for some seconds, then restart the api server.

```bash
docker container restart api
```

- now you can access http://localhost:3000 (if you didn't change it in .env.)

## Development

### app

Svelte is easy to start, easy to maintain, and lightweight in many cases. And Svelte-Kit is also great to develop webapps.

In here, I just made one simple GraphQL query to fill the contents from DB, but it shows how to deal with many to many relations query and mutation. Check `posts.resolver.ts` in api.

Svelte https://svelte.dev/

Svelte-Kit https://kit.svelte.dev/

Vite https://vitejs.dev/

### api

Api container using GraphQL Yoga and Prisma.  
GraphQL queries can be tested in GraphiQL UI in `http://localhost:4021/api`.

Prisma Studio can be started with command `npm prisma studio`, but you need run it in container if you are running the service in docker container.  
You can access Prisma Studio in `http://localhost:5555`.

For development of `api` service, you should stop its container and run them locally. Because Prisma gannerates its Prisma Client inside of node_modules directory and it's different for each environments. Api container is based on node.js image with Alpine Linux OS and your local OS may be different.

For above reason, generating Prisma Client is required in each environment and also changing DATABASE_URL.

**Security**

This api uses helmet library for express.js for security concern, and cors setting is also available in production mode. Set app's hostname in `/api/.env`'s whitelist, services can not get data without it.

Also, get access token from http://localhost:4021/get-access-token and put it in `/app/.env` file. This token is also needed in production mode.

Prisma https://www.prisma.io/

GraphQL Yoga https://www.graphql-yoga.com/

### db

Basically there are almost no need to touch this container, because api service will help you to deal with it.

If you need to change the database name, user privilleges, or something about MySQL setting itself, you need to access the container.

MySQL https://www.mysql.com/
