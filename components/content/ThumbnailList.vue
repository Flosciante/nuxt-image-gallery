<script setup lang="ts">

const props = defineProps({
  movies: {
    type: Array,
    default: () => []
  }
})

const thumbnails = ref<HTMLElement>()
const { width } = useWindowSize()
const x = ref(0)
const translateStyle = ref()
const route = useRoute()

const moveThumbnail = computed(() => {

  const currentMovie = props.movies.filter((movie: any) => movie.id == route.params.slug)
  const currentIndex = props.movies.indexOf(currentMovie[0])

  const imageRect: any = thumbnails.value?.children[currentIndex].getBoundingClientRect();
  const imageWidth = thumbnails.value?.children[currentIndex].offsetWidth;

  x.value = (x.value + ((width.value / 2 ) - (imageRect.left + ((imageWidth / 2)))))
  return `translateX(${x.value}px)`
})

</script>

<template>
  <ul v-if="width !== Infinity && movies" class="fixed bottom-0 left-0 right-0 z-[9990] whitespace-nowrap snap-mandatory snap-x" ref="thumbnails">
    <Thumbnail class="snap-center transition-all duration-200" v-for="(thumbnail, index) in movies.results" :key="index" :thumbnail="thumbnail" :style="`transform: ${moveThumbnail}`" />
  </ul>
</template>
