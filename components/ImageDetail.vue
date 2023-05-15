<script setup lang="ts">
import { useMoviesStore } from '../stores/movies'

const moviesStore = useMoviesStore()
const config = useRuntimeConfig()
const isSmallScreen = useMediaQuery('(max-width: 1024px)')
const { currentIndex, isFirstMovie, isLastMovie, initSwipe } = useImageGallery()

const active = useState()
const route = useRoute()
const bottomMenu = ref()
const movieEl = ref<HTMLElement>()
const baseUrl = ref(config.public.imageApi)
const poster: Ref<HTMLElement | null> = ref(null)
const filter = ref(false)
const contrast = ref(100)
const blur = ref(0)
const hueRotate = ref(0)
const invert = ref(0)
const saturate = ref(100)
const sepia = ref(0)
const imageToDownload = ref()
const imageContainer = ref<HTMLElement>()

const { data: movie } = await useFetch(`/tmdb/tv/${route.params.slug}`, {
  baseURL: baseUrl,
})

const applyFilters = async () => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = imageContainer.value?.getBoundingClientRect().width
  canvas.height = imageContainer.value?.getBoundingClientRect().height

  context!.filter = `contrast(${contrast.value}%) blur(${blur.value}px) invert(${invert.value}%)
    saturate(${saturate.value}%) hue-rotate(${hueRotate.value}deg) sepia(${sepia.value}%)`

  console.log("filter", context!.filter)

  context!.drawImage(poster.value, 0, 0, canvas.width, canvas.height)

  const modifiedImage = new Image()
  modifiedImage.src = canvas.toDataURL('image/png')

  imageToDownload.value = modifiedImage
}

const downloadImage = async (filename: string) => {
  await applyFilters()

  await useFetch(imageToDownload.value.src, {
    baseURL: `${baseUrl.value}/ipx/_/tmdb/`,
  }).then((response: any) => {
    const blob = response.data.value
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.click()
  })
}

const reinitFilter = () => {
  contrast.value = 100
  blur.value = 0
  invert.value = 0
  saturate.value = 100
  hueRotate.value = 0
  sepia.value = 0
}

onMounted(() => {
  if (poster.value) {
    initSwipe(poster)
  }
})

</script>

<template>
  <div>
    <div class="absolute inset-0 w-full h-full">
      <NuxtImg v-if="movie.poster_path" format="webp"
      :src="`https://movies-proxy.vercel.app/ipx/f_webp/tmdb${movie.poster_path}`"
      class="object-cover w-full h-full blur-[70px] brightness-[.2]"
      alt="" />
    </div>
    <div v-if="movie" class="h-full w-full max-w-7xl flex items-center justify-center relative mx-auto">
      <BottomMenu class="bottom-menu" ref="bottomMenu" :filter="filter">
        <template #description>
          <p class="bottom-menu-description">
            {{ movie.name }}
          </p>
        </template>
        <template #filter>
          <div class="flex flex-col gap-y-12 border-b border-1 border-zinc-700 pb-6" :class="filter ? 'block opacity-100' : 'hidden opacity-0'">
            <div class="flex flex-col gap-y-4">
              <div class="flex justify-between items-center pb-4">
                <button @click="reinitFilter"
                  class="z-10 w-min bg-black border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
                  <Icon name="heroicons-outline:refresh" class="m-2" size="16px" />
                </button>
                <span class="text-white">Filter</span>
                <button @click="filter = false"
                  class="z-10 w-min bg-black border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
                  <Icon name="heroicons-outline:x" class="m-2" size="16px" />
                </button>
              </div>
              <Gauge v-model="sepia" :max="100" title="Sepia" />
              <Gauge v-model="hueRotate" :max="180" title="Hue-rotate" />
              <Gauge v-model="saturate" :max="100" title="Saturate" />
              <Gauge v-model="invert" :max="100" title="Invert" />
              <Gauge v-model="contrast" :max="200" title="Contrast" />
              <Gauge v-model="blur" :max="5" title="Blur" />
            </div>
          </div>
        </template>
        <template #buttons>
          <div class="flex gap-x-2 items-center jusitfy-center bottom-menu-button">
            <button @click="filter = true"
              class="hidden md:block bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
              <Icon name="fxemoji:artistpalette" size="16px" class="m-2" />
            </button>
            <button
              class="bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
              <a :href="`${baseUrl}/ipx/_/tmdb/${movie.poster_path}`" target="_blank"
                class="p-2 flex jusitfy-center items-center ">
                <Icon name="heroicons-outline:external-link" size="16px" />
              </a>
            </button>
            <button
              class="flex jusitfy-center items-center bg-transparent border border-1 border-white/30 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm"
              @click="downloadImage(movie.name)">
              <Icon name="heroicons-outline:download" size="16px" />
            </button>
          </div>
        </template>
      </BottomMenu>
      <div v-if="movie"
        class="md:pt-16 md:pb-32 overflow-hidden flex items-center justify-center w-full h-full max-h-[100dvh] relative ">
        <button
          class="z-10 absolute top-4 right-4 lg:hidden w-min bg-black border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
          <NuxtLink to="/" class="flex justify-center items-center p-2">
            <Icon name="heroicons-outline:x" size="20px" />
          </NuxtLink>
        </button>
        <button v-if="!(isFirstMovie || isLastMovie) && !isSmallScreen"
          class="absolute top-4 left-4 text-white hover:text-zinc-200 transition-colors duration-200 text-sm back z-10">
          <NuxtLink to="/" class="flex jusitfy-center items-center font-medium gap-x-2 pt-4">
            <Icon name="heroicons-outline:arrow-left" size="18px" />
            <span class="text-md">
              Back to gallery
            </span>
          </NuxtLink>
        </button>
        <div ref="movieEl" class="flex items-center justify-center md:justify-between gap-x-4 w-full">
          <button v-if="!isFirstMovie"
            class="hidden md:block bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
            <NuxtLink @click.native="active == movie.id" :to="`/detail/${moviesStore.movies[currentIndex - 1].id}`"
              class="flex jusitfy-center items-center p-2">
              <Icon name="heroicons-outline:chevron-left" size="20px" />
            </NuxtLink>
          </button>
          <button v-else class="back hidden md:block">
            <NuxtLink to="/"
              class="flex jusitfy-center items-center p-2 text-white gap-x-2 hover:text-zinc-300 transition-colors duration-200">
              <Icon name="material-symbols:grid-on" size="20px" />
              <Icon name="heroicons-outline:arrow-left" size="20px" />
            </NuxtLink>
          </button>
          <div ref="imageContainer">
            <img v-if="movie.poster_path"
              :src="`https://movies-proxy.vercel.app/ipx/f_webp/tmdb${movie.poster_path}`"
              :alt="movie.title || movie.name" class="object-scale-down rounded image h-[88dvh] w-full"
              :class="{ active: route.params.slug == movie.id }"
              ref="poster"
              :style="`filter: contrast(${contrast}%) blur(${blur}px) invert(${invert}%) saturate(${saturate}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%);`"
              crossorigin="anonymous" />
          </div>
          <button v-if="!isLastMovie"
            class="mr-4 hidden md:block w-min bg-transparent border border-1 border-white/30 rounded-full hover:bg-zinc-700 transition-colors duration-200 text-white text-sm">
            <NuxtLink @click.native="active == movie.id" :to="`/detail/${moviesStore.movies[currentIndex + 1].id}`"
              class="flex jusitfy-center items-center p-2">
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
  </div>
</template>

<style scoped lang="postcss">
@media (min-width: 768px) {
  img.active {
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
