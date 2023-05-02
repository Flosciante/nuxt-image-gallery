<script setup lang="ts">
const config = useRuntimeConfig()
const active = useState()

const { data: movies } = await useFetch('/tmdb/tv/popular', {
  baseURL: config.public.imageApi,
  query: {
    page: 1,
    language: 'en',
  },
});
</script>

<template>
  <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[22px]">
    <article v-for="movie in movies.results" class="relative">
      <NuxtLink :to="`/detail/${movie.id}`" @click.native="active = movie.id">
        <NuxtImg
          v-if="movie.poster_path"
          width="527"
          height="430"
          format="webp"
          :src="`/tmdb${movie.poster_path}`"
          :alt="movie.title || movie.name"
          class="w-full h-full bg-black/20 hover:bg-black/0 rounded-md transition-colors duration-200 border-image"
          :class="{ active: active === movie.id }"
        />
      </NuxtLink>

    </article>
  </section>
</template>

<style scoped lang="postcss">

img.active {
  view-transition-name: vtn-image;
}

.container-image {
  background-color: rgba(255, 255, 255, 0.1)
}
.container-image:hover {
  background-color: transparent;
}

.border-image {
  border-width: 1.15px;
  border-color: rgba(255, 255, 255, 0.1)
}
</style>
