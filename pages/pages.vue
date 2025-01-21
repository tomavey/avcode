<template>
  <v-container>
    <v-btn
      @click="
        dialog = true;
        newPage = {};
      "
      color="primary"
      icon
      class="mb-3"
      v-if="isLoggedIn"
    >
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
          <v-card-subtitle
            v-if="page.nav_name"
            style="float: right"
            v-html="`/${page.nav_path}`"
          />

          <v-card-actions>
            <v-btn :href="`/${page.id}`" color="primary" icon
              ><v-icon>mdi-eye</v-icon></v-btn
            >
            <v-btn
              v-if="isLoggedIn"
              @click="editPage(page)"
              color="secondary"
              icon
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn
              v-if="isLoggedIn"
              @click="deletePage(page.id)"
              color="error"
              icon
              ><v-icon>mdi-trash-can</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-text style="max-height: 600px; overflow-y: auto">
          <av-page-form
            :newPage="newPage"
            @closeDialog="closeDialog"
            @fetchPages="fetchPages"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
const supabase = useSupabaseClient();
const { isLoggedIn } = useAuth();
const pageTitle = ref("pages");

const pages = ref([]);

const dialog = ref(false);

const makeNav = ref(false);

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

const editPage = (page) => {
  // console.log("Edit page", page);
  newPage.value = { ...page };
  // console.log("New page", newPage.value);
  dialog.value = true;
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

const closeDialog = () => {
  dialog.value = false;
};

onMounted(() => {
  fetchPages();
});
</script>
