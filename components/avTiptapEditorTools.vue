<template>
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
  <v-btn
    @click="editor.chain().focus().toggleStrike().run()"
    :disabled="!editor.can().chain().focus().toggleStrike().run()"
    :class="{ 'is-active': editor.isActive('strike') }"
    density="compact"
    elevation="0"
    icon="mdi-format-strikethrough"
  />
  <v-btn
    @click="editor.chain().focus().setTextAlign('left').run()"
    :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
    icon="mdi-format-align-left"
    elevation="0"
    density="compact"
  />
  <v-btn
    @click="editor.chain().focus().setTextAlign('center').run()"
    :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
    icon="mdi-format-align-center"
    elevation="0"
    density="compact"
  />
  <v-btn
    @click="editor.chain().focus().setTextAlign('right').run()"
    :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
    icon="mdi-format-align-right"
    elevation="0"
    density="compact"
  />
  <v-btn
    @click="editor.chain().focus().setParagraph().run()"
    density="compact"
    elevation="0"
    icon="mdi-format-paragraph"
  />
  <v-btn
    @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    density="compact"
    elevation="0"
    icon="mdi-format-header-1"
  />
  <v-btn
    @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    density="compact"
    elevation="0"
    icon="mdi-format-header-2"
  />
  <v-btn
    @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    density="compact"
    elevation="0"
    icon="mdi-format-header-3"
  />
  <v-btn
    @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
    density="compact"
    elevation="0"
    icon="mdi-format-header-4"
  />
  <v-btn
    @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
    density="compact"
    elevation="0"
    icon="mdi-format-header-5"
  />
  <v-btn
    @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
    density="compact"
    elevation="0"
    icon="mdi-format-header-6"
  />
  <v-btn
    @click="editor.chain().focus().toggleBulletList().run()"
    density="compact"
    elevation="0"
    icon="mdi-format-list-bulleted"
  />
  <v-btn
    @click="editor.chain().focus().toggleOrderedList().run()"
    density="compact"
    elevation="0"
    icon="mdi-format-list-numbered"
  />
  <v-btn
    @click="editor.chain().focus().setHorizontalRule().run()"
    density="compact"
    elevation="0"
    icon="mdi-minus"
  />
  <v-btn
    @click="editor.chain().focus().setHardBreak().run()"
    density="compact"
    elevation="0"
    icon="mdi-keyboard-return"
  />
  <v-btn
    @click="editor.chain().focus().undo().run()"
    density="compact"
    elevation="0"
    icon="mdi-undo"
  />
  <v-btn
    @click="editor.chain().focus().redo().run()"
    density="compact"
    elevation="0"
    icon="mdi-redo"
  />
</template>

<script setup>
const props = defineProps({
  editor: Object,
});
</script>
