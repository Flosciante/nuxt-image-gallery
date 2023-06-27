<script setup lang="ts">

const { getFiles } = useFile()

useHead({
  link: [
    { rel: 'icon', href: '/icon.png' }
  ],
  meta: [
    { property: 'og:site_name', content: 'NuxtLabs' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://nuxtlabs.com/social.png' },
    { property: 'og:image:alt', content: 'NuxtLabs' },
    { property: 'description', content: 'description' },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:site', content: '@nuxtlabs' },
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Nuxt Image Galery',
  description: 'This is a template which allows you to display your pictures within a gallery'
})

await getFiles()
</script>


<template>
  <div class="bg-black min-h-[100dvh] overflow-x-auto relative" :class="{ 'flex flex-col md:block': $router.currentRoute.value.fullPath !== '/' }">
    <NuxtPage />
    <ThumbnailList :class="$router.currentRoute.value.fullPath !== '/' ? 'opacity-100 z-[9999]' : 'opacity-0 z-[-1]'" />
  </div>
  <UNotifications />
</template>
