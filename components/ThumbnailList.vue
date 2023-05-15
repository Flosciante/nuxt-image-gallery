<script setup lang="ts">
import { useMoviesStore } from '../stores/movies'

const moviesStore = useMoviesStore()
const thumbnails = ref<HTMLElement>()
const { width } = useWindowSize()
const x = ref(0)
const router = useRouter()

const moveThumbnail = (slug) => {
  const currentMovie = moviesStore.movies.filter((movie: any) => movie.id == slug)
  const index = moviesStore.movies.indexOf(currentMovie[0])
  const imageWidth = thumbnails.value?.children[index].offsetWidth;

  x.value = (x.value + ((width.value / 2 ) - (thumbnails.value?.children[index].getBoundingClientRect().left + ((imageWidth / 2)))))
}

onMounted(() => {
  if (router.currentRoute.value.fullPath !== '/') {
    moveThumbnail(router.currentRoute.value.params.slug)
  }
})

router.afterEach((to, from) => {
  moveThumbnail(to.params.slug)
})

</script>

<template>
  <ul class="fixed bottom-0 left-0 right-0 z-[9990] whitespace-nowrap" ref="thumbnails">
    <Thumbnail class="transform-gpu transition-all duration-500 -mx-[21px]" v-for="(thumbnail, index) in moviesStore.movies" :key="index" :thumbnail="thumbnail" :style="`transform: translateX(${x}px) translateZ(0)`" />
  </ul>
</template>
