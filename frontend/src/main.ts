import { createApp } from "vue";
import { createPinia } from "pinia";
//import urql, { createClient } from "@urql/vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
/*
app.use(
  urql,
  createClient({
    url: "http://localhost:4000/graphql",
  })
);
*/
app.mount("#app");
