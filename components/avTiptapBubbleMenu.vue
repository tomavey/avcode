<template>
  <bubble-menu
    :editor="editor"
    :tippy-options="{ placement: 'right', duration: 100 }"
    v-if="editor"
  >
    <div class="bubble-menu">
      <v-btn
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        density="compact"
        elevation="0"
        icon="mdi-format-bold"
      />
      <v-btn
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        density="compact"
        elevation="0"
        icon="mdi-format-italic"
      />
      <!-- Add more buttons as needed -->
    </div>
  </bubble-menu>
</template>

<script setup>
import { BubbleMenu } from "@tiptap/vue-3";

const props = defineProps({
  editor: Object,
});
</script>

<style scoped>
.bubble-menu {
  display: flex;
  gap: 8px;
}
</style>
