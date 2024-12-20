<script setup>
definePageMeta({
  middleware: ["auth"],
});

const supabase = useSupabaseClient();
const profile = useProfiles();

const loading = ref(true);
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const authorized_to = ref("");
const phone = ref("");

const possibleRights = ["admin", "user"];

loading.value = true;
const user = useSupabaseUser();

const { data } = await supabase
  .from("profiles")
  .select(`first_name, last_name, email, authorized_to, phone`)
  .eq("id", user.value.id)
  .single();

if (data) {
  first_name.value = data.first_name;
  last_name.value = data.last_name;
  email.value = data.email;
  authorized_to.value = data.authorized_to;
  phone.value = data.phone;
}

loading.value = false;

async function updateProfile() {
  try {
    loading.value = true;
    const user = useSupabaseUser();

    const updates = {
      id: user.value.id,
      email: email.value,
      last_name: last_name.value,
      first_name: first_name.value,
      authorized_to: authorized_to.value,
      phone: phone.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    user.value = null;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
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
    {{ user }}
    {{ profile }}
    <v-form class="form">
      <v-text-field
        v-model="first_name"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="last_name"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="Email to send notifactions to"
        required
      ></v-text-field>

      <v-select
        v-model="authorized_to"
        :items="possibleRights"
        label="Rights"
        multiple
        required
      ></v-select>

      <v-text-field
        v-model="phone"
        label="Phone Number"
        required
      ></v-text-field>

      <v-btn @click="updateProfile" block>Submit</v-btn>
    </v-form>
  </v-container>
</template>
