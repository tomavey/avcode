<template>
  <v-container>
    {{ pageTitle }}
    <v-list>
      <v-list-item v-for="user in users" :ref="id">
        {{ user.first_name }} {{ user.last_name }}
        {{ user.email }}
        {{ formatDateString(user.updated_at) }}
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
const { user } = useAuth();
const { users, getProfiles } = useProfiles();
const { formatDateString } = useFormating();
const pageTitle = ref("USERS");

onMounted(() => {
  getProfiles();
});
</script>
