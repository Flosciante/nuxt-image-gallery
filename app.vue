<script setup lang="ts">
const { getImages } = useFile()

useHead({
  link: [
    { rel: 'icon', href: '/icon.png' },
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
    lang: 'en',
  },
})

useSeoMeta({
  title: 'NuxtHub Image Gallery Starter',
  description: 'A Nuxt template to build your full-stack image gallery application on the edge.',
})

await getImages()
</script>

<template>
  <div class="bg-black min-h-[100dvh] overflow-x-auto relative" :class="{ 'flex flex-col md:block': $router.currentRoute.value.fullPath !== '/' }">
    <UNotifications />
    <NuxtPage />
    <!-- <ThumbnailList :class="$router.currentRoute.value.fullPath !== '/' ? 'opacity-100 z-[9999]' : 'opacity-0 z-[-1]'" /> -->
  </div>
</template>
