<template>
  <div class="mt-15">
    <h1>Calendar</h1>
    <!-- {{ events }} -->
    <br />
    <v-btn @click="openBlankForm">Add Event</v-btn>
    <v-sheet class="d-flex" height="54" tile>
      <v-select
        v-model="type"
        :items="types"
        class="ma-2"
        label="View Mode"
        variant="outlined"
        dense
        hide-details
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        class="ma-2"
        label="weekdays"
        variant="outlined"
        dense
        hide-details
      ></v-select>
    </v-sheet>
    <v-sheet>
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        :view-mode="type"
        :weekdays="weekday"
        @click="openBlankForm"
      >
        <template v-slot:event="{ event, day, allDay }">
          <p
            class="mb-10 pointer"
            v-html="thisEventDescription(event, allDay)"
            @click="openForm(event)"
          ></p>
          <v-chip class="ma-1" x-small @click="openBlankForm(day)">new </v-chip>
        </template>
      </v-calendar>
    </v-sheet>
  </div>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-text style="max-height: 800px; overflow-y: auto">
        <av-calendar-form
          @closeDialog="dialog = false"
          @getEvents="getEvents"
          :formData="formData"
        ></av-calendar-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
const supabase = useSupabaseClient();
const { formatDateString, formatTime } = useFormating();

const newEvent = (day) => {
  console.log("newEvent", day);
};

const nextEvent = (value) => {
  console.log("nextEvent", value);
};

const thisEventDescription = (event) => {
  const eventText = `
  <p class="text-h5 text-center mt-5">${event.title}</p>
  <div v-if="event.allDay === 'false'">
  <p> ${formatTime(event.start)}</p>
  <p> ${formatTime(event.end)}</p>
  </div>
  <div v-else>
    All Day
  </div>
  `;
  return eventText;
};

const openBlankForm = () => {
  formData.value = {
    title: "",
    start: null,
    end: null,
    allDay: false,
    color: "",
  };
  dialog.value = true;
};

const formData = ref({
  id: null,
  title: "",
  start: "",
  end: "",
  allDay: false,
  color: "",
});

const type = ref("month");
const types = ["month", "week", "day"];
const weekday = ref([0, 1, 2, 3, 4, 5, 6]);
const weekdays = [
  { title: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
  { title: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
  { title: "Mon - Fri", value: [1, 2, 3, 4, 5] },
  { title: "Mon, Wed, Fri", value: [1, 3, 5] },
];
const value = ref([new Date()]);
const events = ref([]);
const dialog = ref(false);

const openForm = (event) => {
  console.log("openForm", event);
  formData.value = {
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    allDay: event.allDay,
    color: event.color,
  };
  dialog.value = true;
};

const eventsTest = [
  {
    title: "Weekly Meeting",
    start: new Date("2025-01-23 09:00"),
    end: new Date("2025-01-24 10:00"),
  },
  {
    title: `Thomas' Birthday`,
    start: new Date("2025-01-10"),
    end: new Date("2025-01-10"),
    allDay: true,
  },
  {
    title: "Mash Potatoes",
    start: new Date("2025-01-09 12:30"),
    end: new Date("2025-01-09 15:30"),
  },
];
const savedEvents = ref([]);
const colors = [
  "blue",
  "indigo",
  "deep-purple",
  "cyan",
  "green",
  "orange",
  "grey darken-1",
];
const titles = [
  "Meeting",
  "Holiday",
  "PTO",
  "Travel",
  "Event",
  "Birthday",
  "Conference",
  "Party",
];

const getEvents = async () => {
  const supabase = useSupabaseClient();
  const { data, error } = await supabase.from("calendar_dates").select("*");
  if (error) {
    console.error(error);
  } else {
    events.value = convertEvents(data);
  }
};

const convertEvents = (data) => {
  const convertedEvents = data.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: event.end ? new Date(event.end) : new Date(event.start),
    allDay: event.allDay || false,
    color: event.color || colors[rnd(0, colors.length - 1)],
    title: event.title || "Untitled Event",
  }));
  return convertedEvents;
};

const getEventColor = (event) => {
  return event.color;
};

const rnd = (a, b) => {
  return Math.floor((b - a + 1) * Math.random()) + a;
};

const clickclick = (id) => {
  alert("clickclick", id);
};

onMounted(() => {
  const adapter = useDate();
  getEvents();
  document.addEventListener("DOMContentLoaded", () => {
    const chipContentDiv = document.querySelector(".v-btn");
    if (chipContentDiv) {
      chipContentDiv.addEventListener("click", () => {
        console.log("Chip content clicked!");
        // Your custom logic here
      });
    }
  });
});
</script>

<style scoped>
.eventTitle {
  font-weight: bold;
}

.pointer {
  cursor: pointer;
}
</style>
