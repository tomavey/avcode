<template>
  <div>
    <av-date-time-picker />
  </div>
</template>

<script setup>
import { ref } from "vue";

const start = ref(new Date());
</script>
