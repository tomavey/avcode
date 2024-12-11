<template>
  <v-card class="loginCard">
    <h3>Login</h3>
    <v-alert v-if="errorMessage" type="error" density="compact">
      {{ errorMessage }}
    </v-alert>
    <v-alert v-if="showResetPassword" type="info" density="compact">
      Enter your email and we will send you a link to reset your password.
    </v-alert>
    <form>
      <v-text-field
        v-model="formData.email"
        label="Email"
        required
      ></v-text-field>
      <v-text-field
        v-if="!showResetPassword"
        v-model="formData.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        name="password"
        label="Password"
        hint="At least 8 characters"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
    </form>
    <v-btn
      v-if="!showResetPassword"
      block
      color="info"
      @click="signInWithEmail(formData.email, formData.password)"
      >Sign In</v-btn
    >
    <v-btn
      v-if="!showResetPassword"
      @click="gotoNewUser"
      elevation="0"
      class="mt-5"
      density="compact"
      >Create a new account</v-btn
    >
    <v-btn
      v-if="!showResetPassword"
      @click="showResetPassword = !showResetPassword"
      elevation="0"
      class="mt-5"
      density="compact"
      >Reset your password</v-btn
    >

    <v-btn
      v-if="showResetPassword"
      @click="handleOTP(formData.email)"
      elevation="0"
      class="mt-5"
      density="compact"
      >Send me a magic link</v-btn
    >
    <!-- <p>UserObj: {{ user }}</p>
    <p>Profile obj:{{ profile }}</p> -->
  </v-card>
</template>

<script setup>
const router = useRouter();
const supabase = useSupabaseClient();
const { signInWithEmail, errorMessage } = useAuth();

const emit = defineEmits(["closeLoginDialog"]);

const gotoNewUser = () => {
  emit("closeLoginDialog");
  router.push("/signup");
};

const showPassword = ref(false);

const showResetPassword = ref(false);

const handleResetPassword = async (email) => {
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/resetpassword`,
  });
};

const handleOTP = async (email) => {
  await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: `${window.location.origin}/resetpassword`,
    },
  });
  alert("A magic link has been sent to your email address.");
  window.close();
};

const formData = ref({
  email: "tomavey@outlook.com",
  password: "123456",
});
</script>

<style scoped>
.loginCard {
  padding: 20px;
}
</style>
