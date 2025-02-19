<template>
  <div class="date-time-picker">
    <flat-pickr v-model="date" :config="config" />
  </div>
  {{ date }}
</template>
altFormat: "F j, Y - h:m K",

<script setup>
import { onMounted, ref } from "vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,  altFormat: "F j, Y - h:m K",

  },
});

const emit = defineEmits(["update"]);

const update = () => {
  emit("update");
};

const myDatepicker = ref(null);

const date = ref("");

const { $flatpickr } = useNuxtApp(); // Access the provided flatpickr

const config = ref({
  wrap: true, // set wrap to true only when using 'input-group'
  altInput: true,
  enableTime: true,
});

watch(date, (newValue) => {
  emit("update", newValue);
});

// onMounted(() => {
//   if (myDatepicker.value) {
//     $flatpickr(myDatepicker.value, {
//       enableTime: true, // Set to true for time picking
//       altInput: true,
//       altFormat: "F j, Y - h: m K", // Customize the date format",
//       dateFormat: "Y-m-d", // Customize date format
//       // ... other flatpickr options
//     });
//   }
// });

// // Optional: Destroy flatpickr instance on unmount to prevent memory leaks
// onUnmounted(() => {
//   if (myDatepicker.value && myDatepicker.value._flatpickr) {
//     // Check if flatpickr instance exists
//     myDatepicker.value._flatpickr.destroy();
//   }
// });
</script>

<style scoped>
.date-time-picker {
  border: 1px solid #ccc;
}
</style>
