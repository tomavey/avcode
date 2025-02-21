<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list
      ><v-list-item
        v-for="item in combinedDrawerItems"
        :key="item.name"
        :to="item.path"
        link
        @click="handleClick(item)"
        :prepend-icon="item.icon"
        density="compact"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list>
      <v-list-item v-for="item in combinedDrawerItems">
        <NuxtLink :to="item.path" @click="handleClick(item)">{{
          item.name
        }}</NuxtLink>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-dialog
    v-model="showLoginDialog"
    @closeLoginDialog="closeLoginDialog"
    max-width="500px"
  >
    <av-login-form @closeLoginDialog="closeLoginDialog" />
  </v-dialog>
</template>

<script setup>
const { filteredDrawerItems, drawer, navPages, combinedDrawerItems } = useNav();
const { fetchNavPages } = usePages();

const { logout } = useAuth();
const supabase = useSupabaseClient();

const showLoginDialog = ref(false);

const handleClick = (item) => {
  item.action === "login" ? openLoginDialog() : null;
  item.action === "logout" ? handleLogout() : null;
};

const combinedItems = computed(() => {
  return [...filteredDrawerItems.value, ...navPages.value];
});

const handleLogout = () => {
  logout();
};

const closeLoginDialog = () => {
  showLoginDialog.value = false;
  const handleKeydown = (event) => {
    if (event.key === "Escape") {
      close();
    }
  };
};

const openLoginDialog = () => {
  showLoginDialog.value = true;
};

fetchNavPages();
</script>
