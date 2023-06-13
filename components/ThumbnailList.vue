<script setup lang="ts">
import { useImagesStore } from '../stores/images'

const imagesStore = useImagesStore()

const thumbnails = ref<HTMLElement>()
const { width } = useWindowSize()
const x = ref(0)
const router = useRouter()

const moveThumbnail = (slug: any) => {
  // get width of current image
  const currentMovie = imagesStore.images!.filter((image: any) => image.key.split('.')[0] == slug)
  const index = imagesStore.images?.indexOf(currentMovie[0]) as number
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
  if (router.currentRoute.value.fullPath !== '/') {
    moveThumbnail(to.params.slug)
  }
})

</script>

<template>
  <ul class="fixed top-4 left-48 right-0 whitespace-nowrap" ref="thumbnails">
    <Thumbnail class="transform-gpu transition-all duration-500 mx-4" v-for="(thumbnail, index) in imagesStore.images" :key="index" :thumbnail="thumbnail" :style="`transform: translateX(${x}px) translateZ(0)`" />
  </ul>
</template>
