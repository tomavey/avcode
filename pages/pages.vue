<template>
  <v-container class="my-10">
    <v-btn @click="dialog = true" color="primary" icon class="mb-3">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-row>
      <v-col v-for="page in pages" :key="page.id" cols="12">
        <v-card>
          <v-card-title>{{ page.title }}</v-card-title>
          <v-card-text v-html="page.content" />
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
          <v-form @submit.prevent="addPage">
            <v-text-field
              v-model="newPage.title"
              label="Title"
              required
            ></v-text-field>
            <av-Tiptap-editor @update-content="update_content" />
            <v-btn type="submit" color="primary">Add Page</v-btn>
          </v-form>
        </v-card-text>
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

const fetchPages = async () => {
  const { data, error } = await supabase.from("pages").select("*");
  if (error) {
    console.error(error);
  } else {
    pages.value = data;
  }
};

const addPage = async () => {
  if (newPage.value.id) {
    const { data, error } = await supabase
      .from("pages")
      .update({ title: newPage.value.title, content: newPage.value.content })
      .eq("id", (newPadialog.data.request = $eventge.value.id));
    if (error) {
      console.error(error);
    } else {
      newPage.value = { title: "", content: "" };
      fetchPages();
    }
    return;
  }
  const { data, error } = await supabase.from("pages").insert([newPage.value]);
  if (error) {
    console.error(error);
  } else {
    newPage.value = { title: "", content: "" };
    fetchPages();
  }
  {
    {
      pages;
    }
  }
};

const editPage = (page) => {
  console.log("Edit page", page);
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
