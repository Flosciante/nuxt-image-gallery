<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const config = useRuntimeConfig();
const route = useRoute();
const { width, height } = useWindowSize()

console.log(height)

const { data: movie } = await useFetch(`/tmdb/tv/${route.params.slug}`, {
  baseURL: config.public.imageApi,
});
</script>

<template>
  <div class="p-16 flex items-center justify-center w-full h-full aspect-[3/2]">
    <NuxtImg
      v-if="movie.poster_path"
      height="100%"
      width="100%"
      :src="`/tmdb${movie.poster_path}`"
      :alt="movie.title || movie.name"
      class="object-contain rounded image w-full h-full"
      :class="{ active: active === movie.id }"
    />
  </div>
</template>

<style scoped lang="postcss">
img {
  view-transition-name: vtn-image;
}
</style>

<style>

::view-transition-old(vtn-image) {

  mix-blend-mode: normal;
  /* Clip any overflow of the view */
  overflow: clip;
  transform: scale(0);
}

::view-transition-new(vtn-image) {

  mix-blend-mode: normal;
  /* Clip any overflow of the view */
  overflow: clip;
  animation: none;
  transform: scale(1);
}
</style>
