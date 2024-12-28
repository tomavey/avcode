<template>
  <div>
    <div v-if="editor && showToolbar">
      <v-btn
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
        density="dense"
        elevation="0"
        icon="mdi-format-bold"
      />
      <v-btn
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
        density="dense"
        elevation="0"
        icon="mdi-format-italic"
      />
      <v-btn
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        density="dense"
        elevation="0"
        icon="mdi-format-strikethrough"
      />
      <v-btn
        @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
        density="dense"
        elevation="0"
        icon="mdi-xml"
      />
      <v-btn
        @click="editor.chain().focus().unsetAllMarks().run()"
        density="dense"
        elevation="0"
        icon="mdi-format-clear"
      />
      <v-btn
        @click="editor.chain().focus().clearNodes().run()"
        density="dense"
        elevation="0"
        icon="mdi-format-clear"
      />
      <v-btn
        @click="editor.chain().focus().setParagraph().run()"
        density="dense"
        elevation="0"
        icon="mdi-format-paragraph"
      />
      <v-btn
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        density="dense"
        elevation="0"
        icon="mdi-format-header-1"
      />
      <v-btn
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        density="dense"
        elevation="0"
        icon="mdi-format-header-2"
      />
      <v-btn
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        density="dense"
        elevation="0"
        icon="mdi-format-header-3"
      />
      <v-btn
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        density="dense"
        elevation="0"
        icon="mdi-format-header-4"
      />
      <v-btn
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        density="dense"
        elevation="0"
        icon="mdi-format-header-5"
      />
      <v-btn
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        density="dense"
        elevation="0"
        icon="mdi-format-header-6"
      />
      <v-btn
        @click="editor.chain().focus().toggleBulletList().run()"
        density="dense"
        elevation="0"
        icon="mdi-format-list-bulleted"
      />
      <v-btn
        @click="editor.chain().focus().toggleOrderedList().run()"
        density="dense"
        elevation="0"
        icon="mdi-format-list-numbered"
      />
      <v-btn
        @click="editor.chain().focus().setHorizontalRule().run()"
        density="dense"
        elevation="0"
        icon="mdi-minus"
      />
      <v-btn
        @click="editor.chain().focus().setHardBreak().run()"
        density="dense"
        elevation="0"
        icon="mdi-keyboard-return"
      />
      <v-btn
        @click="editor.chain().focus().undo().run()"
        density="dense"
        elevation="0"
        icon="mdi-undo"
      />
      <v-btn
        @click="editor.chain().focus().redo().run()"
        density="dense"
        elevation="0"
        icon="mdi-redo"
      />
      <hr />
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
      </button>
    </div>
    <TiptapEditorContent :editor="editor" class="tiptapeditorcontent" />
  </div>
</template>

<script setup>
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
  border: 1px solid #102035;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
}
.ProseMirror:focus {
  outline: none;
}
</style>
