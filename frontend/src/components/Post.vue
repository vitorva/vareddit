<script setup lang="ts">
// https://vuetifyjs.com/en/components/cards/#outlined

// spacing : https://vuetifyjs.com/en/styles/spacing/#

const props = defineProps({
  post: String,
  id: Number
})

</script>

<template>
    <v-card
      class="mx-auto mt-3"
      max-width="80%"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
            TITLE {{ id }}
          </v-list-item-title>
          <v-list-item-subtitle>{{post}}</v-list-item-subtitle>
        </v-list-item-content>
  
        <v-list-item-avatar
          tile
          size="80"
          color="grey"
        ></v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
        <v-btn
          outlined
          rounded
          text
        >
          Modifier
        </v-btn>

        <v-btn
          outlined
          rounded
          text
        >
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>