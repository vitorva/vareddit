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

// TODO : centrer le header + header adapté à la taille des posts.

</script>

<template>
    <header>
        <div class="main">
            <nav class ="container">
                <div class ="home">
                    <RouterLink to="/">VAREDDIT</RouterLink>
                </div>
                <div class ="options" v-if="!username">
                    <RouterLink to="/login">Login</RouterLink>
                    <RouterLink to="/register">Register</RouterLink>
                </div>
                <div  class ="options" v-else>
                    <button>Create post</button>
                    <b>{{ username }}</b>
                    <button @click="logout">logout</button>
                </div>
            </nav>
        </div>

    </header>
</template>

<style>

.main {
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background-color: red;
    display: flex;
    height: 100%;
    width: 80%;
}

.home {
    padding-top: 20px;
    width: 20%;
}

.options {
    display: flex;
    width: 80%;
    padding-top: 20px;
    padding-right: 20px;
    justify-content: flex-end;
    gap: 15px;
}


header {
    /*position: fixed; TODO */
    background-color: #B8EBE9;
    width: 100%;
    padding: 20px;
}

span {
    margin: 5px;
}
</style>