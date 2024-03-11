<script setup lang="ts">
const { getImages } = useFile()

useSeoMeta({
  title: 'NuxtHub Image Gallery Starter',
  description: 'A Nuxt template to build your full-stack image gallery application on the edge.',
})

await getImages()
</script>

<template>
  <div class="bg-black min-h-[100dvh] overflow-x-auto relative" :class="{ 'flex flex-col md:block': $router.currentRoute.value.fullPath !== '/' }">
    <NuxtPage />
    <ThumbnailList :class="$router.currentRoute.value.fullPath !== '/' ? 'opacity-100 z-[9999]' : 'opacity-0 z-[-1]'" />
  </div>
</template>
