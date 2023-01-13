<script setup lang="ts">
import { ref, computed } from 'vue';

const form = ref(null);
const valid = ref(true);
const name = ref("");
const nameRules = computed(() => [
    v => !!v || 'Name is required',
    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
])

const password = ref("");
const confirmPassword = ref("");
const passwordRules = computed(() => [
    v => !!v || 'Passowrd is required',
    v => (v && v.length >= 8) || 'Password must be equal or greather than 8 characters',
])

/*
const email = ref("");
const emailRules = computed(() => [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
])
*/


async function validate() {
    const { valid } = await form.value!.validate();
    if (valid) {
        window.location.href = "http://localhost:5173";

    };

}

</script>

<template>
    <div class="form">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>

            <v-text-field v-model="confirmPassword" :rules="passwordRules" label="Confirm Password" required></v-text-field>

            <v-row justify="center">
                <v-btn class="registerBtn" color="success" @click="validate">
                    Validate
                </v-btn>
            </v-row>
        </v-form>
    </div>
</template>

<style>
.form {
    background-color: rgb(250, 246, 246);
    padding: 2%;
    border: 0.5px solid rgb(139, 138, 138);
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    max-width: 400px;
    min-width: 200px;
}

.registerBtn {
    margin-top: 25px;
    margin-bottom: 5px;
}
</style>