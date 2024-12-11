const dialog = ref({
  show: false,
  title: "",
  content: "",
  data: {},
  action: "",
});

export const useDialog = () => {

  const clearDialog = () => {
    dialog.value = {
      show: false,
      title: "",
      content: "",
      data: {},
      action: "",
    };
  };

  const openLoginDialog = () => {
    clearDialog()
    dialog.value.show = true;
  }

  const openAddDialog = () => {
    clearDialog();
    dialog.value.show = true;
    dialog.value.action = "add";
  };

  const openEditDialog = (request) => {
    // console.log("Edit request from composable: ", request);
    dialog.value.show = true;
    dialog.value.data = request;
    dialog.value.action = "edit";
  };

  return { dialog, clearDialog, openAddDialog, openEditDialog, openLoginDialog };

}
