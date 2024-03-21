<script lang="ts" setup>
const { images, uploadImage } = useFile()

const carouselEl = ref<any>(null)
const isMounted = ref()

const bottomMenu = ref()
const savingImg = ref(false)
const currentIndex = ref()
// filter
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

const { loggedIn } = useUserSession()

const isSmallScreen = useMediaQuery('(max-width: 1024px)')
const { applyFilters, initSwipe, convertBase64ToFile, magnifierImage, downloadImage } = useImageGallery()
const router = useRouter()

// onKeyStroke('Escape', () => {
//   router.push('/')
// })

// onKeyStroke('ArrowLeft', () => {
//   if (isFirstMovie.value)
//     router.push('/')
//   else
//     router.push(`/detail/${images.value![currentIndex.value - 1].pathname.split('.')[0]}`)
// })

// onKeyStroke('ArrowRight', () => {
//   if (isLastMovie.value)
//     router.push('/')
//   else
//     router.push(`/detail/${images.value![currentIndex.value + 1].pathname.split('.')[0]}`)
// })

const imagesPath = computed(() => images.value.map((img: any) => `/images/${img.pathname}`))

watch([contrast, blur, invert, saturate, hueRotate, sepia], () => {
  filterUpdated.value = true
})

onMounted(async () => {
  const { image } = useRoute().query
  currentIndex.value = (images.value.findIndex((img: any) => img.pathname === image)) + 1

  setTimeout(async () => {
    isMounted.value = true
    carouselEl.value.select(currentIndex.value)
    if (isMounted.value) {
      watch(() => carouselEl.value && carouselEl.value.page, () => {
        updateQuery()
      }, { immediate: true })
    }
  }, 100)
})

onBeforeUnmount(() => isMounted.value = false)

function resetFilter() {
  contrast.value = 100
  blur.value = 0
  invert.value = 0
  saturate.value = 100
  hueRotate.value = 0
  sepia.value = 0
  filterUpdated.value = false
  magnifier.value = false
  zoomFactor.value = 1
}

function cancelFilter() {
  filter.value = false

  resetFilter()
}

async function saveImage() {
  const indexEl = carouselEl.value.page - 1
  const imageEl: any = document.getElementById(`imageEl${indexEl}`)
  const imageContainer = document.getElementById(`imageContainer${indexEl}`)

  savingImg.value = true

  const modifiedImage = await applyFilters(imageContainer, imageEl, contrast.value, blur.value, invert.value, saturate.value, hueRotate.value, sepia.value, true)

  const imageToUpload = await convertBase64ToFile(modifiedImage, images.value[currentIndex.value])

  await uploadImage(imageToUpload, true).finally(() => savingImg.value = false)
}

function applyMagnifier(e: any) {
  const indexEl: any = carouselEl.value.page - 1
  const imageEl: any = document.getElementById(`imageEl${indexEl}`)
  const imageContainer: any = document.getElementById(`imageContainer${indexEl}`)
  const magnifierEl: any = document.getElementById(`magnifierEl${indexEl}`)

  magnifierImage(e, imageContainer, imageEl, magnifierEl, zoomFactor.value)
}

async function download() {
  const indexEl: any = carouselEl.value.page - 1
  const imageContainer: any = document.getElementById(`imageContainer${indexEl}`)
  const imageEl: any = document.getElementById(`imageEl${indexEl}`)

  await downloadImage(images.value[indexEl].pathname, imageContainer, imageEl, contrast.value, blur.value, invert.value, saturate.value, hueRotate.value, sepia.value)
}

function onClickNavigation(prev: boolean = false) {
  const index = carouselEl.value.page

  if (prev && index.value !== 1) {
    currentIndex.value = index - 1
    carouselEl.value.select(currentIndex.value)
  }
  else if (!prev && index.value !== carouselEl.value.pages) {
    currentIndex.value = index + 1
    carouselEl.value.select(currentIndex.value)
  }

  updateQuery()
}

function updateQuery() {
  if (carouselEl.value)
    useRouter().replace(`${useRoute().path}?image=${images.value[carouselEl.value.page - 1].pathname}`)
}
</script>

<template>
  <div v-if="images && currentIndex">
    <UContainer class="overflow-x-hidden relative flex items-center justify-center">
      <Filter
        class="absolute md:mt-36 transition-transform duration-200" :class="filter ? 'translate-x-0 right-8 ' : 'translate-x-full right-0'"
        @reset-filter="resetFilter" @close-filter="filter = false"
      >
        <div class="flex flex-col gap-y-12 pb-6 h-[60dvh]" :class="filter ? 'block opacity-100' : 'hidden opacity-0'">
          <div class="flex flex-col gap-y-4">
            <!-- filters list -->
            <div class="flex gap-x-4 justify-between items-center pb-4">
              <span class="text-white w-40">Fit</span>
              <USelectMenu v-model="objectFitSelected" :options="objectsFit" class="!w-52 mr-4" />
            </div>

            <div class="flex gap-x-4 w-full justify-end pr-4 pb-4">
              <UCheckbox v-model="magnifier" name="magnifier" label="Magnifier" color="primary" :ui="{ label: 'text-gray-300 dark:text-gray-300' }" />
              <UIcon name="i-heroicons-magnifying-glass-solid" class="w-5 h-5 text-gray-300" />
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
        <BottomMenu ref="bottomMenu" class="bottom-menu" :class="{ 'right-[350px]': filter }">
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
                <UTooltip text="Back to gallery" :shortcuts="['Esc']">
                  <UButton variant="ghost" color="gray" to="/" size="md" icon="i-heroicons-rectangle-group-20-solid" aria-label="Back to gallery" class="back flex transition-colors duration-200" />
                </UTooltip>
                <!-- open filters -->
                <!-- v-if="loggedIn"  -->
                <UTooltip text="Add filters">
                  <UButton
                    variant="ghost" color="gray"
                    size="md" icon="i-heroicons-paint-brush-20-solid" aria-label="Add filters on image" class="hidden lg:flex"
                    @click="filter = true"
                  />
                </UTooltip>
                <!-- open original -->
                <UTooltip text="Open in a new tab">
                  <UButton
                    v-if="carouselEl && carouselEl.page"
                    variant="ghost" color="gray"
                    icon="i-heroicons-arrow-up-right-20-solid"
                    size="md"
                    :to="`/images/${images[carouselEl.page - 1].pathname}`"
                    target="_blank"
                    aria-label="Open original image"
                  />
                </UTooltip>
                <UTooltip text="Download image">
                  <UButton
                    v-if="carouselEl && carouselEl.page"
                    variant="ghost" color="gray"
                    icon="i-heroicons-arrow-down-tray-20-solid"
                    size="md"
                    class="hidden md:flex"
                    @click="download()"
                  />
                </UTooltip>
              </div>

              <div v-else class="flex gap-x-2 items-center">
                <UTooltip v-if="loggedIn" text="Save filtered image">
                  <UButton
                    :loading="savingImg"
                    variant="ghost" color="gray"
                    icon="i-heroicons-check-20-solid" class="hidden md:flex" aria-label="Upload original or modified image to gallery"
                    @click="saveImage()"
                  />
                </UTooltip>
                <UTooltip text="Cancel filters">
                  <UButton
                    variant="ghost" color="gray"
                    icon="i-heroicons-x-mark" class="hidden md:flex" aria-label="Upload original or modified image to gallery"
                    @click="cancelFilter()"
                  />
                </UTooltip>
              </div>
            </div>
          </template>
        </BottomMenu>
        <div
          :class="{ '-translate-x-[100px]': filter }"
          class="transition-all duration-200 overflow-hidden pt-8 flex items-center justify-center w-full h-screen relative"
        >
          <div class="flex items-center justify-center md:justify-between gap-x-4 w-full h-full">
            <UCarousel
              ref="carouselEl"
              indicators
              :items="imagesPath" arrows class="rounded-lg overflow-hidden h-full flex items-center justify-center"
              :ui="{ item: 'basis-full flex items-center justify-center', base: 'h-full', indicators: { wrapper: 'absolute overflow-x-auto flex items-start justify-center gap-3 bottom-auto top-0 z-50', container: 'carousel-class' } }"
              :prev-button="{
                color: 'gray',
                icon: 'i-heroicons-arrow-left-20-solid',
              }"
              :next-button="{
                color: 'gray',
                icon: 'i-heroicons-arrow-right-20-solid',
              }"
            >
              <template #default="{ item, index }">
                <div class="relative flex items-center justify-center xl:m-16">
                  <div :id="`imageContainer${(index)}`">
                    <div class="group">
                      <img
                        :id="`imageEl${(index)}`"
                        :src="item" width="800" height="800" draggable
                        :class="[filter ? 'h-[600px]' : 'w-full']"
                        :style="`filter: contrast(${contrast}%) blur(${blur}px) invert(${invert}%) saturate(${saturate}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%); object-fit:${objectFitSelected.toLowerCase()};`"
                        class="h-[800px] transition-all duration-[0.4s]"
                        crossorigin="anonymous"
                        @mousemove="magnifier ? applyMagnifier($event) : () => {}"
                      >
                      <div v-if="magnifier" :id="`magnifierEl${(index)}`" class="w-[100px] h-[100px] absolute border border-gray-200 pointer-events-none rounded-full block opacity-0 group-hover:opacity-100 transition-opacity duration-200" :style="`background-image: url('${item}'`" />
                    </div>
                  </div>
                </div>
              </template>

              <template #indicator="{ onClick, page, active }">
                <img :src="`images/${images[page - 1].pathname}`" width="80" height="50" class="h-[50px] w-[80px] cursor-pointer rounded-md object-cover" :class="{ 'brightness-[.6]': !active }" @click="onClick(page)">
              </template>

              <template #prev="{ disabled }">
                <UTooltip :text="disabled ? 'Back to gallery' : 'previous image'" :shortcuts="[disabled ? 'Esc' : '←']" class="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <UButton
                    color="black" size="xl" class="text-gray-200 rtl:[&_span:first-child]:rotate-180 rounded-full ring-gray-200" :icon="disabled ? 'i-heroicons-rectangle-group-20-solid' : 'i-heroicons-chevron-left-20-solid'"
                    @click="disabled ? $router.push('/') : onClickNavigation(true)"
                  />
                </UTooltip>
              </template>

              <template #next="{ disabled }">
                <UTooltip :text="disabled ? 'Back to gallery' : 'next image'" :shortcuts="[disabled ? 'Esc' : '→']" class="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <UButton
                    color="black" class="rtl:[&_span:last-child]:rotate-180 rounded-full" :icon="disabled ? 'i-heroicons-rectangle-group-20-solid' : ' i-heroicons-chevron-right-20-solid'" size="xl"
                    @click="disabled ? $router.push('/') : onClickNavigation()"
                  />
                </UTooltip>
              </template>
            </UCarousel>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>
