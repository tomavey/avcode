<template>
  <div>
    <av-date-time-picker :formData="formData" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const start = ref(new Date());

const formData = ref({
  id: null,
  title: "",
  start: "",
  end: "",
  startDate: "",
  startTime: "",
  endDate: "",
  endTime: "",
  allDay: true,
  color: "",
});
</script>
