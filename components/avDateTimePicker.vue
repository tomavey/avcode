<template>
  <v-container>
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
  </v-container>
</template>

<script setup>
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
});

const start = ref(new Date());

const showDateStartPicker = ref(false);
</script>
