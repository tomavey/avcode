// plugins/flatpickr.js
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("flatpickr", flatpickr); // Provide flatpickr globally
});
