<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup>
const { settingsObj, fetchSettings } = useSettings();
onMounted(() => {
  fetchSettings();
  console.log(
    "%c====> DEPLOYED ON 01-06-25 7:26 AM TDA <====",
    "color: white; background: green;"
  );
});
</script>
