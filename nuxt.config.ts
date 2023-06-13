const imageApi = 'https://movies-proxy.vercel.app';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
  },
  extends: '@nuxthq/neo',
  // image: {
  //   provider: 'proxy',
  //   providers: {
  //     proxy: {
  //       provider: 'ipx',
  //       options: {
  //         baseURL: `${imageApi}/ipx`,
  //       },
  //     },
  //   },
  // },
  modules: [
    // https://v1.image.nuxtjs.org
    // '@nuxt/image-edge',
    // https://vueuse.org/
    '@vueuse/nuxt',
    // https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',
    //https://ui.nuxtlabs.com/
    '@nuxthq/ui'
  ],
  devtools: {
    enabled: true
  },
  runtimeConfig: {
    public: {
      imageApi,
    },
  },
})
