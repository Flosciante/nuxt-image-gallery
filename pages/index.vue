<template>
  <NuxtLayout>
    <ContentRenderer :value="page" class="overflow-hidden" />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { page } = useContent()

const { fetchList: fetchMovies } = useImageGallery()

await fetchMovies()
</script>
