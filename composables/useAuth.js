import { ErrorCodes } from "vue";

const user = ref({});
const loginSuccess = ref(false);

export const useAuth = () => {
  const user = useSupabaseUser();
  const supabase = useSupabaseClient();
  const { createNewProfile } = useProfiles();
  const { showSnackbar, snackbar } = useSnackbar();

  const errorMessage = ref("");

  const logout = async () => {
    console.log("logout");
    const { error } = await supabase.auth.signOut();
    if (!error) {
      showSnackbar("Logged out");
      setTimeout(() => {
        window.location.href =
          window.location.origin + window.location.pathname;
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };

  const signUpNewUser = async (newUser) => {
    try {
      const response = await supabase.auth.signUp(newUser);
      console.log("Sign up response:", response);

      const { data, error } = response;
      const { user } = data;

      if (error) {
        // Check if the error is due to the user already existing
        if (error.message.includes("User already registered")) {
          errorMessage.value =
            "This email is already registered. Please use a different email.";
        }
      }

      newUser.id = user.id;

      console.log("User signed up:", newUser);
      createNewProfile(newUser);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  async function signOut() {
    supabase.auth.signOut();
  }

  const signInWithEmail = async (email, password) => {
    console.log("signing in with email");
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log("Error", error);
      errorMessage.value = error.message;
    } else {
      loginSuccess.value = true;
      // showSnackbar(`${email} is signed in.`)
    }
  };

  const isLoggedIn = computed(() => {
    if (user.value && user.value.id) return true;
    return false;
  });

  const deleteUser = async (userId) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.message);
      alert("Failed to delete user. Please try again.");
    }
  };

  return {
    user,
    logout,
    signUpNewUser,
    signInWithEmail,
    signOut,
    errorMessage,
  };
};
