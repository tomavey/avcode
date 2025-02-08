<template>
  <div>
    <date-time-picker
      v-model="date"
      :label="timePickerLabel"
      @update="update"
    />
    <br />
    <br />
    <br />
    <p>myUTCDateTime:{{ myUTCDateTime }}</p>
    <p>myISODateTime:{{ myISODateTime }}</p>
    <p>myLocaleStringDateTime:{{ myLocaleStringDateTime }}</p>
    <p>myUseDate:{{ myUseDate }}</p>
    <p>Date for the parent component:{{ date }}</p>
    {{ formatted }}

    <!-- <av-date-time-picker
      @update="update"
      v-model="myUseDate"
      :label="timePickerLabel"
    /> -->
  </div>
</template>

<script setup>
import { useDateFormat, useNow } from "@vueuse/core";
import { ref } from "vue";
const { formatDateString, formatTime, formatDate } = useFormating();
const date = ref(null);

const timePickerLabel = ref("Time Picker");

const update = (value) => {
  console.log("update", value);
  date.value = value;
};

const myUTCDateTime = computed(() => {
  const newDate = new Date(date.value);
  return newDate.toUTCString();
});

const myISODateTime = computed(() => {
  const newDate = new Date(date.value);
  return newDate.toISOString();
});

const myLocaleStringDateTime = computed(() => {
  const newDate = new Date(date.value);
  const dateTimeOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return newDate.toUTCString().toLocaleString(dateTimeOptions);
});

const myUseDate = computed(() => {
  let newDate = new Date(date.value);
  return formatDate(newDate, "long") + " " + formatTime(newDate);
});

const formatted = useDateFormat(myUTCDateTime, "YYYY-MM-DD HH:mm:ss");
</script>
