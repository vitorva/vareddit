import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
//let RedisStore = require("connect-redis")(session);
import connectRedis from "connect-redis";

// redis@v4
import { createClient } from "redis";
import { MyContext } from "./types";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  await orm.getMigrator().up();

  // https://stackoverflow.com/questions/71117269/validation-error-using-global-entity-manager-instance-methods-for-context-speci/72799993#72799993
  const fork = orm.em.fork();

  //const post = fork.create(Post, { title: "ok" });
  //await fork.persistAndFlush(post); // <-- use the fork instead of global

  //const posts = await fork.find(Post, {});
  //console.log(posts);

  console.log("DIIRNAME", __dirname);
  console.log("SECRET", process.env.SECRET);

  const app = express();

  const RedisStore = connectRedis(session);

  const redisClient = createClient({ legacyMode: true });
  redisClient.connect().catch(console.error);

  app.set("trust proxy", process.env.NODE_ENV !== "production");

  app.use(
    session({
      name: "quid", // https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920  x-forwarded-proto : https in chrome
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: false,
        //sameSite: "lax", // csrf
        sameSite: "none",
        //secure: __prod__,
        secure: true,
      },
      //saveUninitialized: false,
      secret: process.env.SECRET!, // env
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
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  await apolloServer.start(); // https://stackoverflow.com/questions/68354656/unhandledpromiserejectionwarning-error-you-must-await-server-start-before
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://127.0.0.1:5173"],
    },
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
