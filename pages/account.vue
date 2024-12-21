<script setup>
definePageMeta({
  middleware: ["auth"],
});

const supabase = useSupabaseClient();
const { profile, updateProfile } = useProfiles();
const router = useRouter();
const { showSnackbar, snackbar } = useSnackbar();

const loading = ref(false);
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const authorized_to = ref("");
const phone = ref("");

const possibleRights = ["admin", "user"];

const user = useSupabaseUser();

const handleUpdateProfile = async (profile) => {
  loading.value = true;
  await updateProfile(profile);
  loading.value = false;
  showSnackbar("Profile updated successfully.");
  router.push("/");
};
</script>

<style scoped>
.form {
  background-color: white;
  border: black 2px solid;
  padding: 15px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
}
</style>

<template>
  <v-container>
    <h2 class="text-center mb-10">Subscriber account information.</h2>
    {{ profile }}{{ loading }}
    <v-form class="form">
      <v-text-field
        v-model="profile.first_name"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="profile.last_name"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="profile.email"
        label="Email to send notifactions to"
        required
      ></v-text-field>

      <v-select
        v-model="profile.authorized_to"
        :items="possibleRights"
        label="Rights"
        multiple
        required
      ></v-select>

      <v-text-field
        v-model="profile.phone"
        label="Phone Number"
        required
      ></v-text-field>

      <v-btn @click="handleUpdateProfile(profile)" block>Submit</v-btn>
    </v-form>
  </v-container>
</template>
