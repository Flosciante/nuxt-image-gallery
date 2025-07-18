<script setup lang="ts">
import type { BlobObject } from '@nuxthub/core'

const route = useRoute()
const { images } = useFile()

// Get the current image based on the slug
const image = computed(() => {
  if (!images.value) return null
  return images.value.find((file: BlobObject) => file.pathname.split('.')[0] === route.params.slug![0])
})

// SEO Meta tags for individual images
watchEffect(() => {
  if (image.value && image.value.pathname) {
    const imageName = (image.value?.pathname ?? '').split('.')[0].replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
    const imageUrl = `https://image-gallery.nuxt.dev/images/${image.value.pathname}`

    useSeoMeta({
      title: `${imageName} - Nuxt Image Gallery`,
      description: `View ${imageName} in high quality. Part of our curated image gallery collection.`,
      ogTitle: `${imageName} - Nuxt Image Gallery`,
      ogDescription: `View ${imageName} in high quality. Part of our curated image gallery collection.`,
      ogImage: imageUrl,
      ogImageAlt: imageName,
      twitterCard: 'summary_large_image',
      twitterImage: imageUrl,
      twitterImageAlt: imageName
    })
  }
})
</script>

<template>
  <div>
    <ImageDetail />
  </div>
</template>