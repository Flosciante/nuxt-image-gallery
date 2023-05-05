<script setup lang="ts">
defineProps({
  thumbnails: {
    type: Array as PropType<Array<any>>,
    default: () => []
  }
})

const config = useRuntimeConfig()
const thumbnails = ref<HTMLElement>()
const { width } = useWindowSize()
const route = useRoute()
const isHome = ref(false)

const moveThumbnail = () => {
  const currentIndex = movies.value.results.indexOf(movies.value.results.filter((movie: any) => movie.id == route.params.slug)[0])
  const imageRect: any = thumbnails.value?.children[currentIndex].getBoundingClientRect();
  const containerRect: any = thumbnails.value?.getBoundingClientRect();
  const containerScrollPosition: any = thumbnails.value?.scrollLeft;
  const distanceFromLeft = imageRect.left - containerRect.left + containerScrollPosition;
  const containerWidth: any = thumbnails.value?.offsetWidth;
  const imageWidth = thumbnails.value?.children[currentIndex].offsetWidth;
  const newScrollPosition = distanceFromLeft - (containerWidth / 2) + (imageWidth / 2);

  thumbnails.value?.scrollTo({
    left: newScrollPosition
  });
}

const { data: movies } = await useFetch<any>('/tmdb/tv/popular', {
  baseURL: config.public.imageApi,
  query: {
    page: 1,
    language: 'en',
  },
});

watch(route, () => { 
  moveThumbnail()
})

console.log("width", width.value)

</script>

<template>
  <ul v-if="width !== Infinity" class="fixed bottom-0 left-0 right-0 inline-block z-[9990] overflow-x-auto whitespace-nowrap snap-mandatory snap-x" ref="thumbnails">
    <Thumbnail class="snap-center" v-for="(thumbnail, index) in movies.results" :key="index" :thumbnail="thumbnail" @click="moveThumbnail()" :style="`padding-left: ${index === 0 ? (width / 2) : 0}px; margin-right: ${index === (movies.results.length - 1) ? (width / 2) : 0 }px;`" />
  </ul>
</template>
