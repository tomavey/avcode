<template>
  <v-container class="my-10">
    <v-btn @click="dialog = true" color="primary" icon class="mb-3">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-row class="mb-3">
      <v-col cols="6">
        <p>Sort By:</p>
        <v-radio-group v-model="sortBy" inline>
          <v-radio
            v-for="option in sortOptions"
            :key="option.value"
            :label="option.text"
            :value="option.value"
            class="mr-3"
            density="compact"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="6">
        <v-text-field v-model="searchQuery" label="Search"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="page in sortedPages" :key="page.id" cols="12">
        <v-card>
          <v-card-title>{{ page.title.toString() }}</v-card-title>
          <v-card-text v-html="page.content" />
          <v-card-text v-if="page.page_name" v-html="page.page_name" />

          <v-card-actions>
            <v-btn :href="`/page?id=${page.id}`" color="primary" icon
              ><v-icon>mdi-eye</v-icon></v-btn
            >
            <v-btn @click="editPage(page)" color="secondary" icon
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn @click="deletePage(page.id)" color="error" icon
              ><v-icon>mdi-trash-can</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>{{ newPage.id ? "Edit" : "Add" }} Page</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="newPage.title"
              label="Title"
              required
            ></v-text-field>
            <av-Tiptap-editor
              @update-content="update_content"
              v-model="newPage.content"
            />
            <v-btn @click="addPage" color="primary">Add Page</v-btn>
          </v-form>
        </v-card-text>
        {{ newPage }}
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
const supabase = useSupabaseClient();
const pageTitle = ref("pages");

const pages = ref([]);

const dialog = ref(false);

const newPage = ref({
  title: "",
  content: "",
});

const sortBy = ref("title");

const sortOptions = [
  { text: "Title", value: "title" },
  { text: "ID", value: "id" },
  { text: "Created", value: "created_at" },
];

const searchQuery = ref("");

const filteredPages = computed(() => {
  if (!searchQuery.value) {
    return pages.value;
  }
  return pages.value.filter((page) => {
    const query = searchQuery.value.toLowerCase();
    return (
      page.title.toLowerCase().includes(query) ||
      page.content.toLowerCase().includes(query)
    );
  });
});

const sortedPages = computed(() => {
  return [...filteredPages.value].sort((a, b) => {
    if (sortBy.value === "id") {
      return a.id - b.id;
    } else if (sortBy.value === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy.value === "created_at") {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    return 0;
  });
});

const fetchPages = async () => {
  const { data, error } = await supabase.from("pages").select("*");
  if (error) {
    console.error(error);
  } else {
    pages.value = data;
  }
};

const addPage = async () => {
  try {
    if (newPage.value.id) {
      const { data, error } = await supabase
        .from("pages")
        .update({ title: newPage.value.title, content: newPage.value.content })
        .eq("id", newPage.value.id);
      if (error) throw error;
    } else {
      const { data, error } = await supabase
        .from("pages")
        .insert([newPage.value]);
      if (error) throw error;
    }
    newPage.value = { title: "", content: "" };
    fetchPages();
    dialog.value = false;
  } catch (error) {
    console.error(error);
  }
};

const editPage = (page) => {
  console.log("Edit page", page);
  dialog.value = true;
  newPage.value = { ...page };
};

const deletePage = async (id) => {
  if (confirm("Are you sure you want to delete this page?")) {
    const { data, error } = await supabase.from("pages").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      fetchPages();
    }
  }
};

const update_content = (content) => {
  newPage.value.content = content;
};

onMounted(() => {
  fetchPages();
});
</script>
