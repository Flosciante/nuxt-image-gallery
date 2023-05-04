<script setup lang="ts">
const config = useRuntimeConfig()
const route = useRoute()

const { data: movies } = await useFetch<any>('/tmdb/tv/popular', {
  baseURL: config.public.imageApi,
  query: {
    page: 1,
    language: 'en',
  },
});
</script>

<template>
  <div class="flex p-8 relative">
    <ImageGallery :images="movies" />
  </div>
</template>
