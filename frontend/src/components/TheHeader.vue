<script setup lang="ts">
import { RouterLink } from "vue-router";

</script>

<template>
    <header>
        <HelloWorld msg="You did it!" />
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/login">Login</RouterLink>
        </nav>
    </header>
</template>

<style>
header {
    background-color: beige;
    width: 100%;
}
</style>