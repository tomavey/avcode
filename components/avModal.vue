<template>
  <Transition name="modal">
    <Teleport to="body">
      <div v-if="isVisible" class="modal-overlay">
        <div class="modalContent" ref="modalContent">
          <slot name="header">
            <h2 class="modal-title">{{ header }}</h2>
          </slot>
          <slot name="body">
            <p>{{ body }}</p>
          </slot>
          <slot name="footer">
            <v-btn
              icon="mdi-close"
              @click="close"
              class="btnModalClose"
              density="dense"
              color="red"
            ></v-btn>
          </slot>
        </div>
      </div>
    </Teleport>
  </Transition>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  header: {
    type: String,
    default: "Modal Title",
  },
  body: {
    type: String,
    default: "Modal content goes here.",
  },
});

const modalContent = ref(null);

const emits = defineEmits(["close"]);

const close = () => {
  emits("close");
};

onClickOutside(modalContent, () => {
  close();
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's on top */
}

.modalContent {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 600px; /* Or whatever width you want */
}

.modal-title {
  margin-top: 0; /* Reset default margin */
}

/* Transitions */
.modal-enter-from {
  opacity: 0;
  transform: translateY(-20px); /* Slide down from top */
}

.modal-enter-active {
  transition: all 0.3s ease-out; /* Smooth transition */
}

.modal-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.modal-leave-active {
  transition: all 0.3s ease-in;
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.btnModalClose {
  float: right;
}
</style>
