<template>
  <div class="date-time-picker">
    <div class="date-picker">
      <label for="date">Date:</label>
      <input
        type="date"
        id="date"
        v-model="selectedDate"
        @change="updateDateTime"
      />
    </div>
    <div class="time-picker">
      <label for="time">Time:</label>
      <input
        type="time"
        id="time"
        v-model="selectedTime"
        step="60"
        @change="updateDateTime"
      />
    </div>
    <div v-if="showCombinedDateTime">
      <p>Selected Date and Time: {{ combinedDateTime }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const emit = defineEmits(["update"]);

const update = () => {
  emit("update");
};

const selectedDate = ref(new Date().toISOString().split("T")[0]); // Today's date
const selectedTime = ref(new Date().toTimeString().slice(0, 5)); // Current time (HH:mm)
const showCombinedDateTime = ref(true);

const combinedDateTime = computed(() => {
  if (selectedDate.value && selectedTime.value) {
    return `${selectedDate.value} ${selectedTime.value}`;
  }
  return "";
});

const updateDateTime = () => {
  // You can perform any additional logic here when the date or time changes,
  // such as validating the input or making an API call.
  console.log("Date and Time updated:", combinedDateTime.value);
};

// Optional: Watch for changes and emit an event
watch(combinedDateTime, (newValue) => {
  // Emit an event with the updated date and time
  emit("update:modelValue", newValue);
});

// Example of how to set the date and time from parent component
defineExpose({
  setDateAndTime(newDateTime) {
    if (newDateTime) {
      const [datePart, timePart] = newDateTime.split(" ");
      selectedDate.value = datePart;
      selectedTime.value = timePart;
    }
  },
});
</script>

<style scoped>
.date-time-picker {
  display: flex;
  flex-direction: column; /* Stack date and time pickers vertically */
  gap: 10px; /* Add some spacing between elements */
}

.date-picker,
.time-picker {
  display: flex; /* Arrange label and input horizontally */
  align-items: center; /* Vertically align label and input */
}

label {
  margin-right: 10px; /* Add spacing between label and input */
}

.date-picker > input,
.time-picker > input {
  border: 1px solid #ccc; /* Add a border around the input */
  padding: 5px; /* Add some padding inside the input */
}
</style>
