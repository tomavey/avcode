<template>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list
      ><v-list-item
        v-for="item in drawerItems"
        :key="item.name"
        :to="item.path"
        link
        @click="handleClick(item)"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
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
const { drawerItems, drawer, toggleDrawer } = useNav();
const { dialog, clearDialog, openAddDialog, openEditDialog } = useDialog();
const { logout } = useAuth();

const showLoginDialog = ref(false);

const handleClick = (item) => {
  console.log(item);

  item.action === "login" ? openLoginDialog() : null;
  item.action === "logout" ? logout() : null;
};

const closeLoginDialog = () => {
  showLoginDialog.value = false;
};

const openLoginDialog = () => {
  showLoginDialog.value = true;
};
</script>
