const drawer = ref(false);

export const useNav = () => {
  const { drawerItems } = useDrawerItems();

  const toggleDrawer = () => {
    drawer.value = !drawer.value;
  };

  return { drawer, drawerItems, toggleDrawer };
};
