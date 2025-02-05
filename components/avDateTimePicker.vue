<template>
  {{ date }}<br />
  {{ time }}<br />
  {{ dateTime }}<br />

  <v-container>
    <v-text-field
      :label="label"
      v-model="dateTime"
      prepend-icon="mdi-calendar"
      readonly
      @focus="showDatePicker = true"
    ></v-text-field>

    <!-- // if the start field is focused, show the date picker -->
    <v-date-picker
      v-if="showDatePicker"
      v-model="date"
      show-adjacent-months
    ></v-date-picker>

    <!-- // if the start field is focused AND this is not an all day event, show
        the date picker -->
    <av-time-picker
      v-if="showDatePicker && allDay"
      v-model="time"
      :use24HourFormat="false"
    />
  </v-container>
</template>

<script setup>
const { updateCombinedDateTime } = useDateTimeCombiner();

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
  use24HourFormat: {
    type: Boolean,
    default: true,
  },
  allDay: {
    type: Boolean,
    default: true,
  },
  label: {
    type: String,
    default: "Date",
  },
});

const { modelValue, allDay, label } = toRefs(props);

const date = ref(null);
const time = ref(null);

const dateTime = computed(() => {
  return updateCombinedDateTime(date.value, time.value);
});

// watch(start, (newVal) => {
//   console.log("start updated", newVal);
//   start.value = newVal;
// });

// const end = computed(() => {
//   return updateCombinedDateTime(date.value, time.value);
// });

// watch(date, (newVal) => {
//   console.log("date updated", newVal);
//   date.value = newVal;
// });

const showDatePicker = ref(false);
</script>
