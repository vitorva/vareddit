<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, watch, type Ref } from 'vue';

import { useClientStore } from '@/stores/client';
import { useFetchStore } from "@/stores/Fetch";

const clientStore = useClientStore();
const fetchStore = useFetchStore();

const client = clientStore.client;
const username: Ref<string> = ref("");

const myfetch = ref(fetchStore.fetch);

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

// TODO : avoir dans le store un boolean qui fait qu'à chaque login j'informe que c'est possible de relancer un fetch ici 
// https://www.thisdot.co/blog/vue-3-composition-api-watch-and-watcheffect

watch(() => fetchStore.fetch, () => {
    console.log('value changes detected')
})

watch(() => fetchStore.fetch, () => {
    client.query(QUERY_ME, {}).toPromise().then(result => {
        username.value = result.data.me.user.username;
        console.log("ME", result)
    });
})

//username.value = "bobby"


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
                <button @click="logout">logout</button>
            </span>
            <span>
                <a href="">TEST</a>
            </span>
        </nav>
        <div> User is : {{ username }}</div>
        <!--<div> fetchStore.fetch is : {{ fetchStore.fetch }}</div>-->
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