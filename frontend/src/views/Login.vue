

<script setup lang="ts" >
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useClientStore } from '@/stores/client';

const form = ref(null);
const valid = ref(true);
const name = ref("");
const nameRules = computed(() => [
    v => !!v || 'Name is required',
    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
])

const password = ref("");
const passwordRules = computed(() => [
    v => !!v || 'Passowrd is required',
    v => (v && v.length >= 3) || 'Password must be equal or greather than 3 characters',
])

async function validate() {
    const { valid } = await form.value!.validate();

    if (valid) {
      console.log("loginWithPassword");
        loginWithPassword();
    };

}

const clientStore = useClientStore();
const client = clientStore.client
console.log("useClientStore", clientStore.client)

const username = ref('');
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

    router.push('/');

  } catch (error) {
    if (error instanceof Error) {
      alert.value = error.message;
    }
  }

}

</script>

<template>
  <div class="form">
      <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="username" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

          <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>

          <v-row justify="center">
              <v-btn class="registerBtn" color="success" @click="validate">
                  Validate
              </v-btn>
          </v-row>
      </v-form>
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