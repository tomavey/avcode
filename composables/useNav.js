const drawer = ref(false);

export const useNav = () => {
  const { filteredDrawerItems, navPages, combinedDrawerItems } =
    useDrawerItems();

  const toggleDrawer = () => {
    drawer.value = !drawer.value;
  };

  return {
    drawer,
    filteredDrawerItems,
    toggleDrawer,
    navPages,
    combinedDrawerItems,
  };
};
