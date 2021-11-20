require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import http from "http";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema.js";
import { getUserByToken, protectedResolver } from "./users/users.utils.js";

const run = async () => {
  const PORT = process.env.PORT;

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
      if (ctx.req) {
        const { authorization } = ctx.req.headers;
        return {
          me: await getUserByToken(authorization),
          protectedResolver,
        };
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));
  app.use("/static", express.static("thumbnails"));
  server.applyMiddleware({
    app,
    path: "/",
  });

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  if (process.env.NODE_ENV === "production") {
    console.info(
      `🚀 Server ready at https://password-manager-achacha-api.herokuapp.com:${PORT}${server.graphqlPath}`
    );
  } else {
    console.info(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  }
};

run();
