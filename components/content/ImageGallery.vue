<script setup lang="ts">
import { useImagesStore } from '../../stores/images'

const { loggedIn } = useUserSession()
const { fetchImages } = useImageGallery()
const { width } = useWindowSize()

const imagesStore = useImagesStore()

const isOpen = ref(false)
const isOpenUpload = ref(false)
const mansoryItem = ref<Array<HTMLElement>>([])

const { data: files, refresh } = await useFetch('/api/files')

imagesStore.images = files

watch(() => width.value, () => {
  resizeMasonryItem()
})

defineProps({
  bottomMenuDescription: {
    type: String,
    default: 'Media Gallery template'
  },
  bottomMenuButtonText: {
    type: String,
    default: 'Clone'
  }
})

const active = useState()

const resizeMasonryItem = () => {
  mansoryItem.value.map((item: HTMLElement) => {
    const img = item.querySelector('img') as HTMLElement

    item.style.gridRowEnd = `span ${Math.ceil(img?.offsetHeight / 10)}`
  })
}

async function deleteFile(key: string) {
  await $fetch(`/api/files/${key}`, {
    method: 'DELETE'
  })
  await refresh()
}

const onUploadDone = async () => {
  await refresh()

  isOpenUpload.value = false
}

</script>

<template>
  <section class="gap-[22px] relative p-4">
    <UModal v-model="isOpen">
      <Login @close-modal="isOpen = false" />
    </UModal>

    <UModal v-model="isOpenUpload">
      <Upload @close-modal="onUploadDone" />
    </UModal>

    <BottomMenu class="bottom-menu">
      <template #logo>
        <img src="/images/logo.svg" width="29" height="20" />
      </template>
      <template #description>
        <p class="bottom-menu-description">
          {{ bottomMenuDescription }}
        </p>
      </template>
      <template #buttons>
        <div class="flex gap-x-2">
          <UButton @click="isOpen = true" :label="!loggedIn ? 'Sign in' : ''" :icon="loggedIn ? 'i-heroicons-power-20-solid' : ''" :color="!loggedIn ? 'green' : 'red'" variant="outline" :aria-label="!loggedIn ? 'Sign in' : ''" />
        </div>
      </template>
    </BottomMenu>

    <div class="masonry-container">
      <UButton v-if="loggedIn" @click="isOpenUpload = true" variant="outline" color="white" class="border border-1 border-gray-500 border-dashed ring-transparent h-[430px] transition-colors duration-200 rounded-md upload group" :rounded="false">
          <div class="w-full rounded-md flex items-center justify-center h-[430px]">
            <img src="/icons/upload.svg" class="group-hover:hidden h-12 w-12 m-auto absolute" />
            <div class="relative opacity-0 group-hover:opacity-100 flex w-full h-full justify-center items-center transition-all duration-100">
              <img src="/icons/upload-solid.svg" class="absolute m-auto h-12 w-12 transition-all duration-100 group-hover:-translate-y-5" />
              <span class="absolute m-auto group-hover:translate-y-5 transition-all duration-100 ">Upload image</span>
            </div>
          </div>
        </UButton>

      <article v-for="image in files" class="relative w-full group masonry-item" ref="mansoryItem">
        <UButton color="white" icon="i-heroicons-trash-20-solid" @click.native="deleteFile(image.key)" class="absolute top-4 right-4 z-[9999] opacity-0 group-hover:opacity-100" />

        <NuxtLink :to="`/detail/${image.key.split('.')[0]}`" @click.native="active = image.key.split('.')[0]">
          <img
            v-if="image"
            width="527"
            height="430"
            :src="image.url"
            :alt="image.key"
            class="h-auto w-full max-h-[430px] rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-100 will-change-[filter] object-cover"
            :class="{ active: active === image.key.split('.')[0] }"
          />
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

<style scoped lang="postcss">
@media (min-width: 768px) {
  img.active {
    view-transition-name: vtn-image;
  }

  .bottom-menu.active {
    view-transition-name: vtn-bottom-menu
  }

  .bottom-menu-description {
    view-transition-name: vtn-bottom-menu-description
  }

  .bottom-menu-button {
    view-transition-name: vtn-bottom-menu-button
  }
}

.container-image {
  background-color: rgba(255, 255, 255, 0.1)
}
.container-image:hover {
  background-color: transparent;
}

.border-image {
  border-width: 1.15px;
  border-color: rgba(255, 255, 255, 0.1)
}

.masonry-container {
  column-count: 3;
  column-gap: 20px;
  column-fill: balance;
  margin: 20px auto 0;
  padding: 2rem;
}

.masonry-item, .upload {
  display: inline-block;
  margin: 0 0 20px;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  width: 100%;
}
</style>
