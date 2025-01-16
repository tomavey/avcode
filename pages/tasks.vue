<template>
  <v-container class="my-10">
    <v-btn
      v-if="isLoggedIn"
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
          <v-card-text v-if="!isLoggedIn" v-html="task.status" />

          <av-task-form-status-radio
            v-if="isLoggedIn"
            :statusOptions="statusOptions"
            :task="task"
            @updateTaskStatus="updateTaskStatus(task)"
            :updateTaskStatusNow="true"
          />
          <v-card-text v-html="`Due: ${formatDate(task.due_date)}`" />
          <v-card-actions style="float: right">
            <!-- <v-btn :href="`/${page.id}`" color="primary" icon
              ><v-icon>mdi-eye</v-icon></v-btn
            > -->
            <v-btn
              v-if="isLoggedIn"
              @click="editTask(task)"
              color="secondary"
              icon
              ><v-icon>mdi-pencil</v-icon></v-btn
            >
            <v-btn
              v-if="isLoggedIn"
              @click="deleteTask(task.id)"
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
const { statusOptions, updateTaskStatus } = useTasks();
const { isLoggedIn } = useAuth();

const tasks = ref([]);

const dialog = ref(false);

const makeNav = ref(false);

const newTask = ref({
  title: "",
  description: "",
  due_date: null,
  status: "todo",
});

const sortBy = ref("title");

const sortOptions = [
  { text: "Title", value: "title" },
  { text: "Status", value: "status" },
  { text: "Created", value: "created_at" },
];

const getSortOptionText = (value) => {
  const option = statusOptions.find((option) => option.value === value);
  return option ? option.text : "";
};

const searchQuery = ref("");

const filteredTasks = computed(() => {
  if (!searchQuery.value) {
    return tasks.value;
  }
  return tasks.value.filter((task) => {
    const query = searchQuery.value.toLowerCase();
    return (
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.status.toLowerCase().includes(query)
    );
  });
});

const sortedTasks = computed(() => {
  return [...filteredTasks.value].sort((a, b) => {
    if (sortBy.value === "status") {
      return a.status.localeCompare(b.status);
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
