const drawer = ref(false);

export const useNav = () => {
  const { filteredDrawerItems, navPages, combinedDrawerItems } =
    useDrawerItems();
  const { fetchNavPages } = usePages();

  const toggleDrawer = () => {
    drawer.value = !drawer.value;
    fetchNavPages();
  };

  return {
    drawer,
    filteredDrawerItems,
    toggleDrawer,
    navPages,
    combinedDrawerItems,
  };
};
