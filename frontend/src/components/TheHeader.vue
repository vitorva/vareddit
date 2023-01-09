<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from 'vue';

import { useClientStore } from '@/stores/client';

const clientStore = useClientStore();
const client = clientStore.client;
const username = ref("");

const QUERY_ME = `
         {
            me {
              user {
                id,
                username
              }
          }
        }
      `

  client.query(QUERY_ME, {}).toPromise().then(result => {
  username.value = result.data.me.user.username;
  console.log("ME", result)
});

// créer le logout
// si me pas null alors button logout qui va détruire la session ?
// Comment gérer le logout ???

function logout() {

const LOGOUT = `
     mutation {
        logout
    }
  `

client.mutation(LOGOUT, {}).toPromise().then(result => {
    console.log("ALED")
window.location.href = "http://localhost:5173";
});

}

</script>

<template>
    <header>
        <nav>
            <span>
                <RouterLink to="/">Home</RouterLink>
            </span>
            <span>
                <RouterLink to="/login">Login</RouterLink>
            </span>
            <span>
                <RouterLink to="/login">Login</RouterLink>
            </span>
            <span>
                <button @click="logout">logout</button>
            </span>
            <span>
               <a href="">TEST</a>
            </span>
        </nav>
        <div> User is : {{ username }}</div>
    </header>
</template>

<style>
header {
    background-color: #B8EBE9;
    width: 100%;
}

span {
    margin: 5px;
}
</style>