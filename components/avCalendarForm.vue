<template>
  <v-container class="calendar-form">
    {{ formData }}<br /><br />
    <v-form>
      <v-text-field label="Title" v-model="formData.title"></v-text-field>

      <v-checkbox v-model="formData.allDay" label="All Day"></v-checkbox>

      <div>
        <v-text-field
          label="Start"
          v-model="start"
          prepend-icon="mdi-calendar"
          readonly
          @focus="showDateStartPicker = true"
        ></v-text-field>

        <!-- // if the start field is focused, show the date picker -->
        <v-date-picker
          v-if="showDateStartPicker"
          v-model="formData.startDate"
          show-adjacent-months
        ></v-date-picker>

        <!-- // if the start field is focused AND this is not an all day event, show
        the date picker -->
        <av-time-picker
          v-if="showDateStartPicker && !formData.allDay"
          v-model="formData.startTime"
          :use24HourFormat="false"
        />

        <v-text-field
          label="End"
          v-model="end"
          prepend-icon="mdi-calendar"
          readonly
          @focus="showDateEndPicker = true"
        ></v-text-field>

        <div v-if="showDateStartPicker" class="mb-5">
          <v-date-picker
            v-model="formData.endDate"
            @click="showDateEndPicker = false"
            show-adjacent-months
          ></v-date-picker>

          <av-time-picker
            v-model="formData.endTime"
            :use24HourFormat="false"
            @update:model-value="update"
          />
        </div>

        <v-color-picker v-model="formData.color" label="Color"></v-color-picker>
      </div>
      <v-btn color="primary" @click="submitForm(formData)">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
const { updateCombinedDateTime } = useDateTimeCombiner();
const supabase = useSupabaseClient();
const { user } = useAuth();

const emit = defineEmits(["closeDialog", "getEvents"]);
const props = defineProps(["formData"]);

const formData = props.formData;

const closeDialog = () => {
  emit("closeDialog");
};

const getEvents = () => {
  emit("getEvents");
};

const start = computed(() => {
  return updateCombinedDateTime(
    formData.value.startDate,
    formData.value.startTime
  );
});

watch(start, (newVal) => {
  console.log("start updated", newVal);
  formData.value.start = newVal;
});

const end = computed(() => {
  return updateCombinedDateTime(formData.value.endDate, formData.value.endTime);
});

watch(end, (newVal) => {
  console.log("end updated", newVal);
  formData.value.end = newVal;
});

const allowedHours = (v) => v % 2;
const allowedMinutes = (v) => v >= 10 && v <= 50;

const showDateStartPicker = ref(false);
const showDateEndPicker = ref(false);

const update = (value) => {
  console.log("update", value);
};

const submitForm = async (formData) => {
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
