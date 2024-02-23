<script setup lang="ts">

const bottomMenu = ref()
const imageEl = ref<any>()
const magnifierEl = ref<HTMLElement>()
const imageContainer = ref<HTMLElement>()

//filter
const filter = ref(false)
const contrast = ref(100)
const blur = ref(0)
const hueRotate = ref(0)
const invert = ref(0)
const saturate = ref(100)
const sepia = ref(0)
const magnifier = ref(false)
const zoomFactor = ref(1)
const objectsFit = ref(['Contain', 'Cover', 'Scale-down', 'Fill', 'None'])
const objectFitSelected = ref(objectsFit.value[0])
const filterUpdated = ref(false)

const { images, uploadFile } = useFile()
const { loggedIn } = useUserSession()

const isSmallScreen = useMediaQuery('(max-width: 1024px)')
const { currentIndex, isFirstMovie, isLastMovie, downloadImage, applyFilters, initSwipe, convertBase64ToFile, magnifierImage } = useImageGallery()

const active = useState()
const route = useRoute()
const router = useRouter()

const image: any = computed(() => {
  return images.value!.filter((file: any) => file.key.split('.')[0] === route.params.slug[0])[0]
})

onKeyStroke('Escape', (e) => {
  router.push('/')
})

onKeyStroke('ArrowLeft', (e) => {
  if (isFirstMovie.value) {
    router.push('/')
  } else {
    router.push(`/detail/${images.value![currentIndex.value - 1].key.split('.')[0]}`)
  }
})

onKeyStroke('ArrowRight', (e) => {
  if (isLastMovie.value) {
    router.push('/')
  } else {
    router.push(`/detail/${images.value![currentIndex.value + 1].key.split('.')[0]}`)
  }
})

const resetFilter = () => {
  contrast.value = 100
  blur.value = 0
  invert.value = 0
  saturate.value = 100
  hueRotate.value = 0
  sepia.value = 0
  filterUpdated.value = false
}

const cancelFilter = () => {
  filter.value = false

  resetFilter()
}

const saveImage = async () => {
  if (filterUpdated.value) {
    const modifiedImage = await applyFilters(imageContainer.value, imageEl.value, contrast.value, blur.value, invert.value, saturate.value, hueRotate.value, sepia.value, true)

    const imageToUpload = await convertBase64ToFile(modifiedImage, image)

    await uploadFile([imageToUpload], true)
  }
}

watch([contrast, blur, invert, saturate, hueRotate, sepia], () => {
  filterUpdated.value = true
})

onMounted(() => initSwipe(imageEl))
</script>

<template>
  <div v-if="image">
    <!-- background -->
    <div class="absolute inset-0 w-full h-full">
      <img :src="image.url"
        class="object-cover w-full h-full blur-[70px] brightness-[.2] will-change-[filter]" alt="" />
    </div>

    <UContainer class="overflow-x-hidden relative flex items-center justify-center">
      <Filter class="absolute md:mt-36 transition-transform duration-200" :class="filter ? 'translate-x-0 right-8 ' : 'translate-x-full right-0'"
        @reset-filter="resetFilter" @close-filter="filter = false">
        <div class="flex flex-col gap-y-12 pb-6 h-[60dvh]" :class="filter ? 'block opacity-100' : 'hidden opacity-0'">
          <div class="flex flex-col gap-y-4">
            <!-- filters list -->
            <div class="flex gap-x-4 justify-between items-center pb-4">
              <span class="text-white w-40">Fit</span>
              <USelectMenu v-model="objectFitSelected" :options="objectsFit" class="!w-52 mr-4" />
            </div>

            <div class="flex gap-x-4 w-full justify-end pr-4 pb-4">
              <UCheckbox v-model="magnifier" name="magnifier" label="Magnifier" />
              <UIcon name="i-heroicons-magnifying-glass-solid" class="w-5 h-5" />
            </div>

            <Gauge v-if="magnifier" v-model="zoomFactor" :max="4" title="Zoom level" />
            <Gauge v-model="sepia" :max="100" title="Sepia" />
            <Gauge v-model="hueRotate" :max="180" title="Hue-rotate" />
            <Gauge v-model="saturate" :max="100" title="Saturate" />
            <Gauge v-model="invert" :max="100" title="Invert" />
            <Gauge v-model="contrast" :max="200" title="Contrast" />
            <Gauge v-model="blur" :max="5" title="Blur" />
          </div>
        </div>
      </Filter>

      <div class="h-full w-full max-w-7xl flex items-center justify-center relative mx-auto">
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
                <UTooltip v-if="!(isFirstMovie || isLastMovie) || isSmallScreen" text="Back to gallery" :shortcuts="['Esc']">
                  <UButton to="/" size="md" icon="i-heroicons-rectangle-group-20-solid" aria-label="Back to gallery" class="back flex transition-colors duration-200" />
                </UTooltip>
                <!-- open filters-->
                <UTooltip v-if="loggedIn" text="Add filters">
                  <UButton  @click="filter = true" size="md" icon="i-heroicons-paint-brush-20-solid" aria-label="Add filters on image"
                    class="hidden lg:flex" />
                </UTooltip>
                <!-- open original-->
                <UTooltip text="Open in a new tab">
                  <UButton icon="i-heroicons-arrow-up-right-20-solid" size="md"
                    :to="image.url" target="_blank" aria-label="Open original image" />
                </UTooltip>
                <!-- download original or modified image -->
                <UTooltip text="Download">
                  <UButton icon="i-heroicons-arrow-down-tray-20-solid" size="md"
                    @click="downloadImage(image.key, imageContainer, imageEl, contrast, blur, invert, saturate, hueRotate, sepia)"
                    class="hidden md:flex" aria-label="Download original or modified image" />
                </UTooltip>
              </div>

              <div v-else class="flex gap-x-2 items-center">
                <UTooltip text="Save filtered image">
                  <UButton icon="i-heroicons-check-20-solid" @click="saveImage()" class="hidden md:flex"
                  aria-label="Upload original or modified image to gallery" />
                </UTooltip>
                <UTooltip text="Cancel filters">
                  <UButton icon="i-heroicons-x-mark" @click="cancelFilter()" class="hidden md:flex"
                  aria-label="Upload original or modified image to gallery" />
                </UTooltip>
              </div>
            </div>
          </template>
        </BottomMenu>

        <div
          :class="{ '-translate-x-[100px]': filter }"
          class="transition-all duration-200 overflow-hidden pt-8 flex items-center justify-center w-full h-screen relative">
          <div class="flex items-center justify-center md:justify-between gap-x-4 w-full">
            <!-- previous image if not the first image -->
            <UTooltip v-if="!isFirstMovie" text="Previous" :shortcuts="['←']">
              <UButton  @click.native="active === image.key.split('.')[0]"
                :to="`/detail/${images![currentIndex - 1].key.split('.')[0]}`" size="lg" icon="i-heroicons-chevron-left"
                class="hidden md:flex ml-4" aria-label="Go to previous image" />
            </UTooltip>

            <div class="flex group" v-else>
              <!-- back to gallery if first movie -->
              <UTooltip text="Back to gallery" :shortcuts="['Esc']">
                <UButton @click.native="active === image.key.split('.')[0]" to="/" size="xl" color="gray" variant="ghost"
                  class="back hidden md:flex ml-4 transition-colors duration-200" aria-label="Back to gallery">
                  <UIcon name="i-heroicons-rectangle-group-20-solid" class="w-6 h-6" />
                </UButton>
              </UTooltip>
            </div>

            <!-- image -->
            <div class="relative flex items-center justify-center xl:m-16">
              <div ref="imageContainer">
                <div class="group">
                  <img v-if="image" :src="image.url" :alt="image.key" class="rounded object-contain transition-all duration-200 block"
                    :class="[{ active: route.params.slug[0] === image.key.split('.')[0] }, filter ? 'w-[80%] ml-[12px]' : 'w-full']" ref="imageEl"
                    :style="`filter: contrast(${contrast}%) blur(${blur}px) invert(${invert}%) saturate(${saturate}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%); object-fit:${objectFitSelected.toLowerCase()};`"
                    crossorigin="anonymous"   @mousemove="magnifierImage($event, imageContainer, imageEl, magnifierEl!, zoomFactor)" />
                    <div v-if="magnifier" ref="magnifierEl" class="w-[100px] h-[100px] absolute border border-gray-200 pointer-events-none rounded-full block opacity-0 group-hover:opacity-100 transition-opacity duration-200 " :style="`background-image: url(${image.url}`" />
                  </div>
                </div>
            </div>

            <!-- next image (if not the last image) -->
            <UTooltip v-if="!isLastMovie" text="Next" :shortcuts="['→']">
              <UButton @click.native="active === image.key.split('.')[0]"
                :to="`/detail/${images![currentIndex + 1].key.split('.')[0]}`" size="lg" icon="i-heroicons-chevron-right"
                :ui="{ rounded: 'rounded-full' }" class="hidden md:flex mr-4" aria-label="Go to next image" />
            </UTooltip>

            <!-- back to gallery if last image -->
            <UTooltip v-else text="Back to gallery" :shortcuts="['Esc']">
              <div class="flex">
                <UButton @click.native="active === image.key.split('.')[0]" to="/" size="xl" color="gray" variant="ghost"
                  class="back hidden md:flex mr-4 transition-colors duration-200" aria-label="Back to gallery">
                  <UIcon name="i-heroicons-rectangle-group-20-solid" class="w-6 h-6" />
                </UButton>
              </div>
            </UTooltip>
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
