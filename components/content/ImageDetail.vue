<script setup lang="ts">

const config = useRuntimeConfig();
const active = useState()
const route = useRoute()

const { movies } = useImageGallery()

const { data: movie } = await useFetch(`/tmdb/tv/${route.params.slug}`, {
  baseURL: config.public.imageApi,
});

const downloadImage = async (movieUrl: string, filename: string) => {
  await useFetch(movieUrl, {
    baseURL: `${config.public.imageApi}/_/tmdb/`,
  }).then((response: any) => {
    const blob = response.data.value
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
  })
}

const isFirstMovie = computed(() => movies.value.results[0].id == route.params.slug)
const isLastMovie = computed(() => movies.value.results[movies.value.results.length - 1].id == route.params.slug)
const currentIndex = computed(() => movies.value.results.indexOf(movies.value.results.filter((movie: any) => movie.id == route.params.slug)[0]))

</script>

<template>
  <NuxtLayout v-if="movie" class="h-full w-full flex items-center justify-center relative">
    <BottomMenu class="bottom-menu">
      <template #description>
        <p class="bottom-menu-description">
          {{ movie.name }}
        </p>
      </template>
      <template #buttons>
        <div class="flex gap-x-2 items-center jusitfy-center bottom-menu-button">
          <button class="bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
            <a :href="`${config.public.imageApi}/_/tmdb/${movie.poster_path}`" target="_blank" class="p-2 flex jusitfy-center items-center ">
              <Icon name="heroicons-outline:external-link" size="16px" />
            </a>
          </button>
          <button class="flex jusitfy-center items-center bg-transparent border border-1 border-white/30 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm" @click="downloadImage(movie.poster_path, movie.name)">
            <Icon name="heroicons-outline:download" size="16px" />
          </button>
        </div>
      </template>
    </BottomMenu>
    <div v-if="movie" class="p-16 flex items-center justify-center w-full max-h-[100dvh] aspect-[0.1] relative ">
      <button class="absolute top-4 right-4 bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
        <NuxtLink to="/" class="flex jusitfy-center items-center p-2">
          <Icon name="heroicons-outline:x" size="16px" />
        </NuxtLink>
      </button>
      <button v-if="!isLastMovie" class="absolute my-auto right-4 bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
        <NuxtLink :to="`/detail/${movies.results[currentIndex + 1].id}`" class="flex jusitfy-center items-center p-2">
          <Icon name="heroicons-outline:chevron-right" size="20px" />
        </NuxtLink>
      </button>
      <button v-if="!isFirstMovie" class="absolute my-auto left-4 bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
        <NuxtLink :to="`/detail/${movies.results[currentIndex - 1].id}`" class="flex jusitfy-center items-center p-2">
          <Icon name="heroicons-outline:chevron-left" size="20px" />
        </NuxtLink>
      </button>
      <NuxtImg
        v-if="movie.poster_path"
        format="webp"
        :src="`/tmdb${movie.poster_path}`"
        :alt="movie.title || movie.name"
        class="object-contain rounded image w-full h-full pb-16"
        :class="{ active: active === movie.id }"
      />
    </div>
    <Icon v-else name="svg-spinners:blocks-wave" size="32px" />
  </NuxtLayout>
</template>

<style scoped lang="postcss">
img.active {
  view-transition-name: vtn-image;
}

.bottom-menu {
  view-transition-name: vtn-bottom-menu;
}
.bottom-menu-description {
  view-transition-name: vtn-bottom-menu-description;
}

.bottom-menu-button {
  view-transition-name: vtn-bottom-menu-button
}
</style>

<style>

@keyframes slide-from-right {
  from {
    transform: translateX(0px);
  }
}

@keyframes slide-to-left {
  to {
    transform: translateX(0px);
  }
}

::view-transition-old(vtn-bottom-menu-description) {
  animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
  width: auto;
  opacity: 0;
}

::view-transition-new(vtn-bottom-menu-description) {
  animation: 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
  width: auto;
}
::view-transition-old(vtn-image) {
  /* Clip any overflow of the view */
  overflow: clip;
  animation: none;
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
