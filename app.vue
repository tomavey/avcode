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
    "%c====> DEPLOYED ON 01-21-25 7:55 AM TDA <====",
    "color: white; background: green;"
  );
});
</script>
