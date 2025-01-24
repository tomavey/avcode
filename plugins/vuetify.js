import { createVuetify } from "vuetify";
import { VCalendar } from "vuetify/labs/VCalendar";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VCalendar,
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
