import { VCalendar } from "vuetify/labs/VCalendar";
import { defineNuxtPlugin } from "#app";
import { createVuetify } from "vuetify";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    createVuetify({
      components: {
        VCalendar,
      },
    })
  );
});
