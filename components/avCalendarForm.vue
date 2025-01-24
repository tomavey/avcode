<template>
  <v-container class="calendar-form">
    <!-- {{ formData }} -->
    <v-form>
      <v-text-field label="Title" v-model="formData.title"></v-text-field>
      <v-text-field
        label="Start"
        v-model="formData.start"
        prepend-icon="mdi-calendar"
        readonly
        @focus="showDateStartPicker = true"
      ></v-text-field>
      <v-date-picker
        v-if="showDateStartPicker"
        v-model="formData.start"
        show-adjacent-months
        @click="showDateStartPicker = false"
      ></v-date-picker>
      <v-text-field
        label="End"
        v-model="formData.end"
        prepend-icon="mdi-calendar"
        readonly
        @focus="showDateEndPicker = true"
      ></v-text-field>
      <v-date-picker
        v-if="showDateEndPicker"
        v-model="formData.end"
        @click="showDateEndPicker = false"
        show-adjacent-months
      ></v-date-picker>

      <v-color-picker v-model="formData.color" label="Color"></v-color-picker>
      <v-checkbox v-model="formData.all_day" label="All Day"></v-checkbox>
      <v-btn color="primary" @click="submitForm">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { formatDate, get } from "@vueuse/core";

const emit = defineEmits("closeDialog", getEvents);
const props = defineProps(["formData"]);

const closeDialog = () => emit("closeDialog");
const getEvents = () => emit("getEvents");

const supabase = useSupabaseClient();
const { user } = useAuth();

const showDateStartPicker = ref(false);
const showDateEndPicker = ref(false);

const title = ref("");
const start = ref(null);
const end = ref(null);
const color = ref("");
290;
const all_day = ref(false);
const menuStart = ref(false);
const menuEnd = ref(false);

const submitForm = async () => {
  const obj = {
    title: title.value,
    start: start.value,
    end: end.value,
    color: color.value,
    all_day: all_day.value,
    email: user.value.email,
    created_at: new Date(),
    created_by: user.value.id,
  };
  console.log(obj);

  const { data, error } = await supabase
    .from("calendar_dates")
    .insert(obj)
    .select("*");

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully:", data);
    getEvents();
    closeDialog();
  }
};
</script>

<style scoped>
.calendar-form {
  background-color: white;
}
</style>
