// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // https://content.nuxtjs.org
    '@nuxt/content',
    // https://v1.image.nuxtjs.org
    '@nuxt/image-edge',
    // https://color-mode.nuxtjs.org
    '@nuxtjs/color-mode',
    // https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
    // https://vueuse.org/
    '@vueuse/nuxt',
    // https://nuxt.studio
    '@nuxthq/studio'
  ],
  devtools: {
    enabled: true
  },
  content: {
    documentDriven: true
  },
  colorMode: {
    classSuffix: ''
  }
})
