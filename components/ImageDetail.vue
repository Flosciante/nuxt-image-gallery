<script setup lang="ts">
import { useImagesStore } from '../stores/images'

const config = useRuntimeConfig()
const isSmallScreen = useMediaQuery('(max-width: 1024px)')
const { initSwipe, downloadImage, applyFilters } = useImageGallery()

const imagesStore = useImagesStore()

console.log('imagesStore', imagesStore.images)

const active = useState()

const route = useRoute()
const router = useRouter()

const bottomMenu = ref()
const movieEl = ref<HTMLElement>()
const baseUrl = ref(config.public.imageApi)
const poster: Ref<any> = ref()
const imageContainer = ref<HTMLElement>()
const isOpenUpload = ref(false)
const imageToUpload = ref()

//filter
const filter = ref(false)
const contrast = ref(100)
const blur = ref(0)
const hueRotate = ref(0)
const invert = ref(0)
const saturate = ref(100)
const sepia = ref(0)
const objectsFit = ref(['Contain', 'Cover', 'Scale-down', 'Fill', 'None'])
const objectFitSelected = ref(objectsFit.value[0])

//const { data: image } = await useFetch<any>('/api/image', { params: { idImage: parseInt(route.params.slug[0]) } })

const image: any = computed(() => {
  return imagesStore.images.filter(file => file.key.split('.')[0] === route.params.slug[0])[0]
})

const currentIndex: ComputedRef<number> = computed(() => imagesStore.images.findIndex((image) => image.key.split('.')[0] === route.params.slug[0]))
const isFirstMovie: ComputedRef<boolean> = computed(() => imagesStore.images[0].key.split('.')[0] === route.params.slug[0])
const isLastMovie: ComputedRef<boolean> = computed(() => imagesStore.images[imagesStore.images.length - 1].key.split('.')[0] === route.params.slug[0])

  console.log('isFirstMovie', isFirstMovie)
  console.log('isLastMovie', isLastMovie)

onKeyStroke('Escape', (e) => {
  router.push('/')
})

onKeyStroke('ArrowLeft', (e) => {
  if (isFirstMovie.value) {
    router.push('/')
  } else {
    router.push(`/detail/${imagesStore.images[currentIndex.value - 1].key.split('.')[0]}`)
  }
})

onKeyStroke('ArrowRight', (e) => {
  if (isLastMovie.value) {
    router.push('/')
  } else {
    router.push(`/detail/${imagesStore.images[currentIndex.value + 1].key.split('.')[0]}`)
  }
})

const resetFilter = () => {
  contrast.value = 100
  blur.value = 0
  invert.value = 0
  saturate.value = 100
  hueRotate.value = 0
  sepia.value = 0
}

const saveImage = async () => {
  const modifiedImage = await applyFilters(imageContainer.value, poster.value, contrast.value, blur.value, invert.value, saturate.value, hueRotate.value, sepia.value, true)

  imageToUpload.value = { newImage: modifiedImage, key: image.value.key }

  isOpenUpload.value = true
}

onMounted(() => {
  if (poster.value) {
    initSwipe(poster)
  }
})
</script>

<template>
  <div v-if="currentIndex >= 0">
    <!-- background -->
    <div class="absolute inset-0 w-full h-full">
      <img v-if="image" :src="image.url"
        class="object-cover w-full h-full blur-[70px] brightness-[.2] will-change-[filter]" alt="" />
    </div>

    <UContainer class="overflow-x-hidden relative flex items-center justify-center">
      <UModal v-if="imageToUpload" v-model="isOpenUpload">
        <Upload @close-modal="isOpenUpload = false" :image="imageToUpload" />
      </UModal>

      <Filter class="absolute md:mt-36 transition-transform duration-200" :class="filter ? 'translate-x-0 right-8 ' : 'translate-x-full right-0'"
        @reset-filter="resetFilter" @close-filter="filter = false">
        <div class="flex flex-col gap-y-12 pb-6 h-[60dvh]" :class="filter ? 'block opacity-100' : 'hidden opacity-0'">
          <div class="flex flex-col gap-y-4">
            <!-- filters list -->
            <div class="flex gap-x-4 justify-between items-center pb-4">
              <span class="text-white w-40">Fit</span>
              <USelectMenu v-model="objectFitSelected" :options="objectsFit" class="w-full mr-12" />
            </div>
            <Gauge v-model="sepia" :max="100" title="Sepia" />
            <Gauge v-model="hueRotate" :max="180" title="Hue-rotate" />
            <Gauge v-model="saturate" :max="100" title="Saturate" />
            <Gauge v-model="invert" :max="100" title="Invert" />
            <Gauge v-model="contrast" :max="200" title="Contrast" />
            <Gauge v-model="blur" :max="5" title="Blur" />
          </div>
        </div>
      </Filter>

      <div v-if="image" class="h-full w-full max-w-7xl flex items-center justify-center relative mx-auto">
        <!-- Bottom menu -->
        <BottomMenu class="bottom-menu" :class="{ 'right-[350px]': filter }" ref="bottomMenu">
          <template #description>
            <p class="bottom-menu-description">
              Nuxt Image Gallery
            </p>
          </template>
          <!-- Filters -->
          <template #buttons>
            <div class="bottom-menu-button">
              <div v-if="!filter" class="flex gap-x-2 items-center">
                <!-- back to gallery (desktop & not the first or last image) -->
                <UButton v-if="!(isFirstMovie || isLastMovie) && !isSmallScreen" to="/" icon="i-heroicons-rectangle-group-20-solid" aria-label="Back to gallery" class="back hidden md:flex transition-colors duration-200" />
                <!-- open filters-->
                <!-- <UButton @click="filter = true" icon="i-heroicons-paint-brush-20-solid" aria-label="Add filters on image"
                  class="hidden lg:flex" /> -->
                <!-- open original-->
                <UButton icon="i-heroicons-arrow-up-right-20-solid"
                  :to="image.url" target="_blank" aria-label="Open original image" />
                <!-- download original or modified image -->
                <UButton icon="i-heroicons-arrow-down-tray-20-solid"
                  @click="downloadImage(image.key, imageContainer, poster, contrast, blur, invert, saturate, hueRotate, sepia)"
                  class="hidden md:flex" aria-label="Download original or modified image" />
              </div>

              <div v-else class="flex gap-x-2 items-center">
                <UButton icon="i-heroicons-check-20-solid" @click="saveImage()" class="hidden md:flex"
                aria-label="Upload original or modified image to gallery" />
                <UButton icon="i-heroicons-x-mark" @click="filter = false" class="hidden md:flex"
                aria-label="Upload original or modified image to gallery" />
              </div>
            </div>
          </template>
        </BottomMenu>

        <div v-if="image"
          :class="{ '-translate-x-[100px]': filter }"
          class="transition-all duration-200 md:pt-36 overflow-hidden flex items-center justify-center w-full h-full max-h-[100dvh] relative">
          <!-- back to gallery (mobile/tablet) -->
          <UButton class="z-10 absolute top-4 right-4 lg:hidden" to="/" icon="i-heroicons-x-mark" variant="solid"
            color="gray" aria-label="Back to gallery" />
          <div ref="movieEl" class="flex items-center justify-center md:justify-between gap-x-4 w-full">
            <!-- previous image if not the first image -->
            <UButton v-if="!isFirstMovie" @click.native="active == image.id"
              :to="`/detail/${imagesStore.images[currentIndex - 1].key.split('.')[0]}`" size="lg" icon="i-heroicons-chevron-left"
              class="hidden md:flex ml-4" aria-label="Go to previous image" />

            <div class="flex group" v-else>
              <!-- back to gallery if first movie -->
              <UButton @click.native="active == image.key" to="/" size="xl" color="gray" variant="ghost"
                class="back hidden md:flex ml-4 transition-colors duration-200" aria-label="Back to gallery">
                <UIcon name="i-heroicons-rectangle-group-20-solid" class="w-6 h-6" />
              </UButton>
            </div>

            <!-- image -->
            <div class="relative flex items-center justify-center h-[84dvh]">
              <div ref="imageContainer">
                <img v-if="image" :src="image.url" :alt="image.key" class="rounded object-contain transition-all duration-200"
                  :class="[{ active: route.params.slug === image.key.split('.')[0] }, filter ? 'w-[80%] ml-[12px]' : 'w-full']" ref="poster"
                  :style="`filter: contrast(${contrast}%) blur(${blur}px) invert(${invert}%) saturate(${saturate}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%); object-fit:${objectFitSelected.toLowerCase()};`"
                  crossorigin="anonymous" />
              </div>
            </div>

            <!-- next image (if not the last image) -->
            <UButton v-if="!isLastMovie" @click.native="active == image.key"
              :to="`/detail/${imagesStore.images[currentIndex + 1].key.split('.')[0]}`" size="lg" icon="i-heroicons-chevron-right"
              :ui="{ rounded: 'rounded-full' }" class="hidden md:flex mr-4" aria-label="Go to next image" />

            <!-- back to gallery if last image -->
            <div class="flex" v-else>
              <UButton @click.native="active == image.key" to="/" size="xl" color="gray" variant="ghost"
                class="back hidden md:flex mr-4 transition-colors duration-200" aria-label="Back to gallery">
                <UIcon name="i-heroicons-rectangle-group-20-solid" class="w-6 h-6" />
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
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
    view-transition-name: vtn-bottom-menu-button;
  }

  .back {
    view-transition-name: vtn-back-button;
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
