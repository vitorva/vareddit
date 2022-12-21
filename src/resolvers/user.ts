import {
  Arg,
  Ctx,
  Query,
  Resolver,
  Int,
  Mutation,
  InputType,
  Field,
  ObjectType,
} from "type-graphql";
import { urlToHttpOptions } from "url";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { MyContext } from "../types";

import * as argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
class FieldError {
  @Field(() => String)
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const findUser = await em
      .fork()
      .findOne(User, { username: options.username });

    if (findUser) {
      return {
        errors: [{ message: "username already exists" }],
      };
    }

    if (options.username.length <= 2) {
      return {
        errors: [{ message: "username must be equal or greater than 3" }],
      };
    }

    if (options.password.length <= 2) {
      return {
        errors: [{ message: "password must be equal or greater than 3" }],
      };
    }

    const hashPassword = await argon2.hash(options.password);
    const user = em
      .fork()
      .create(User, { username: options.username, password: hashPassword });

    try {
      await em.fork().persistAndFlush(user);
    } catch {
      return {
        errors: [{ message: "unexpected error" }],
      };
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.fork().findOne(User, { username: options.username });

    if (!user) {
      return {
        errors: [{ message: "invalid credentials" }],
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{ message: "invalid credentials" }],
      };
    }

    return {
      user,
    };
  }
}
