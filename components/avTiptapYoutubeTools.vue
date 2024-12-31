<template>
  <div class="control-group">
    <div class="button-group">
      <input
        id="width"
        type="number"
        v-model="width"
        placeholder="width"
        min="320"
        max="1024"
      />
      <input
        id="height"
        type="number"
        v-model="height"
        placeholder="height"
        min="180"
        max="720"
      />
      <button id="add" @click="addVideo">Add YouTube video</button>
    </div>
  </div>
</template>
<script setup>
import Youtube from "@tiptap/extension-youtube";
const props = defineProps({
  editor: Object,
});
const width = ref(560);
const height = ref(315);
</script>
