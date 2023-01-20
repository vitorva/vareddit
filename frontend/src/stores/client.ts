import { defineStore } from "pinia";
import { ref } from "vue";

import { createClient, dedupExchange, fetchExchange } from "@urql/vue";

import { cacheExchange } from "@urql/exchange-graphcache";
import { useFetchStore } from "./fetch";

//const fetchStore = useFetchStore();

// https://github.com/urql-graphql/urql/discussions/2316
export const useClientStore = defineStore("client", () => {
  const fetchStore = useFetchStore();

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
                fetchStore.increment(); // trigger the call to the me function of the API
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
