<template>
  <v-toolbar>
    <v-app-bar-nav-icon
      density="compact"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>
    <div>
      <v-img src="@/assets/avcode2.png" :width="75" class="cursor-pointer" />
    </div>
  </v-toolbar>
</template>

<script setup>
const { toggleDrawer } = useNav();
</script>