<script setup lang="ts">
import { useMoviesStore } from '../stores/movies'

const moviesStore = useMoviesStore()
const movies = ref<any>(moviesStore.movies)
const config = useRuntimeConfig();
const active = useState()
const route = useRoute()
const router = useRouter()
const bottomMenu = ref()
const movieEl = ref<HTMLElement>()
const baseUrl = ref(config.public.imageApi)
const poster = ref()
const { width } = useWindowSize()

const { currentIndex } = useImageGallery()
const { isSwiping, direction, lengthX } = useSwipe(poster, {
    passive: false,
    onSwipeEnd(e: TouchEvent, direction: any) {

      if (direction === 'left') {
        if (isLastMovie.value) {
          router.push('/')
        } else {
          router.push(`/detail/${movies.value[currentIndex() + 1].id}`)
        }
      } else {
        if (isFirstMovie.value) {
          router.push('/')
        } else {
          router.push(`/detail/${movies.value[currentIndex() - 1].id}`)
        }
      }
    },
  })

const { data: movie } = await useFetch(`/tmdb/tv/${route.params.slug}`, {
  baseURL: baseUrl,
});

const downloadImage = async (movieUrl: string, filename: string) => {
  await useFetch(movieUrl, {
    baseURL: `${baseUrl.value}/ipx/_/tmdb/`,
  }).then((response: any) => {
    const blob = response.data.value
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
  })
}

const isFirstMovie = computed(() => movies.value[0].id == route.params.slug)
const isLastMovie = computed(()=> movies.value[movies.value.length - 1].id == route.params.slug)
</script>

<template>
  <div v-if="movie" class="h-full w-full max-w-7xl flex items-center justify-center relative mx-auto overflow-x-hidden">
    <BottomMenu class="bottom-menu" ref="bottomMenu">
      <template #description>
        <p class="bottom-menu-description">
          {{ movie.name }}
        </p>
      </template>
      <template #buttons>
        <div class="flex gap-x-2 items-center jusitfy-center bottom-menu-button">
          <button class="bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
            <a :href="`${baseUrl}/ipx/_/tmdb/${movie.poster_path}`" target="_blank" class="p-2 flex jusitfy-center items-center ">
              <Icon name="heroicons-outline:external-link" size="16px" />
            </a>
          </button>
          <button class="flex jusitfy-center items-center bg-transparent border border-1 border-white/30 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm" @click="downloadImage(movie.poster_path, movie.name)">
            <Icon name="heroicons-outline:download" size="16px" />
          </button>
        </div>
      </template>
    </BottomMenu>
    <div v-if="movie" class="md:pt-16 md:pb-32 flex items-center justify-center w-full h-full max-h-[100dvh] relative ">
      <button class="absolute top-4 right-4 md:hidden w-min bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
          <NuxtLink to="/" class="flex justify-center items-center p-2">
            <Icon name="heroicons-outline:x" size="20px" />
        </NuxtLink>
      </button>
      <button v-if="!(isFirstMovie || isLastMovie)" class="absolute top-4 left-4 text-white hover:text-zinc-200 transition-colors duration-200 text-sm back">
        <NuxtLink to="/" class="flex jusitfy-center items-center font-medium gap-x-2">
          <Icon name="heroicons-outline:arrow-left" size="18px" />
          <span class="text-md">
            Back to gallery
          </span>
        </NuxtLink>
      </button>
      <div ref="movieEl" class="flex items-center justify-between gap-x-4 w-full">
        <button v-if="!isFirstMovie" class="hidden md:block bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
          <NuxtLink @click.native="active == movie.id" :to="`/detail/${movies[currentIndex() - 1].id}`" class="flex jusitfy-center items-center p-2">
            <Icon name="heroicons-outline:chevron-left" size="20px" />
          </NuxtLink>
        </button>
        <button v-else class="back hidden md:block">
          <NuxtLink to="/" class="flex jusitfy-center items-center p-2 text-white gap-x-2">
            <Icon name="material-symbols:grid-on" size="20px" />
            <Icon name="heroicons-outline:arrow-left" size="20px" />
          </NuxtLink>
        </button>
        <NuxtImg
          v-if="movie.poster_path"
          format="webp"
          :src="`/tmdb${movie.poster_path}`"
          :alt="movie.title || movie.name"
          class="object-contain rounded image md:h-[88dvh] w-full h-full"
          ref="poster"
        />
        <button v-if="!isLastMovie" class="hidden md:block w-min bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
          <NuxtLink @click.native="active == movie.id" :to="`/detail/${movies[currentIndex() + 1].id}`" class="flex jusitfy-center items-center p-2">
            <Icon name="heroicons-outline:chevron-right" size="20px" />
          </NuxtLink>
        </button>
        <button v-else class="back hidden md:block">
          <NuxtLink to="/" class="flex jusitfy-center items-center p-2 text-white gap-x-2">
            <Icon name="heroicons-outline:arrow-right" size="20px" />
            <Icon name="material-symbols:grid-on" size="20px" />
          </NuxtLink>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
img {
  contain: layout;
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

.back {
  view-transition-name: vtn-back-button
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

::view-transition-old(vtn-img),
::view-transition-new(vtn-img) {
  animation: none;
  mix-blend-mode: normal;
  padding-bottom: 16px;
}

::view-transition-image-pair(vtn-img) {
  isolation: none;
}
</style>
