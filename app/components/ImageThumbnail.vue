<script setup lang="ts">
import { encodeImageSlug, isImageMatch } from '../utils/url.ts'

defineProps({
  thumbnail: {
    type: Object,
    default: null
  }
})

const route = useRoute()

function isCurrentImage (pathname: string) {
  const currentSlug = route.params.slug
  if (!currentSlug || !currentSlug[0]) return false

  return isImageMatch(pathname, currentSlug[0])
}
</script>

<template>
  <li v-if="$router.currentRoute.value.params.slug" class="text-black inline-block relative"
    :class="{ 'z-50': isCurrentImage(thumbnail.pathname) }">
    <NuxtLink :to="`/detail/${encodeImageSlug(thumbnail.pathname)}`">
      <img v-if="thumbnail" width="83" height="51" :src="`/images/${thumbnail.pathname}`" :alt="thumbnail.key"
        class="object-cover rounded-md transition-all duration-500 hover:brightness-100 w-[83px] h-[51px]"
        :class="isCurrentImage(thumbnail.pathname) ? 'active brightness-100' : 'opacity-75 brightness-50'">
    </NuxtLink>
  </li>
</template>