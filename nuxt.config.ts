// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxthub/core', '@nuxt/ui-pro'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
  ],
  devtools: { enabled: true },
})
