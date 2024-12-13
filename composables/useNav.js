const drawer = ref(false);

export const useNav = () => {
  const { filteredDrawerItems } = useDrawerItems();

  const toggleDrawer = () => {
    drawer.value = !drawer.value;
  };

  return { drawer, filteredDrawerItems, toggleDrawer };
};
