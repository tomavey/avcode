<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in indexPageItems"
        :key="index"
        cols="12"
        sm="4"
      >
        <v-card @click="navigateTo(item.path)" class="rounded-border">
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>{{ item.path }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { combinedDrawerItems } = useDrawerItems();

const indexPageItems = combinedDrawerItems.value.filter(
  (item) => item.includeIndexPage
);

const pageTitle = ref("Index Page");
</script>

<style scoped>
.rounded-border {
  border-radius: 10px;
}
</style>
