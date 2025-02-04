<template>
  <div class="time-picker">
    <div class="input-wrapper" @click="isOpen = !isOpen">
      <input
        type="text"
        v-model="formattedTime"
        readonly
        :placeholder="placeholder"
      />
      <span class="clock-icon">&#128343;</span>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="picker-container">
        <div class="time-selection">
          <div class="time-column">
            <label for="hours">Hours:</label>
            <select id="hours" v-model="selectedHours" @change="confirmTime">
              <option v-for="hour in hours" :key="hour" :value="hour">
                {{ formatHour(hour) }}
              </option>
            </select>
          </div>
          <div class="time-column">
            <label for="minutes">Minutes:</label>
            <select id="minutes" v-model="selectedMinutes">
              <option v-for="minute in minutes" :key="minute" :value="minute">
                {{ formatMinute(minute) }}
              </option>
            </select>
          </div>
          <div class="time-column" v-if="showSeconds">
            <label for="seconds">Seconds:</label>
            <select id="seconds" v-model="selectedSeconds">
              <option v-for="second in seconds" :key="second" :value="second">
                {{ formatSecond(second) }}
              </option>
            </select>
          </div>
          <div class="ampm-column" v-if="use24HourFormat === false">
            <select v-model="selectedAMPM" @change="confirmTime">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div class="time-buttons">
          <button @click="confirmTime">OK</button>
          <button @click="isOpen = false">Cancel</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: "Select Time",
  },
  showSeconds: {
    type: Boolean,
    default: false,
  },
  use24HourFormat: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedHours = ref(0);
const selectedMinutes = ref(0);
const selectedSeconds = ref(0);
const selectedAMPM = ref("AM");
const minutesInterval = 10;
const minutesLength = 60 / minutesInterval;

const hours = computed(() =>
  Array.from({ length: props.use24HourFormat ? 24 : 12 }, (_, i) => i)
);
const minutes = computed(() =>
  Array.from({ length: minutesLength }, (_, i) => i * minutesInterval)
);
const seconds = computed(() => Array.from({ length: 60 }, (_, i) => i));

const formattedTime = computed({
  get() {
    if (props.modelValue) {
      return props.modelValue;
    }
    let formatted = `${formatHour(selectedHours.value)}:${formatMinute(
      selectedMinutes.value
    )}`;
    if (props.showSeconds) {
      formatted += `:${formatSecond(selectedSeconds.value)}`;
    }
    if (!props.use24HourFormat) {
      formatted += ` ${selectedAMPM.value}`;
    }
    return formatted;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  },
});

const formatHour = (hour) => {
  return String(props.use24HourFormat ? hour : hour % 12 || 12).padStart(
    2,
    "0"
  );
};

const formatMinute = (minute) => String(minute).padStart(2, "0");
const formatSecond = (second) => String(second).padStart(2, "0");

const confirmTime = () => {
  let hoursToSet = selectedHours.value;
  if (!props.use24HourFormat) {
    hoursToSet =
      selectedAMPM.value === "PM" && selectedHours.value !== 12
        ? selectedHours.value + 12
        : selectedAMPM.value === "AM" && selectedHours.value === 12
        ? 0
        : selectedHours.value;
  }
  const timeString = `${formatHour(hoursToSet)}:${formatMinute(
    selectedMinutes.value
  )}${props.showSeconds ? `:${formatSecond(selectedSeconds.value)}` : ""}${
    !props.use24HourFormat ? ` ${selectedAMPM.value}` : ""
  }`;
  emit("update:modelValue", timeString);
  isOpen.value = false;
};

onMounted(() => {
  setTimeFromModelValue();
});

watch(props, () => {
  setTimeFromModelValue();
});

const setTimeFromModelValue = () => {
  if (props.modelValue && typeof props.modelValue === "string") {
    // Check if it's a string
    const [timePart, ampm] = props.modelValue.split(" "); // Handle AM/PM
    const [hours, minutes, seconds] = timePart.split(":").map(Number);

    selectedHours.value = hours;
    selectedMinutes.value = minutes;

    if (props.showSeconds && seconds) {
      selectedSeconds.value = seconds;
    }

    if (!props.use24HourFormat && ampm) {
      selectedAMPM.value = ampm;
    }
  } else {
    // Handle the case where modelValue is null or not a valid string
    // You might want to set default values or show a warning
    if (!props.modelValue) {
      // Set default only if modelValue is null or undefined
      const now = new Date();
      selectedHours.value = now.getHours();
      selectedMinutes.value = now.getMinutes();
      selectedSeconds.value = props.showSeconds ? now.getSeconds() : 0;
      selectedAMPM.value = now.getHours() < 12 ? "AM" : "PM";
    }
  }
};
</script>

<style scoped>
.time-picker {
  position: relative; /* For positioning the dropdown */
  display: inline-block; /* Or block, depending on desired layout */
  width: fit-content; /* Adjust as needed */
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  background-color: #fff; /* Prevents transparency issues */
  transition: border-color 0.2s ease; /* Smooth transition for focus */
}

.input-wrapper:hover {
  border-color: #007bff; /* Highlight on hover */
}

.input-wrapper:focus-within {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2); /* Subtle focus ring */
  outline: none; /* Remove default outline */
}

.clock-icon {
  margin-left: 8px;
  color: #777; /* Slightly darker icon color */
}

.picker-container {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  z-index: 10;
  padding: 10px;
  border-radius: 4px;
  min-width: 150px; /* Or adjust as needed */
  background-color: #f9f9f9; /* A slightly off-white background */
}

.time-selection {
  display: flex;
  gap: 10px;
}

.time-column {
  display: flex;
  flex-direction: column;
}

.time-column label {
  font-size: 0.8rem;
  margin-bottom: 4px;
  color: #555; /* Darker label color */
}

.time-column select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  appearance: none; /* Improve select styling */
  -webkit-appearance: none; /* For Safari */
  -moz-appearance: none; /* For Firefox */
  background: url("data:image/svg+xml;utf8,<svg fill='%23777' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")
    no-repeat right 8px center; /* Add dropdown arrow */
  background-size: 16px;
  padding-right: 30px; /* Make space for arrow */
  transition: border-color 0.2s ease;
}

.time-column select:hover {
  border-color: #007bff;
}

.time-column select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.2);
}

.time-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 5px;
}

.time-buttons button {
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.time-buttons button:hover {
  background-color: #0056b3; /* Darker on hover */
}

.time-buttons button:focus {
  outline: none;
  box-shadow: 0 0 3px rgba(0, 123, 255, 0.3);
}

/* Transitions (from previous example) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
