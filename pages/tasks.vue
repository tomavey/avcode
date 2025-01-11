<template>
  <v-container class="my-10">
    <v-btn
      @click="
        dialog = true;
        newPage = {};
      "
      color="primary"
      icon
      class="mb-3"
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
      <v-col v-for="task in sortedTasks" :key="task.id" cols="12">
        <v-card>
          <v-card-title>{{ task.title.toString() }}</v-card-title>
          <v-card-text v-html="task.description" />
          <v-card-text v-if="task.status" v-html="task.status" />
          <v-card-text v-html="formatDate(task.due_date)" style="float: left" />
          <v-card-actions style="float: right">
            <!-- <v-btn :href="`/${page.id}`" color="primary" icon
              ><v-icon>mdi-eye</v-icon></v-btn
            > -->
            <v-btn @click="editTask(task)" color="secondary" icon
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn @click="deleteTask(task.id)" color="error" icon
              ><v-icon>mdi-trash-can</v-icon></v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-text style="max-height: 600px; overflow-y: auto">
          <av-task-form
            :newTask="newTask"
            @closeDialog="closeDialog"
            @fetchTasks="fetchTasks"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
const supabase = useSupabaseClient();
const pageTitle = ref("pages");
const { formatDate } = useFormating();

const tasks = ref([]);

const dialog = ref(false);

const makeNav = ref(false);

const newTask = ref({
  title: "",
  description: "",
  due_date: null,
  status: "",
});

const sortBy = ref("title");

const sortOptions = [
  { text: "Title", value: "title" },
  { text: "ID", value: "id" },
  { text: "Created", value: "created_at" },
];

const searchQuery = ref("");

const filteredTasks = computed(() => {
  if (!searchQuery.value) {
    return tasks.value;
  }
  return tasks.value.filter((task) => {
    const query = searchQuery.value.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query)
    );
  });
});

const sortedTasks = computed(() => {
  return [...filteredTasks.value].sort((a, b) => {
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

const fetchTasks = async () => {
  const { data, error } = await supabase.from("tasks").select("*");
  if (error) {
    console.error(error);
  } else {
    tasks.value = data;
  }
};

const editTask = (task) => {
  console.log("Edit task", task);
  newTask.value = { ...task };
  dialog.value = true;
};

const deleteTask = async (id) => {
  if (confirm("Are you sure you want to delete this task?")) {
    const { data, error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      fetchTasks();
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
  fetchTasks();
});
</script>
