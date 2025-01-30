<template>
  <v-container class="calendar-form">
    {{ formData }}<br /><br />
    combinedStart: {{ combinedStart }}<br />
    <v-form>
      <v-text-field label="Title" v-model="formData.title"></v-text-field>

      <v-checkbox v-model="formData.allDay" label="All Day"></v-checkbox>

      <div v-if="!formData.allDay">
        <v-text-field
          label="Start"
          v-model="formData.startDate"
          prepend-icon="mdi-calendar"
          readonly
          @focus="showDateStartPicker = true"
        ></v-text-field>

        <v-date-picker
          v-if="showDateStartPicker"
          v-model="formData.startDate"
          show-adjacent-months
          @click="showDateStartPicker = false"
        ></v-date-picker>

        {{ formData.startTime }}<br />
        {{ updated }}

        <v-time-picker
          v-if="formData.startDate"
          v-model="formData.startTime"
          :allowed-hours="allowedHours"
          :allowed-minutes="allowedMinutes"
          format="24hr"
          max="22:15"
          min="9:30"
          scrollable
          title="Start Time"
        ></v-time-picker>

        <v-text-field
          label="End"
          v-model="formData.endDate"
          prepend-icon="mdi-calendar"
          readonly
          @focus="showDateEndPicker = true"
        ></v-text-field>

        <v-date-picker
          v-if="showDateEndPicker"
          v-model="formData.endDate"
          @click="showDateEndPicker = false"
          show-adjacent-months
        ></v-date-picker>

        {{ formData.endTime }}

        <v-time-picker
          v-if="formData.start"
          v-model="formData.endTime"
          :allowed-hours="allowedHours"
          :allowed-minutes="allowedMinutes"
          format="24hr"
          max="22:15"
          min="9:30"
          scrollable
          title="End Time"
          false
        ></v-time-picker>

        <v-color-picker v-model="formData.color" label="Color"></v-color-picker>
      </div>
      <v-btn color="primary" @click="submitForm(formData)">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
const { updateCombinedDateTime } = useDateTimeCombiner();
const emit = defineEmits(["closeDialog", "getEvents"]);
const props = defineProps(["formData"]);

const formData = props.formData;

const closeDialog = () => {
  emit("closeDialog");
};

const getEvents = () => {
  emit("getEvents");
};

const updated = ref("Not");

const combinedStart = ref("");
const combinedEnd = ref("");

watch(formData, (newVal) => {
  console.log("formData updated", newVal);
  combinedStart.value = updateCombinedDateTime(
    newVal.startDate,
    newVal.startTime
  );
  // updated.value = "Updated";
});

const supabase = useSupabaseClient();
const { user } = useAuth();

const timeStep = ref("10:10");
const allowedHours = (v) => v % 2;
const allowedMinutes = (v) => v >= 10 && v <= 50;
const allowedStep = (m) => m % 10 === 0;

const showDateStartPicker = ref(false);
const showDateEndPicker = ref(false);

const title = ref("");
const start = ref(null);
const end = ref(null);
const color = ref("");
const allDay = ref(false);
const menuStart = ref(false);
const menuEnd = ref(false);

const submitForm = async (formData) => {
  console.log("submitting form", formData);
  const obj = {
    title: formData.title,
    start: formData.start,
    end: formData.end,
    color: formData.color,
    allDay: formData.allDay,
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
