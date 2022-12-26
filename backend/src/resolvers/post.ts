import { Arg, Ctx, Query, Resolver, Int, Mutation } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.fork().find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.fork().findOne(Post, { id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.fork().create(Post, { title });
    await em.fork().persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Number) id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.fork().findOne(Post, { id });

    if (!post) {
      return null;
    }

    if (typeof title !== "undefined") {
      post.title = title;
      await em.fork().persistAndFlush(post);
    }

    await em.fork().persistAndFlush(post);
    return post;
  }

  @Mutation(() => Boolean)
  async deleteePost(
    @Arg("id", () => Number) id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.fork().nativeDelete(Post, { id });
      return true;
    } catch {
      return false;
    }
  }
}
