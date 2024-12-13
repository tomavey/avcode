<template>
  <v-snackbar
    v-model="snackbar.show"
    timeout="5000"
    class="rounded elevated mx-auto"
    vertical
  >
    <p>{{ snackbar.text }}</p>
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="snackbar.show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
const { snackbar } = useSnackbar();
</script>

<style scoped>
</style>