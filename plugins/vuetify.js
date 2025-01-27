import { createVuetify } from "vuetify";
import { VTimePicker } from "vuetify/labs/components";
import { VCalendar } from "vuetify/labs/VCalendar";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VCalendar,
      VTimePicker,
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
