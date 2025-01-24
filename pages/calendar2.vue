<template>
  <div id="app">
    <div class="calendar">
      <div class="header">
        <button @click="prevMonth">Previous</button>
        <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
        <button @click="nextMonth">Next</button>
      </div>
      <div class="weekdays">
        <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
      </div>
      <div class="days">
        <div v-for="blank in blanks" :key="blank" class="blank"></div>
        <div
          v-for="(date, index) in daysInMonth"
          :key="index"
          class="day"
          @click="selectDate(date)"
        >
          {{ date }}
          <div style="white-space: normal">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      selectedDate: null,
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  computed: {
    daysInMonth() {
      const days = new Date(
        this.currentYear,
        this.currentMonth + 1,
        0
      ).getDate();
      return Array.from({ length: days }, (_, i) => i + 1);
    },
    blanks() {
      const firstDay = new Date(
        this.currentYear,
        this.currentMonth,
        1
      ).getDay();
      return Array.from({ length: firstDay });
    },
  },
  methods: {
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    },
    selectDate(date) {
      this.selectedDate = new Date(this.currentYear, this.currentMonth, date);
      alert(`Selected date: ${this.selectedDate.toDateString()}`);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

.calendar {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.weekdays,
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.weekdays div,
.days div {
  padding: 10px;
  text-align: center;
}

.blank {
  background-color: #f0f0f0;
}

.day {
  cursor: pointer;
  background-color: #e0e0e0;
  border-radius: 5px;
}

.day:hover {
  background-color: #d0d0d0;
}
</style>
