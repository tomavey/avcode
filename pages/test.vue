<template>
  <div>
    <av-time-picker v-model="start" :use24HourFormat="false" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const start = ref(new Date());
</script>
