import { defineStore } from "pinia";
import { ref } from "vue";

import { createClient } from "@urql/vue";

export const useClientStore = defineStore("client", () => {
  const client = ref(
    createClient({
      url: "http://localhost:4000/graphql",
    })
  );

  return { client };
});
