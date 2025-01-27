<template>
  <v-container class="calendar-form">
    {{ formData }}
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
      <v-row justify="space-around">
        <v-time-picker v-if="modal2" v-model="time"></v-time-picker>
        <v-time-picker
          v-model="startTime"
          :allowed-hours="allowedHours"
          :allowed-minutes="allowedMinutes"
          format="24hr"
          max="22:15"
          min="9:30"
          scrollable
        ></v-time-picker>
      </v-row>
      <v-btn color="primary" @click="submitForm(formData)">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
const emit = defineEmits(["closeDialog", "getEvents"]);
const props = defineProps(["formData"]);

const formData = toRef(props.formData);

const closeDialog = () => {
  emit("closeDialog");
};

const modeal2 = ref();

const getEvents = () => {
  emit("getEvents");
};

const supabase = useSupabaseClient();
const { user } = useAuth();

const showDateStartPicker = ref(false);
const showDateEndPicker = ref(false);

const title = ref("");
const start = ref(null);
const end = ref(null);
const color = ref("");
const all_day = ref(false);
const menuStart = ref(false);
const menuEnd = ref(false);

const submitForm = async (formData) => {
  console.log("submitting form", formData);
  const obj = {
    title: formData.title,
    start: formData.start,
    end: formData.end,
    color: formData.color,
    all_day: formData.all_day,
    email: user.value.email,
    created_at: new Date(),
    created_by: user.value.id,
  };
  if (formData.id) {
    obj.id = formData.id;
  }
  console.log(obj);

  const { data, error } = await supabase
    .from("calendar_dates")
    .upsert(obj)
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
