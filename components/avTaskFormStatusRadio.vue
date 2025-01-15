<template>
  <v-radio-group
    v-model="task.status"
    inline
    :label="`Status = ${statusOptionsObj[task.status]}`"
  >
    <v-radio
      v-for="option in statusOptions"
      :key="option.value"
      :id="`radio-${option.value}-${task.id}`"
      :label="option.text"
      :value="option.value"
      class="mr-3"
      density="compact"
      @change="updateTaskStatus"
    ></v-radio>
  </v-radio-group>
</template>

<script setup>
const props = defineProps({
  statusOptions: Object,
  task: Object,
  updateTaskStatusNow: {
    type: Boolean,
    default: false,
  },
});

const statusOptions = ref(props.statusOptions);
const updateTaskStatusNow = ref(props.updateTaskStatusNow);
const task = ref(props.task);

const statusOptionsObj = statusOptions.value.reduce((acc, option) => {
  acc[option.value] = option.text;
  return acc;
}, {});

const emit = defineEmits(["updateTaskStatus"]);

const updateTaskStatus = () => {
  updateTaskStatusNow.value ? emit("updateTaskStatus") : null;
};

const getSortOptionText = (value) => {
  const option = statusOptions.find((option) => option.value === value);
  return option ? option.text : "";
};
</script>
