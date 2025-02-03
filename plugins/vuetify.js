import { createVuetify } from "vuetify";
import { VTimePicker } from "vuetify/labs/components";
import { VPicker } from "vuetify/labs/VPicker";
import { VCalendar } from "vuetify/labs/VCalendar";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VCalendar,
      VTimePicker,
      VPicker,
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
