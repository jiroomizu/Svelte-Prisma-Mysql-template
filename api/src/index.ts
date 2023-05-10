import express from "express";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import helmet from "helmet";
import { createYoga } from "graphql-yoga";
import { useDisableIntrospection } from "@envelop/disable-introspection";
import { createContext } from "./client";
import { schema } from "./schema";

// environment variables
const port: number = Number(process.env.PORT) || 4021;
const endpoint: string = process.env.GRAPHQL_ENDPOINT || "graphql";
const isDevelopment: boolean = !!(process.env.NODE_ENV === "development");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";

// get CORS_WHITELIST and make it corsOption ready
const whitelist_env: string = process.env.CORS_WHITELIST || "";
const whitelist: string[] = whitelist_env.split(",");

const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
  credentials: true,
  // allowedHeaders: ["X-GQL-Request"],
  methods: ["POST"],
};

const additionalOptions = !!isDevelopment
  ? {
      // development
      maskedErrors: false,
      graphqlEndpoint: "/" + endpoint,
    }
  : {
      // production
      // disable debugging messages and tools
      graphiql: false,
      plugins: [useDisableIntrospection],
      landingPage: false,
      maskedErrors: true,
    };

// construct server and apply middlewares
const app = express();

// make Express secure
app.use(
  helmet({
    contentSecurityPolicy: isDevelopment ? false : undefined,
    // this prevents broken GraphiQL Yoga in development
    crossOriginEmbedderPolicy: isDevelopment ? false : true,
  })
);

// in development, access /get-access-token generates access token.
if (isDevelopment) {
  app.get("/get-access-token", (_, res) => {
    const accessToken = jwt.sign({}, accessTokenSecret);
    res.json({ accessToken: accessToken });
  });
} else {
  // in production, require access token
  app.use(
    expressjwt({
      secret: accessTokenSecret,
      algorithms: ["HS256"],
    })
  );
}

// apply options for the server
const graphQLServer = createYoga({
  schema,
  context: createContext,
  cors: corsOptions,
  ...additionalOptions,
});

// bind GraphQL Yoga to endpoint
app.use(`/${endpoint}`, graphQLServer);

// open port
app.listen(port, () => {
  console.log(`
      Running a GraphQL API server at http://localhost:${port}/${endpoint}
      NODE_ENV: ${process.env.NODE_ENV}
      Allowed domains:
        ${whitelist}
  `);
});
