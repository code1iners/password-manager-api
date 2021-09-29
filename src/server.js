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
        return {
          me: await getUserByToken(),
          protectedResolver,
        };
      }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  server.applyMiddleware({
    app,
    path: "/",
  });

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
};

run();
