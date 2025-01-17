const drawerItems = [
  {
    name: "Users",
    path: "/users",
    rights: "admin",
    icon: "mdi-account-group",
    sortOrder: 2,
    includeIndexPage: true,
  },
  {
    name: "About",
    path: "/about",
    rights: "admin",
    icon: "mdi-information-outline",
    sortOrder: 1,
    includeIndexPage: true,
  },
  {
    name: "Account",
    path: "/account",
    rights: "admin",
    icon: "mdi-account-check",
    sortOrder: 4,
    includeIndexPage: true,
  },
  {
    name: "Settings",
    path: "/settings",
    rights: "admin",
    icon: "mdi-cog",
    sortOrder: 4,
    includeIndexPage: true,
  },
  {
    name: "Pages",
    path: "/pages",
    rights: "admin",
    icon: "mdi-information",
    sortOrder: 5,
    includeIndexPage: true,
  },
  {
    name: "Tasks",
    path: "/tasks",
    rights: "admin",
    icon: "mdi-calendar-check",
    sortOrder: 9,
    includeIndexPage: true,
  },
  {
    name: "Login",
    action: "login",
    rights: "admin",
    icon: "mdi-login",
    sortOrder: 5,
    includeIndexPage: false,
  },
  {
    name: "Logout",
    action: "logout",
    rights: "admin",
    icon: "mdi-logout",
    sortOrder: 6,
    includeIndexPage: false,
  },
];

export const useDrawerItems = () => {
  const user = useSupabaseUser();
  const { navPages } = usePages();

  const isLoggedIn = computed(() => {
    return user?.value?.id;
  });

  const filteredDrawerItems = computed(() => {
    return drawerItems.filter((item) => {
      if (item.action === "login") {
        return !isLoggedIn.value;
      } else if (item.action === "logout") {
        return isLoggedIn.value;
      } else {
        return true;
      }
    });
  });

  const combinedDrawerItems = computed(() => {
    return [...filteredDrawerItems.value, ...navPages.value].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  });

  return { filteredDrawerItems, combinedDrawerItems, navPages };
};
