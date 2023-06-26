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
    //https://ui.nuxtlabs.com/
    '@nuxthq/ui',
    //https://github.com/nuxt-modules/fontaine
    '@nuxtjs/fontaine'
  ],

  devtools: {
    enabled: true
  },

  runtimeConfig: {
    public: {
      imageApi,
    },
  },

  colorMode: {
    preference: 'dark'
  },

  plugins: ['~/plugins/files.ts']
})
