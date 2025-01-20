<template>
  <v-container class="mt-15">
    <h1 class="text-center">New Signup is Authorized</h1>
  </v-container>
</template>

<script setup>
const { createNewProfile } = useProfiles();
const router = useRouter();

const newProfile = ref(null);

onMounted(async () => {
  newProfile.value = await JSON.parse(localStorage.getItem("signupFormData"));
  createNewProfile(newProfile.value)
    ? console.log("Profile created")
    : console.log("Profile not created");
  setTimeout(() => {
    localStorage.removeItem("signupFormData");
    router.push("/");
  }, 1000);
});
</script>
