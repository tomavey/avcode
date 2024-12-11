<template>
  <v-container>
    {{ pageTitle }}
  </v-container>
</template>

<script setup>
const pageTitle = ref("INDEX");
const drawer = ref(true);
const items = [
  {
    title: "Foo",
    value: "foo",
  },
  {
    title: "Bar",
    value: "bar",
  },
  {
    title: "Fizz",
    value: "fizz",
  },
  {
    title: "Buzz",
    value: "buzz",
  },
];
</script>