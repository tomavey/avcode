<template>
  <div>
    <div v-if="editor && showToolbar">
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

          <v-btn
            @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
            density="compact"
            elevation="0"
            icon="mdi-format-strikethrough"
          />
        </div>
      </bubble-menu>
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
      <!-- <v-btn
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        density="compact"
        elevation="0"
        icon="mdi-xml"
      /> -->
      <!-- <v-btn
        @click="editor.chain().focus().unsetAllMarks().run()"
        density="compact"
        elevation="0"
        icon="mdi-format-clear"
      />
      <v-btn
        @click="editor.chain().focus().clearNodes().run()"
        density="compact"
        elevation="0"
        icon="mdi-format-clear"
      /> -->
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
      <!-- <hr />
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        code block
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        blockquote
      </button> -->
    </div>
    <v-card>
      <TiptapEditorContent :editor="editor" class="tiptapeditorcontent" />
    </v-card>
  </div>
</template>

<script setup>
import { BubbleMenu } from "@tiptap/vue-3";
const emit = defineEmits(["update-content"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  showToolbar: {
    type: Boolean,
    default: true,
  },
});

const editor = useEditor({
  content: props.modelValue,
  extensions: [TiptapStarterKit],
  onUpdate: ({ editor }) => {
    emit("update-content", editor.getHTML());
  },
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});
</script>

<style>
.tiptapeditorcontent {
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
}
.ProseMirror:focus {
  outline: none;
}
</style>
