<template>
  <v-app-bar>
    <v-toolbar color="white" class="elevation-1">
      <v-app-bar-nav-icon
        density="compact"
        @click="toggleDrawer"
      ></v-app-bar-nav-icon>
      <div @click="router.push('/')">
        <v-img src="@/assets/avcode3.png" :width="175" class="cursor-pointer" />
      </div>
      <v-spacer />
      <p v-if="user?.email" class="mr-4">
        {{ user.email }}
      </p>
    </v-toolbar>
  </v-app-bar>
</template>

<script setup>
const { toggleDrawer } = useNav();
const user = useSupabaseUser();
const router = useRouter();
</script>
