<template>
  <v-container class="mt-10">
    <div v-if="page.show_card">
      <v-card v-if="page.title">
        <v-card-title>{{ page.title }}</v-card-title>
        <v-card-text v-html="page.content" />
      </v-card>
    </div>
    <div v-else>
      <h1>{{ page.title }}</h1>
      <div v-html="page.content" />
    </div>
  </v-container>
</template>

<script setup>
const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();

const pageTitle = ref("pages");

const page = ref({ title: "", content: "", id: "" });

const fetchPageData = async (id) => {
  try {
    let query;

    if (!isNaN(id)) {
      query = supabase.from("pages").select("*").eq("id", id).single();
    } else {
      query = supabase.from("pages").select("*").eq("nav_path", id).single();
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    if (data) {
      // Assuming 'page' is reactive (e.g., using Vue's ref or reactive)
      page.value = data;
    } else {
      router.push("/nopage");
    }
  } catch (error) {
    console.error(error);
    router.push("/nopage");
  }
};

onMounted(async () => {
  const { id } = route.params;
  fetchPageData(id);
});
</script>
