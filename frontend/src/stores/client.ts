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
                      posts {
                        id,
                        title,
                        createdAt,
                        updatedAt
                      }
                  }
                `;

                cache.updateQuery({ query: ME }, (data) => {
                  console.log("updateQuery !!!", data);
                  //console.log("cache", cache);
                  return data;
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
