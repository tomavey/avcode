<template>
  <v-container class="mt-15">
    <v-card class="logincard mx-auto">
      <h1>Signup a new User</h1>
      <v-alert v-if="errorMessage" type="error" density="compact">
        {{ errorMessage }}
      </v-alert>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="formData.email"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="Password"
          hint="At least 8 characters"
          @click:append="showPassword = !showPassword"
          :rules="[rules.required, rules.min]"
        ></v-text-field>
        <v-text-field
          v-model="formData.confirmPassword"
          :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirmPassword ? 'text' : 'password'"
          name="confirmPassword"
          label="Confirm Password"
          @click:append="showConfirmPassword = !showConfirmPassword"
          :rules="[rules.required, rules.match]"
        ></v-text-field>
        <v-text-field
          v-model="formData.first_name"
          label="First Name"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          v-model="formData.last_name"
          label="Last Name"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field v-model="formData.phone" label="Phone"></v-text-field>
        <v-btn
          block
          color="indigo-darken-3"
          :disabled="!valid"
          @click="handleSubmit"
          >Submit</v-btn
        >
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
const {
  signUpNewUser,
  signInWithEmail,
  signOut,
  logout,
  user,
  profile,
  isModerator,
  isAdmin,
  moderatorObj,
  errorMessage,
} = useAuth();

const router = useRouter();

const formData = ref({
  email: "",
  password: "",
  confirmPassword: "",
  first_name: "",
  last_name: "",
  phone: "",
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const valid = ref(false);
const rules = {
  required: (value) => !!value || "Required.",
  min: (value) => value.length >= 6 || "Min 6 characters",
  match: (value) => value === formData.value.password || "Passwords must match",
};

const handleSubmit = async () => {
  if (valid.value) {
    // alert(`Signing up ${formData.value.email}`);
    const newUserObj = {
      email: formData.value.email,
      password: formData.value.password,
      options: {
        data: {
          first_name: formData.value.first_name,
          last_name: formData.value.last_name,
          phone: formData.value.phone,
        },
      },
    };
    await signUpNewUser(newUserObj);
    if (!errorMessage.length) {
      router.push({ path: "/" });
    }
  }
};
</script>

<style scoped>
.logincard {
  max-width: 600px;
  padding: 10px;
}
</style>
