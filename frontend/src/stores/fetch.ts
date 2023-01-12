import { ref, type Ref } from "vue";
import { defineStore } from "pinia";

export const useFetchStore = defineStore("fetch", () => {
  const fetch: Ref<number> = ref(0);
  function increment() {
    fetch.value++;
  }

  function value() {
    return fetch.value;
  }

  return { fetch, increment, value };
});

/*
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFetchStore = defineStore("counter", {
  state: () => ({
    fetch: ref(0),
  }),

  getters: {
    myValue() {
      // autocompletion ✨
      return fetch;
    },
  },

  actions: {
    incremenet() {
      this.fetch = this.fetch + 1;
    },
  },
});


 */
