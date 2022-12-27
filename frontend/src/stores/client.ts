import { defineStore } from "pinia";
import { ref } from "vue";

import { createClient } from "@urql/vue";

// https://github.com/urql-graphql/urql/discussions/2316
export const useClientStore = defineStore("client", () => {
  const client = ref(
    createClient({
      url: "http://localhost:4000/graphql",
      fetchOptions: {
        credentials: "include",
      },
    })
  );

  return { client };
});
