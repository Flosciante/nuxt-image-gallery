const imageApi = 'https://movies-proxy.vercel.app';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
  },
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
    // https://color-mode.nuxtjs.org
    '@nuxtjs/color-mode',
    // https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
    // https://vueuse.org/
    '@vueuse/nuxt',
    // https://nuxt.studio
    '@nuxthq/studio',
    // https://github.com/nuxt-modules/icon
    'nuxt-icon',
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
  colorMode: {
    classSuffix: ''
  },
  runtimeConfig: {
    public: {
      imageApi,
    },
  },
  ui: {
    primary: 'zinc',

    button: {
      default: {
        size: 'md',
        color: 'primary',
        variant: 'outline'
      }
    }
  }
})
