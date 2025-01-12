<template>
  <div>
    <div v-if="editor">
      <av-tiptap-bubble-menu v-if="showBubbleMenu" :editor="editor" />
      <av-tiptap-editor-tools v-if="showToolbar" :editor="editor" />
      <av-tiptap-youtube-tools v-if="showYoutubeMenu" :editor="editor" />
    </div>
    <v-card>
      <TiptapEditorContent :editor="editor" class="tiptapeditorcontent" />
    </v-card>
  </div>
</template>

<script setup>
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
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
  showBubbleMenu: {
    type: Boolean,
    default: true,
  },
  showYoutubeMenu: {
    type: Boolean,
    default: false,
  },
});

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    TiptapStarterKit,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Youtube.configure({
      controls: false,
      nocookie: true,
    }),
  ],
  onUpdate: ({ editor }) => {
    emit("update-content", editor.getHTML());
  },
});

const width = ref(560);
const height = ref(315);

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
