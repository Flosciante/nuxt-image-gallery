<script setup lang="ts">
import { useMoviesStore } from '../stores/movies'

const moviesStore = useMoviesStore()
const thumbnails = ref<HTMLElement>()
const { width } = useWindowSize()
const x = ref(0)
const router = useRouter()

const moveThumbnail = (slug: any) => {
  // get width of current image
  const currentMovie = moviesStore.movies.filter((movie: any) => movie.id == slug)
  const index: number = moviesStore.movies.indexOf(currentMovie[0])
  const thumbnailToMove = ref<HTMLElement | undefined>(thumbnails.value?.children[index] as HTMLElement | undefined)
  const imageWidth: number = thumbnailToMove.value!.offsetWidth;

  // calculate translate to do. (current translate + middle screen pos x - middle thumbnail to move pos x)
  x.value = (x.value + ((width.value / 2 ) - (thumbnailToMove.value!.getBoundingClientRect().left + ((imageWidth / 2)))))
}

//move thumbnail on mounted (if not gallery page)
onMounted(() => {
  if (router.currentRoute.value.fullPath !== '/') {
    moveThumbnail(router.currentRoute.value.params.slug)
  }
})

//move thumbnail after route changes
router.afterEach((to, _) => {
  moveThumbnail(to.params.slug)
})

</script>

<template>
  <ul class="fixed bottom-0 left-0 right-0 z-[9990] whitespace-nowrap" ref="thumbnails">
    <Thumbnail class="transform-gpu transition-all duration-500 -mx-[21px]" v-for="(thumbnail, index) in moviesStore.movies" :key="index" :thumbnail="thumbnail" :style="`transform: translateX(${x}px) translateZ(0)`" />
  </ul>
</template>
