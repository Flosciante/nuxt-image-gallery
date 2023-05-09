<script setup lang="ts">
definePageMeta({
  documentDriven: false
})

const { movies } = useImageGallery()

const route = useRoute()

</script>

<template>
  <div>
    <ThumbnailList :movies="movies.result" />
    <ImageDetail />
  </div>
</template>
