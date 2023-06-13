<script setup lang="ts">
import type { Image } from 'types'

defineProps({
  images: {
    type: Array as PropType<Array<Image>>,
    default: () => []
  }
})
</script>

<template>
  <div>
    <ImageGallery :images="images" />
  </div>
</template>
