<template>
  <div class="date-picker">
    <div class="input-wrapper" @click="togglePicker">
      <input
        type="text"
        v-model="formattedDate"
        readonly
        :placeholder="placeholder"
      />
      <span class="calendar-icon">&#128197;</span>
    </div>
    <transition name="fade">
      <div v-if="isOpen" class="picker-container">
        <div class="calendar-header">
          <button @click="prevMonth">&lt;</button>
          <span>{{ currentMonthName }} {{ currentYear }}</span>
          <button @click="nextMonth">&gt;</button>
        </div>
        <div class="days-of-week">
          <span v-for="day in daysOfWeek" :key="day">{{ day }}</span>
        </div>
        <div class="calendar-grid">
          <button
            v-for="day in days"
            :key="day.date"
            :class="[
              'day',
              {
                active: isSameDay(day.date, selectedDate),
                today: isSameDay(day.date, today),
              },
            ]"
            @click="selectDate(day.date)"
          >
            {{ day.day }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDateFormat } from "@vueuse/core"; // For formatting (optional, but recommended)

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
  placeholder: {
    type: String,
    default: "Select Date",
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedDate = ref(props.modelValue ? new Date(props.modelValue) : null);
const currentDate = ref(
  props.modelValue ? new Date(props.modelValue) : new Date()
);
const isOpen = ref(false);
const today = new Date();

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const currentMonth = computed(() => currentDate.value.getMonth());
const currentYear = computed(() => currentDate.value.getFullYear());

const currentMonthName = computed(() => {
  const options = { month: "long" };
  return currentDate.value.toLocaleDateString("en-US", options);
});

const days = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value + 1, 0);
  const numDaysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay(); // 0 (Sunday) to 6 (Saturday)

  const allDays = [];
  let dayCounter = 1;

  // Add leading days from the previous month
  for (let i = startDay; i > 0; i--) {
    const prevMonthLastDay = new Date(
      currentYear.value,
      currentMonth.value,
      0
    ).getDate();
    allDays.push({
      day: prevMonthLastDay - i + 1,
      date: new Date(
        currentYear.value,
        currentMonth.value - 1,
        prevMonthLastDay - i + 1
      ),
      isFiller: true,
    });
  }

  // Add days of the current month
  for (let i = 1; i <= numDaysInMonth; i++) {
    allDays.push({
      day: i,
      date: new Date(currentYear.value, currentMonth.value, i),
    });
  }

  // Add trailing days from the next month (if needed to fill the grid)
  const remainingDays = 42 - allDays.length; // 42 is a common grid size (6 weeks * 7 days)
  for (let i = 1; i <= remainingDays; i++) {
    allDays.push({
      day: i,
      date: new Date(currentYear.value, currentMonth.value + 1, i),
      isFiller: true,
    });
  }
  return allDays;
});

const formattedDate = computed({
  get() {
    if (selectedDate.value) {
      const { formatDate } = useDateFormat(selectedDate.value, "YYYY-MM-DD"); // You can change the format
      return formatDate.value;
    }
    return "";
  },
  set(newValue) {
    // You generally wouldn't set the formatted date directly, but you could parse it here if needed.
    // For example:
    // const parsedDate = new Date(newValue)
    // selectDate(parsedDate)
  },
});

const togglePicker = () => {
  isOpen.value = !isOpen.value;
};

const selectDate = (date) => {
  selectedDate.value = date;
  emit("update:modelValue", date);
  isOpen.value = false; // Close after selection
  currentDate.value = date ? new Date(date) : new Date(); // Reset currentDate to the selected date for better UX
};

const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
};

const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

onMounted(() => {
  if (props.modelValue) {
    currentDate.value = new Date(props.modelValue);
  }
});
</script>

<style scoped>
.date-picker {
  position: relative;
  display: inline-block; /* So it doesn't take full width */
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
}

.calendar-icon {
  margin-left: 8px;
}

.picker-container {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  z-index: 10; /* Ensure it's on top */
  padding: 10px;
  border-radius: 4px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.calendar-header button {
  padding: 5px 10px;
  border: none;
  background: none;
  cursor: pointer;
}

.days-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 5px;
}

.days-of-week span {
  text-align: center;
  font-weight: bold;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day {
  padding: 8px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
}

.day.active {
  background-color: #007bff; /* Or your preferred color */
  color: white;
}

.day.today {
  border: 1px solid #007bff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
