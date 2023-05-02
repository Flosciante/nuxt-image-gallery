<script setup lang="ts">
const { closeModal, visibleModal, idImage } = useModal()

const config = useRuntimeConfig();
const movie: any = ref(null)

watch(idImage, async () => {
  movie.value = await useFetch(`/tmdb/tv/${idImage.value}`, {
    baseURL: config.public.imageApi,
  });
})
</script>

<template>
  <div v-if="visibleModal && movie?.data" class="overflow-hidden fixed z-[9990] top-0 w-full h-full flex transform -translate-[50%] items-center justify-center
    before:content-[''] before:absolute before:h-full before:w-full before:inset-0 before:backdrop-blur-sm brefore:z-index-[-1]">
    <div class="relative z-50 aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto">
      <button @click="closeModal()" class="block z-[9999]"> close </button>
      <NuxtImg
        v-if="movie.data.poster_path"
        width="1200"
        height="853"
        format="webp"
        :src="`/tmdb${movie.data.poster_path}`"
        :alt="movie.title || movie.name"
        class="object-top rounded image"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.image {
  view-transition-name: vtn-image;
}

::view-transition-old(vtn-image),
::view-transition-new(vtn-image) {
  width: auto
}
</style>
