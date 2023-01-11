import { defineStore } from "pinia";
import { ref } from "vue";

import { createClient, dedupExchange, fetchExchange } from "@urql/vue";

import { cacheExchange } from "@urql/exchange-graphcache";

// https://github.com/urql-graphql/urql/discussions/2316
export const useClientStore = defineStore("client", () => {
  const client = ref(
    createClient({
      url: "http://localhost:4000/graphql",
      fetchOptions: {
        credentials: "include",
      },
      exchanges: [
        dedupExchange,
        cacheExchange({
          updates: {
            Mutation: {
              login(result, _args, cache, _info) {
                const ME = `
                      {
                        me {
                          user {
                            id,
                            username
                          }
                      }
                    }
                `;

                console.log("login result", result);
                const myResult: any = result;
                const username = myResult.login.user.username;
                const id = myResult.login.user.id;
                console.log("myResult", myResult.login.user.username);

                cache.updateQuery({ query: ME }, (data: any) => {
                  //console.log("updateQuery !!!", data);
                  //console.log("cache", cache);
                  const response = {
                    me: { user: { id: id, username: username } },
                  };
                  console.log("response", response);
                  return {};
                });
              },
            },
          },
        }),
        fetchExchange,
      ],
    })
  );

  return { client };
});
