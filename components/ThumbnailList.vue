<script setup lang="ts">
defineProps({
  thumbnails: {
    type: Array as PropType<Array<any>>,
    default: () => []
  }
})

const config = useRuntimeConfig()
const router = useRouter()
const thumbnails = ref<HTMLElement>()
const thumbnail = ref<HTMLElement>()


const { data: movies } = await useFetch<any>('/tmdb/tv/popular', {
  baseURL: config.public.imageApi,
  query: {
    page: 1,
    language: 'en',
  },
});

// const windowW = computed(() => { (width.value / 2) - 74 })
// const left = computed(() => thumbnails.value?.getBoundingClientRect().left)

</script>

<template>
  <ul class="fixed bottom-16 left-0 right-0 inline-block z-[9990] overflow-x-auto whitespace-nowrap" ref="thumbnails">
    <Thumbnail ref="thumbnail" v-for="(thumbnail, index) in movies.results" :key="index" :thumbnail="thumbnail" :thumbnails-ref="thumbnails" />
  </ul>
</template>
