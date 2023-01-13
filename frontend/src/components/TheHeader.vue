<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref, watch, type Ref } from 'vue';

import { useClientStore } from '@/stores/client';
import { useFetchStore } from "@/stores/fetch";

import { useRouter } from 'vue-router';

const router = useRouter();

const clientStore = useClientStore();
const fetchStore = useFetchStore();

const client = clientStore.client;
const username: Ref<string> = ref("");
const userId: Ref<any> = ref(null);

function fetchUser(){
    client.query(QUERY_ME, {}).toPromise().then(result => {
        console.log("result ME", result)
        username.value = result.data.me.user.username;
        userId.value = result.data.me.user.id;
    });
}

const QUERY_ME = `
         {
            me {
              user {
                id,
                username
              }
          }
        }
      `;
      
    
fetchUser();
watch(() => fetchStore.fetch, () => {
    fetchUser();
})

function logout() {

    const LOGOUT = `
     mutation {
        logout
    }
  `;

    client.mutation(LOGOUT, {}).toPromise().then(result => {
        username.value = "";
        username.value = null;
        router.push('/');
    });

}

</script>

<template>
    <header>
        <nav class ="container">
            <div class ="home">
                <RouterLink to="/">Home</RouterLink>
            </div>
            <div class ="options" v-if="!username">
                <span>
                <RouterLink to="/login">Login</RouterLink>
                </span >
                <span>
                <RouterLink to="/register">Register</RouterLink>
                </span>
            </div>
            <div  class ="options" v-else>
                <span> <b>{{ username }}</b></span>
                <span><button @click="logout">logout</button></span>
            </div>
        </nav>
    </header>
</template>

<style>

.container {
    background-color: black;
    display: flex;
    height: 100%;

}

.home {
    padding-top: 20px;
    background-color: red;
    width: 20%;
}

.options {
    display: flex;
    width: 80%;
    padding-top: 20px;
    padding-right: 20px;
    background-color: green;
    justify-content: flex-end;
}


header {
    background-color: #B8EBE9;
    width: 100%;
    height: 70px;
}

span {
    margin: 5px;
}
</style>