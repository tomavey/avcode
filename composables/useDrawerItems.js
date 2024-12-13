const drawerItems = [
  {
    name: "Users",
    path: "/users",
    rights: "admin",
    icon: "mdi-account",
    sortOrder: 2,
  },
  {
    name: "About",
    path: "/about",
    rights: "admin",
    icon: "mdi-information",
    sortOrder: 1,
  },
  {
    name: "Login",
    action: "login",
    rights: "admin",
    icon: "mdi-login",
    sortOrder: 5,
  },
  {
    name: "Logout",
    action: "logout",
    rights: "admin",
    icon: "mdi-logout",
    sortOrder: 6,
  },
];

export const useDrawerItems = () => {
  const user = useSupabaseUser();

  const isLoggedIn = computed(() => {
    return user?.value?.id;
  });

  const filteredDrawerItems = drawerItems.filter((item) => {
    if (item.action === "login") {
      return !isLoggedIn.value;
    } else if (item.action === "logout") {
      return isLoggedIn.value;
    } else {
      return true;
    }
  });
  return { filteredDrawerItems };
};
