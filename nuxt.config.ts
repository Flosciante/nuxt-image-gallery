const imageApi = 'https://movies-proxy.vercel.app';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
  },
  extends: '@nuxthq/neo',
  image: {
    provider: 'proxy',
    providers: {
      proxy: {
        provider: 'ipx',
        options: {
          baseURL: `${imageApi}/ipx`,
        },
      },
    },
  },
  css: ['@/assets/css/fonts.css'],
  modules: [
    // https://content.nuxtjs.org
    '@nuxt/content',
    // https://v1.image.nuxtjs.org
    '@nuxt/image-edge',
    // https://vueuse.org/
    '@vueuse/nuxt',
    // https://nuxt.studio
    '@nuxthq/studio',
    // https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',
    //https://ui.nuxtlabs.com/
    '@nuxthq/ui'
  ],
  content: {
    documentDriven: true
  },
  devtools: {
    enabled: true
  },
  runtimeConfig: {
    public: {
      imageApi,
    },
  },
})
