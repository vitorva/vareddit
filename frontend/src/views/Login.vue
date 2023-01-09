

<script setup lang="ts" >
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useClientStore } from '@/stores/client';

const clientStore = useClientStore();
const client = clientStore.client
console.log("useClientStore", clientStore.client)

const username = ref('');
const password = ref('');
const alert = ref('');

const router = useRouter();

// Log in with the form's email/username and password
function loginWithPassword() {

  alert.value = "";
  try {
    // call the backend

    const MUTATION = `
        mutation($options: UsernamePasswordInput!) {
          login(options: $options) {
            errors {
              message
            }
            user {
              id,
              username
            }
          }
        }
      `

    //https://github.com/urql-graphql/urql/discussions/2422
    //https://formidable.com/open-source/urql/docs/basics/core/#one-off-queries-and-mutations
    client.mutation(MUTATION, {
      "options": { "username": username.value, "password": password.value }
    }).toPromise().then(result => console.log("my result", result));

    //window.location.href = "http://localhost:5173";
    router.push('/');

  } catch (error) {
    if (error instanceof Error) {
      alert.value = error.message;
    }
  }

  //dispaly popup
}

</script>
<template>
  <div>
    <p>LOGIN</p>
    <div id="app">
      <div id="alert" v-if="alert">{{ alert }}</div>
      <form @submit.prevent="loginWithPassword">
        <label>
          username
          <input type="text" v-model="username" />
        </label>
        <label>
          Password
          <input type="password" v-model="password" />
        </label>
        <button type="submit" >Log in</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* https://userfront.com/guide/build-login-form-vue */
button,
input {
  display: block;
  margin-bottom: 10px;
}

#alert {
  color: red;
  margin-bottom: 10px;
}
</style>