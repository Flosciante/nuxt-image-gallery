<script setup lang="ts">
const carouselRef = ref(null)
const imgEl = ref()
const imageEl = ref()
const imageContainer = ref()
const bottomMenu = ref()

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

const { downloadImage, applyFilters, convertBase64ToFile, magnifierImage } = useImageGallery()

const { data: images } = await useFetch('/api/images')

const imagesPath = computed(() => images.value?.map((img: any) => `/api/images/${img.pathname}`))

function resetFilter() {
  contrast.value = 100
  blur.value = 0
  invert.value = 0
  saturate.value = 100
  hueRotate.value = 0
  sepia.value = 0
  filterUpdated.value = false
}

function getCurrentSrc() {
  const img = ref(imgEl.value)

  if (img.value)
    return img.value.currentSrc.split('/').pop()
}

function cancelFilter() {
  filter.value = false

  resetFilter()
}

async function saveImage() {
  if (filterUpdated.value) {
    const modifiedImage = await applyFilters(imageContainer.value, imageEl.value, contrast.value, blur.value, invert.value, saturate.value, hueRotate.value, sepia.value, true)

    const imageToUpload = await convertBase64ToFile(modifiedImage, image)

    await uploadFile([imageToUpload], true)
  }
}

watch([contrast, blur, invert, saturate, hueRotate, sepia], () => {
  filterUpdated.value = true
})
</script>

<template>
  <div class="relative">
    <UContainer class="flex items-center justify-center h-screen">
      <UCarousel ref="carouselRef" :items="imagesPath" :ui="{ item: 'basis-full', indicators: { wrapper: 'top-0 bottom-full' } }" indicators arrows>
        <template #default="{ item }">
          <div ref="imageContainer" class="w-full h-full flex items-center justify-center">
            <img ref="imageEl" :src="item" class="w-3/4 h-3/4" draggable="false">
          </div>
        </template>

        <template #indicator="{ onClick, page, active }">
          <img :src="`${imagesPath![page - 1]}`" width="100" class="rounded-xl -mb-8" :class="{ 'brightness-50': !active }" @click="onClick(page)">
        <!-- <UButton :label="String(page)" :variant="active ? 'solid' : 'outline'" size="2xs" class="rounded-full min-w-6 justify-center" @click="onClick(page)" /> -->
        </template>
      </UCarousel>

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
              <!-- open filters -->
              <UTooltip text="Add filters">
                <UButton
                  size="md" color="transparent" icon="i-heroicons-paint-brush-20-solid" aria-label="Add filters on image" class="hidden lg:flex"
                  @click="filter = true"
                />
              </UTooltip>
              <!-- open original -->
              <UTooltip text="Open in a new tab">
                <UButton
                  icon="i-heroicons-arrow-up-right-20-solid" size="md"
                  :to="`/images/${getCurrentSrc()}`" target="_blank" aria-label="Open original image"
                />
              </UTooltip>
              <!-- download original or modified image -->
              <UTooltip text="Download">
                <UButton
                  icon="i-heroicons-arrow-down-tray-20-solid" size="md"
                  class="hidden md:flex"
                  aria-label="Download original or modified image"
                  @click="downloadImage(getCurrentSrc(), imageContainer, imageEl, contrast, blur, invert, saturate, hueRotate, sepia)"
                />
              </UTooltip>
            </div>

            <div v-else class="flex gap-x-2 items-center">
              <UTooltip text="Save filtered image">
                <UButton
                  icon="i-heroicons-check-20-solid" class="hidden md:flex" aria-label="Upload original or modified image to gallery"
                  @click="saveImage()"
                />
              </UTooltip>
              <UTooltip text="Cancel filters">
                <UButton
                  icon="i-heroicons-x-mark" class="hidden md:flex" aria-label="Upload original or modified image to gallery"
                  @click="cancelFilter()"
                />
              </UTooltip>
            </div>
          </div>
        </template>
      </BottomMenu>

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
    </UContainer>
  </div>
</template>
