<template>
  <v-container class="mt-10">
    <v-card>
      <v-card-title>{{ page.title }}</v-card-title>
      <v-card-text v-html="page.content" />
    </v-card>
  </v-container>
</template>

<script setup>
const supabase = useSupabaseClient();
const route = useRoute();

const pageTitle = ref("pages");

const page = ref({ title: "", content: "", id: "" });

onMounted(async () => {
  const { id } = route.params;
  let query = supabase.from("pages").select("*").single();

  if (!isNaN(id)) {
    query = query.eq("id", id);
  } else {
    query = query.eq("page_name", id);
  }

  const { data, error } = await query;

  if (data) {
    page.value = data;
  } else {
    console.error(error);
  }
});
</script>
