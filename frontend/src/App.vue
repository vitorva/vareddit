<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import TheHeader from "./components/TheHeader.vue"
import TheFooter from "./components/TheFooter.vue"
</script>

<template>

  <TheHeader />

  <RouterView />

  <TheFooter />
</template>

<style scoped>
.app {
  background-color: red;
}

@media (min-width: 1024px) {}
</style>
