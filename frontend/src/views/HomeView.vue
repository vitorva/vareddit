<script setup lang="ts">

import { ref } from 'vue';

import { useClientStore } from '@/stores/client';

import Post from "../components/Post.vue"

const clientStore = useClientStore();
const client = clientStore.client;

const fetching = ref(true);
const error = ref("");
const data = ref("");

const cookie = ref(document.cookie);



/*
import { useQuery } from '@urql/vue';
const result = useQuery({
  query: `
        {
          posts {
            id
            title
          }
        }
      `
});
// TODO display les posts
*/

const QUERY = `
         {
          posts {
            id
            title
          }
        }
      `

client.query(QUERY, {}).toPromise().then(result => {
  console.log("result", result)
  data.value = result.data.posts;
  error.value = result.error
  fetching.value = false;
});

</script>

<template>
  <div v-if="fetching">
    Loading...
  </div>
  <div v-else-if="error">
    Oh no... {{ error }}
  </div>
  <div v-else>
    <div class = "posts" v-if="data">
      <Post v-for="post in data" :key="post.id" :post= "post.title" :id="post.id"></Post>
    </div>
  </div>
</template>

<style>
.posts {
margin-top: 20px;
}
</style>
