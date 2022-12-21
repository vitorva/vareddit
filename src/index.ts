import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

// redis@v4
const { createClient } = require("redis");
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

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

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: "keyboard cat",
      resave: false,
    })
  );

  /*
  app.get("/", (_, res) => {
    res.send("hello !");
  });
*/
  // added this line

  // code to expose graphql to localhost:4000/graphql
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
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
