<template>
  <v-container class="mt-15">
    <v-row>
      <v-col cols="12">
        <h1 class="display-1 text-center">About</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p class="text-center">
          This is the about page. It is a static page that is not generated from
          the database.
        </p>
        <p class="text-center">
          Checkout the github repo for this project
          <a href="https://github.com/tomavey/avcode" target="_new">HERE</a>.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const pageTitle = ref("ABOUT");
</script>
