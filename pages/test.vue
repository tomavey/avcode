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
    <p>{{ formatted }}</p>

    <v-btn @click="modalOpen = true">
      Open full screen modal! (With teleport!)
    </v-btn>

    {{ modalOpen }}

    <av-modal v-if="modalOpen" @close="modalOpen = false" />

    <!-- <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          <p>I'm a teleported modal! (My parent is "body")</p>

          <button @click="modalOpen = false">
            <v-icon color="red">mdi-close</v-icon>
          </button>
        </div>
      </div>
    </teleport> -->

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

const modalOpen = ref(false);

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

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal div {
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
}

.modal button {
  display: block;
  float: right;
  margin-top: 3px;
}
</style>
