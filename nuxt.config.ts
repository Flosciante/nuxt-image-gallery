// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxthub/core'],

  $development: {
    hub: {
      remote: true,
    },
  },

  experimental: {
    viewTransition: true,
  },

  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
  ],

  ui: {
    icons: ['simple-icons'],
  },

  devtools: { enabled: true },
})
