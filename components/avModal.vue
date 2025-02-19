<template>
  <teleport to="body">
    <div class="modal">
      <div>
        <p>I'm a teleported modal! (My parent is "body")</p>

        <button @click="close">
          <v-icon color="red">mdi-close</v-icon>
        </button>
      </div>
    </div>
  </teleport>
</template>

<script setup>
const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
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
