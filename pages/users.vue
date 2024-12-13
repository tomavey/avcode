<template>
  <v-container>
    {{ pageTitle }}
    <v-text-field
      v-model="searchstring"
      placeholder="Search"
      width="300px"
      density="compact"
      class="searchfield"
    />
    <v-data-table
      :items="formatedUsers"
      :headers="headers"
      :loading="loading"
      :search="searchstring"
    />
  </v-container>
</template>

<script setup>
const { user } = useAuth();
const { users, getProfiles } = useProfiles();
const { formatDateString } = useFormating();
const pageTitle = ref("USERS");
const formatedUsers = ref([]);
const searchstring = ref("");

const loading = computed(() => {
  return !formatedUsers.value.length;
});

const headers = ref([
  {
    key: "first_name",
    title: "First Name",
  },
  {
    key: "last_name",
    title: "Last Name",
  },
  {
    key: "phone",
    title: "Phone",
  },
  {
    key: "email",
    title: "Email",
  },
  {
    key: "updated_at",
    title: "Created",
  },
]);

watch(users, () => {
  formatedUsers.value = users.value.map((user) => ({
    ...user,
    updated_at: formatDateString(user.updated_at),
  }));
});

onMounted(() => {
  getProfiles();
});
</script>

<style scoped>
.searchfield {
  float: right;
}
</style>
