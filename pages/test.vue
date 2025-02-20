<template>
  <div>
    <h1>Test</h1>
    <p class="mb-4">
      This is a test page to test the avModal.vue component. Click the button
      below to open the modal.
    </p>
    <v-btn block color="primary" @click="showModal = true">
      Open full screen modal! (With teleport!)
    </v-btn>

    <av-modal :is-visible="showModal" @close="showModal = false">
      <template #header>
        <h3>My Custom Modal Title</h3>
      </template>
      <template #body>
        <v-text-field label="Name" />
        <v-text-field label="Email" />
        <v-text-field label="Phone" />
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
