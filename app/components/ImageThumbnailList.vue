<script setup lang="ts">
import type { BlobObject } from '@nuxthub/core'

const thumbnails = ref<HTMLUListElement>()
const x = ref<number>(0)

const router = useRouter()
const { images } = useFile()
const { width } = useWindowSize()

async function moveThumbnail(slug: string) {
  // get width of current image
  const currentMovie = images.value!.filter((image: BlobObject) => image.pathname.split('.')[0] === slug)
  const index = images.value!.indexOf(currentMovie[0]!) as number
  const imgToMove = ref<HTMLElement | undefined>(thumbnails.value?.children[index] as HTMLElement | undefined)
  const imageWidth: number = imgToMove.value!.offsetWidth

  // calculate translate to do. (current translate + middle screen pos x - middle thumbnail to move pos x)
  x.value = (x.value + ((width.value / 2) - (imgToMove.value!.getBoundingClientRect().left + ((imageWidth / 2)))))
}

// move thumbnail on mounted (if not gallery page)
onMounted(async () => {
  await nextTick()

  if (router.currentRoute.value.fullPath !== '/')
    moveThumbnail(router.currentRoute.value.params.slug![0]!)
})

// move thumbnail after route changes
router.afterEach(async (to, _) => {
  await nextTick()

  if (router.currentRoute.value.fullPath !== '/')
    moveThumbnail(to.params.slug![0]!)
})
</script>

<template>
  <div class="bg-black/10 backdrop-blur-md top-0 h-[68px] absolute overflow-hidden w-screen">
    <ul
      v-if="images && images.length"
      ref="thumbnails"
      class="fixed top-2 left-0 right-0 mr-8 whitespace-nowrap overflow-x-scroll"
    >
      <ImageThumbnail
        v-for="(thumbnail, index) in images"
        :key="index"
        class="transform-gpu transition-all duration-500 mx-4"
        :thumbnail="thumbnail"
        :style="`transform: translateX(${x}px) translateZ(0)`"
      />
    </ul>
  </div>
</template>
