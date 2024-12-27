<template>
  <v-container>
    <v-card>
      <v-card-title>{{ page.title }}</v-card-title>
      <v-card-text>{{ page.content }}</v-card-text>
      <v-card-actions>
        <v-btn :href="`/page?id=${page.id}`" color="primary">View Page</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
const supabase = useSupabaseClient();
const route = useRoute();

const pageTitle = ref("pages");

const page = ref({ title: "", content: "", id: "" });

onMounted(async () => {
  const { id } = route.query;
  if (id) {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("id", id)
      .single();
    if (data) {
      page.value = data;
    } else {
      console.error(error);
    }
  }
});
</script>
