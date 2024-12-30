<template>
  <v-container class="my-10">
    <v-row>
      <v-col v-for="page in pages" :key="page.id" cols="12">
        <v-card>
          <v-card-title>{{ page.title }}</v-card-title>
          <v-card-text v-html="page.content" />
          <v-card-actions>
            <v-btn :href="`/page?id=${page.id}`" color="primary"
              >View Page</v-btn
            >
            <v-btn @click="editPage(page)" color="secondary">Edit Page</v-btn>
            <v-btn @click="defineLazyEventHandler            <v-btn @click="editPage(page)" color="secondary">Edit Page</v-btn>
            Page(page)" color="secondary">Edit Page</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-form @submit.prevent="addPage">
      <v-text-field
        v-model="newPage.title"
        label="Title"
        required
      ></v-text-field>
      <tiptap-editor @update-content="update_content" />
      <v-btn type="submit" color="primary">Add Page</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
const supabase = useSupabaseClient();
const pageTitle = ref("pages");

const pages = ref([]);

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

const update_content = (content) => {
  newPage.value.content = content;
};

onMounted(() => {
  fetchPages();
});
</script>
