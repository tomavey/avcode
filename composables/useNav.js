const drawer = ref(false)

export const useNav = () => {
  const theme = useTheme();
  const { isModerator, moderatorObj } = useAuth()
  const { getSetting } = useSettings()
  const { drawerItems } = useDrawerItems()

  const topMenuItems = [];



  const { deleteOldSoftDeletedRecords } = useRequests();

  function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  }

  const toggleDrawer = () => {
    if (isModerator.value || openDrawer) {
      drawer.value = !drawer.value;
    }
  };

  const openDrawer = ref(true)

  const logout = () => {
    return
    if (typeof window !== "undefined") {
      clearMidCookie();
    }
    isModerator.value = false;
    window.location.href = "/";
  };

  const clearMidCookie = () => {
    document.cookie = "mid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  };

  const pinDrawerOn = computed(() => {
    return getSetting("pinDrawerOn")
  })


  return { drawer, pinDrawerOn, isModerator, moderatorObj, topMenuItems, drawerItems, deleteOldSoftDeletedRecords, toggleTheme, toggleDrawer, logout, clearMidCookie }
}
