<template>
  <v-app>
    <av-toolbar />
    <av-nav-drawer />

    <main>
      <v-container class="mt-12">
        <slot />
      </v-container>
    </main>
  </v-app>
</template>

<script setup></script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter, .page-leave-to /* .page-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
