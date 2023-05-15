<script setup lang="ts">
const { fetchList: fetchMovies } = useImageGallery()

await fetchMovies()
</script>


<template>
  <div class="bg-black min-h-[100dvh] overflow-x-auto relative" :class="{ 'flex flex-col md:block': $router.currentRoute.value.fullPath !== '/' }">
    <NuxtPage />
    <ThumbnailList :class="$router.currentRoute.value.fullPath !== '/' ? 'opacity-100' : 'opacity-0'" />
  </div>
</template>
