<script setup lang="ts">
import { useMoviesStore } from '../../stores/movies'

const moviesStore = useMoviesStore()

const { fetchList: fetchMovies } = useImageGallery()

if (!moviesStore.movies.length) {
  await fetchMovies()
}

definePageMeta({
  documentDriven: false
})
</script>

<template>
  <div>
    <ImageDetail />
  </div>
</template>
