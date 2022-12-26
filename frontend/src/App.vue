

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery, useMutation } from '@urql/vue'
import { existsTypeAnnotation } from '@babel/types';

import { createClient } from '@urql/vue';

const client = createClient({
  url: 'http://localhost:4000/graphql',
});


const username = ref('');
const password = ref('');
const alert = ref('');
const test = ref('')
// Log in with the form's email/username and password


function loginWithPassword() {

  alert.value = "";
  try {
    // call the backend
    console.log("username", username.value);
    console.log("password", password.value);

    console.log("test")

    const result = useQuery({
      query: `
          query {
            hello
          }
      `
    }).then(result => test.value = result.data.value);


    console.log("result ", result);

    //redirection

    return result;

  } catch (error) {
    console.log(error)
    //alert.value = error.message;
  }


  //dispaly popup
}

//loginWithPassword();

//https://github.com/urql-graphql/urql/discussions/2422
//https://formidable.com/open-source/urql/docs/basics/core/#one-off-queries-and-mutations
function loginWithPassword2() {

  /*
    const QUERY = `
            query {
              hello
            }
        `
    client.query(QUERY, {}).toPromise().then(result => console.log("my result", result));
  */

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
  client.mutation(MUTATION, {
    "options": { "username": "bob", "password": "bob" }
  }).toPromise().then(result => console.log("my result", result));
}

</script>

<template>
  <div>
    <p>FORM</p>
    <div id="app">
      <div id="alert" v-if="alert">{{ alert }}</div>
      <form @submit.prevent="loginWithPassword2">
        <label>
          username
          <input type="text" v-model="username" />
        </label>
        <label>
          Password
          <input type="password" v-model="password" />
        </label>
        <button type="submit">Log in</button>
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