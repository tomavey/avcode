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
            tabindex="1"
            class="title_input"
          ></v-text-field>
          <av-Tiptap-editor
            @update-content="update_content"
            v-model="newPage.content"
            tabindex="2"
            class="content_input"
          />
          <div v-if="makeNav">
            <v-alert class="text-center my-5" type="success">
              These fields make this page show up in the navigation drawer as a
              menu item.
            </v-alert>
            <div class="grid">
              <v-text-field
                v-model="newPage.nav_name"
                label="Name"
                class="input"
              ></v-text-field>
              <v-text-field
                v-model="newPage.nav_path"
                label="Path"
                class="input"
              ></v-text-field>
              <v-text-field
                v-model="newPage.nav_icon"
                label="Icon"
                class="input"
              ></v-text-field>
              <v-text-field
                v-model="newPage.nav_sort_order"
                label="Order"
                type="number"
                class="input"
              ></v-text-field>
              <v-text-field
                v-model="newPage.nav_rights"
                label="Rights"
                class="input"
              ></v-text-field>
            </div>
          </div>
          <v-row class="mt-3">
            <v-col cols="11">
              <v-btn block @click="addPage" color="primary">Add Page</v-btn>
            </v-col>
            <v-col>
              <v-btn
                density="compact"
                icon
                elevation="0"
                style="float: right"
                @click="handleMakeNav()"
              >
                <v-icon>{{
                  !makeNav ? "mdi-menu-down-outline" : "mdi-menu-up-outline"
                }}</v-icon>
                <v-tooltip activator="parent" location="start"
                  >Toggle fields that turn this page into a nav drawer
                  item</v-tooltip
                ></v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const supabase = useSupabaseClient();

const emit = defineEmits(["closeDialog", "fetchPages"]);

const closeDialog = () => {
  emit("closeDialog");
};

const fetchPages = () => {
  emit("fetchPages");
};

const props = defineProps({
  newPage: Object,
});

const newPage = ref(props.newPage);

const pageTitle = ref("pages");

const makeNav = ref(false);

const handleMakeNav = () => {
  makeNav.value = !makeNav.value;
};

const addPage = async () => {
  try {
    const { id, ...pageData } = newPage.value;
    let response;

    if (id) {
      response = await supabase.from("pages").update(pageData).eq("id", id);
    } else {
      response = await supabase.from("pages").insert([pageData]);
    }

    const { data, error } = response;

    if (error) throw error;

    newPage.value = {
      title: "",
      content: "",
      nav_name: "",
      nav_path: "",
      nav_icon: "",
      nav_order: "",
      nav_rights: "",
    };
    fetchPages();
    closeDialog();
  } catch (error) {
    console.error(error);
  }
};
const update_content = (content) => {
  newPage.value.content = content;
};
pageTitle.value = newPage.value.title ? "Edit" : "Add";
watchEffect(() => {
  newPage.value.nav_name ? (makeNav.value = true) : (makeNav.value = false);
});

// onMounted(() => {
//   nextTick(() => {
//     document.querySelector(".content_input input").focus();
//   });
// });
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
