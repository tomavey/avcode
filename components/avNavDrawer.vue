<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list
      ><v-list-item
        v-for="item in drawerItems"
        :key="item.title"
        :to="item.path"
        link
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const { drawerItems, drawer, toggleDrawer } = useNav();
</script>