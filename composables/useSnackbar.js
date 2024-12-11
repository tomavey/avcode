const snackbar = ref({ show: false, text: "test" });

export const useSnackbar = () => {

  const showSnackbar = (text = "default snackbar text") => {
    snackbar.value = { show: true, text: text };
  }

  return {
    snackbar,
    showSnackbar
  }
}
