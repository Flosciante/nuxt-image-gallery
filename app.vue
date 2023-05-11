<script setup lang="ts">
const { fetchList: fetchMovies } = useImageGallery()

await fetchMovies()
</script>


<template>
  <div class="bg-black min-h-[100dvh] overflow-x-auto relative">
    <LazyThumbnailList />
    <NuxtPage />
  </div>
</template>
