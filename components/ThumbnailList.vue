<script setup lang="ts">
const { images } = useFile()
const router = useRouter()
const { width } = useWindowSize()
const thumbnails = ref<HTMLElement>()
const x = ref(0)

function moveThumbnail(slug: any) {
  // get width of current image
  const currentMovie = images.value!.filter((image: any) => image.pathname.split('.')[0] === slug)
  const index = images.value!.indexOf(currentMovie![0]) as number
  const thumbnailToMove = ref<HTMLElement | undefined>(thumbnails.value?.children[index] as HTMLElement | undefined)
  const imageWidth: number = thumbnailToMove.value!.offsetWidth

  // calculate translate to do. (current translate + middle screen pos x - middle thumbnail to move pos x)
  x.value = (x.value + ((width.value / 2) - (thumbnailToMove.value!.getBoundingClientRect().left + ((imageWidth / 2)))))
}

// move thumbnail on mounted (if not gallery page)
onMounted(async () => {
  await nextTick()

  if (router.currentRoute.value.fullPath !== '/')
    moveThumbnail(router.currentRoute.value.params.slug[0])
})

// move thumbnail after route changes
router.afterEach(async (to, _) => {
  await nextTick()

  if (router.currentRoute.value.fullPath !== '/')
    moveThumbnail(to.params.slug[0])
})
</script>

<template>
  <div class="bg-black/10 backdrop-blur-md w-screen top-0 h-[68px] absolute overflow-hidden">
    <ul v-if="images && images.length" ref="thumbnails" class="fixed top-2 left-48 right-0 whitespace-nowrap">
      <Thumbnail v-for="(thumbnail, index) in images" :key="index" class="transform-gpu transition-all duration-500 mx-4" :thumbnail="thumbnail" :style="`transform: translateX(${x}px) translateZ(0)`" />
    </ul>
  </div>
</template>
