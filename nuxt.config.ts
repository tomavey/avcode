// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/supabase",
    "vuetify-nuxt-module",
    "nuxt-tiptap-editor",
    "@vueuse/nuxt",
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
  },
  tiptap: {
    prefix: "Tiptap", //prefix for Tiptap imports, composables not included
  },
  css: ["@/assets/css/main.css"],
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
});
