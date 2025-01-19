<template>
  <v-container class="mt-15">
    <h1>New Signup is Authorized</h1>
  </v-container>
</template>

<script setup>
const { createNewProfile } = useProfiles();
const signupFormData = ref(null);
const user = useSupabaseUser();
const router = useRouter();

const newProfile = computed(() => {
  let profile = signupFormData.value;
  profile = {
    ...profile,
    id: user.value.id,
  };
  return profile;
});

onMounted(() => {
  signupFormData.value = JSON.parse(localStorage.getItem("signupFormData"));
  delete signupFormData.value.password;
  delete signupFormData.value.confirmPassword;
  createNewProfile(newProfile.value);
  router.push("/");
});
</script>
