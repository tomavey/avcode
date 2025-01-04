<template>
  <v-container>
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
          <v-btn block @click="addPage" color="primary">Add Page</v-btn>
          <div v-if="makeNav">
            <v-alert class="text-center my-5" type="success">
              These fields make this page show up in the navigation drawer as a
              menu item.
            </v-alert>
            <v-text-field
              v-model="newPage.nav_name"
              label="Nav Name"
            ></v-text-field>
            <v-text-field
              v-model="newPage.nav_path"
              label="Nav Path"
            ></v-text-field>
            <v-text-field
              v-model="newPage.nav_icon"
              label="Nav Icon"
            ></v-text-field>
            <v-text-field
              v-model="newPage.nav_order"
              label="Nav Order"
              type="number"
            ></v-text-field>
            <v-text-field
              v-model="newPage.nav_rights"
              label="Nav Rights"
            ></v-text-field>
          </div>
          <v-btn
            icon
            elevation="0"
            style="float: right"
            @click="makeNav = !makeNav"
            ><v-icon>mdi-menu-down-outline </v-icon>
            <v-tooltip activator="parent" location="start"
              >Toggle fields that turn this page into a nav drawer
              item</v-tooltip
            ></v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const pageTitle = ref("pages");

const makeNav = ref(false);

const newPage = ref({
  title: "",
  content: "",
});
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
const update_content = (content) => {
  newPage.value.content = content;
};
</script>
