<template>
  <div>
    <h1>Test</h1>
    <p>
      This is a test page to test the modal component. Click the button below to
      open the modal.
    </p>
    <v-btn @click="showModal = true">
      Open full screen modal! (With teleport!)
    </v-btn>

    <av-modal :is-visible="showModal" @close="showModal = false">
      <template #header>
        <h3>My Custom Modal Title</h3>
      </template>
      <template #body>
        <p>My Custom Body</p>
      </template>
    </av-modal>
  </div>
</template>

<script setup>
const showModal = ref(false);
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

.pointer {
  cursor: pointer;
}
</style>
