import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  await orm.getMigrator().up();

  // https://stackoverflow.com/questions/71117269/validation-error-using-global-entity-manager-instance-methods-for-context-speci/72799993#72799993
  const fork = orm.em.fork();

  //const post = fork.create(Post, { title: "ok" });
  //await fork.persistAndFlush(post); // <-- use the fork instead of global

  //const posts = await fork.find(Post, {});
  //console.log(posts);

  const app = express();
  /*
  app.get("/", (_, res) => {
    res.send("hello !");
  });
*/
  // added this line

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  await apolloServer.start(); // https://stackoverflow.com/questions/68354656/unhandledpromiserejectionwarning-error-you-must-await-server-start-before
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
