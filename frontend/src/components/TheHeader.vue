<script setup lang="ts">
import { RouterLink } from "vue-router";

</script>

<template>
    <header>
        <HelloWorld msg="You did it!" />
        <nav>
            <span>
                <RouterLink to="/">Home</RouterLink>
            </span>
            <span>
                <RouterLink to="/login">Login</RouterLink>
            </span>
            <span>
                <RouterLink to="/register">Register</RouterLink>
            </span>
        </nav>
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