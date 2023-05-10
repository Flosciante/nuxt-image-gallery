<script setup lang="ts">
import { useMoviesStore } from '../stores/movies'

const moviesStore = useMoviesStore()
const route = useRoute()
const router = useRouter()

const { currentIndex } = useImageGallery()

const thumbnails = ref<HTMLElement>()
const { width } = useWindowSize()
const x = ref(0)

const moveThumbnail = () => {
  const index = currentIndex()

  const imageWidth = thumbnails.value?.children[index].offsetWidth;
  x.value = (x.value + ((width.value / 2 ) - (thumbnails.value?.children[index].getBoundingClientRect().left + ((imageWidth / 2)))))
}

onMounted(() => moveThumbnail())
</script>

<template>
  <ul v-if="width !== Infinity && moviesStore.movies" class="fixed bottom-0 left-0 right-0 z-[9990] whitespace-nowrap snap-mandatory snap-x" ref="thumbnails">
    <Thumbnail :class="{ 'active': moviesStore.movies[index].id == route.params.slug }" class="snap-center thumbnail" v-for="(thumbnail, index) in moviesStore.movies" :key="index" :thumbnail="thumbnail" :style="`transform: translateX(${x}px)`" />
  </ul>
</template>
