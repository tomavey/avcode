<template>
  <v-container>
    <v-card>
      <v-card-title>{{ newTask.id ? "Edit" : "Add" }} Task</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="newTask.title"
            label="Title"
            required
          ></v-text-field>
          <av-Tiptap-editor
            :showToolbar="false"
            @update-content="update_content"
            v-model="newTask.description"
          />
          <v-text-field
            v-model="newTask.due_date"
            label="Due Date"
            prepend-icon="mdi-calendar"
            readonly
            @focus="showDatePicker = true"
          ></v-text-field>
          <av-task-form-status-radio
            :statusOptions="statusOptions"
            :task="newTask"
            @updateTaskStatus="updateTaskStatus(task)"
            :updateTaskStatusNow="false"
          />
          <v-date-picker
            v-if="showDatePicker"
            v-model="newTask.due_date"
            show-adjacent-months
          ></v-date-picker>

          <v-row class="mt-3">
            <v-col cols="12">
              <v-btn block @click="addTask" color="primary">Add Task</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const supabase = useSupabaseClient();
const { statusOptions, updateTaskStatus } = useTasks();

const emit = defineEmits(["closeDialog", "fetchTasks"]);

const closeDialog = () => {
  emit("closeDialog");
};

const showDatePicker = ref(false);

const fetchTasks = () => {
  emit("fetchTasks");
};

const props = defineProps({
  newTask: Object,
});

const newTask = ref(props.newTask);

const pageTitle = ref("pages");

const makeNav = ref(false);

const handleMakeNav = () => {
  makeNav.value = !makeNav.value;
};

const addTask = async () => {
  try {
    const { id, ...taskData } = newTask.value;
    let response;

    console.log("newTask", newTask.value);
    console.log("taskData", taskData);

    if (id) {
      response = await supabase.from("tasks").update(taskData).eq("id", id);
    } else {
      response = await supabase.from("tasks").insert([taskData]);
    }

    const { data, error } = response;

    if (error) throw error;

    newTask.value = {
      title: "",
      description: "",
      due_date: null,
      status: "",
    };
    fetchTasks();
    closeDialog();
  } catch (error) {
    console.error(error);
  }
};
const update_content = (content) => {
  newTask.value.description = content;
};

watchEffect(() => {
  newTask.value.nav_name ? (makeNav.value = true) : (makeNav.value = false);
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
