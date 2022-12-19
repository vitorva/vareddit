import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  await orm.getMigrator().up();

  // https://stackoverflow.com/questions/71117269/validation-error-using-global-entity-manager-instance-methods-for-context-speci/72799993#72799993
  const fork = orm.em.fork();

  const post = fork.create(Post, { title: "ok" });
  await fork.persistAndFlush(post); // <-- use the fork instead of global

  const posts = await fork.find(Post, {});
  console.log(posts);
};

main().catch((err) => {
  console.log(err);
});
