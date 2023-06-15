<script setup lang="ts">
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

const isOpen = ref(false)
const isOpenUpload = ref(false)
const mansoryItem = ref<Array<HTMLElement>>([])
const dropZoneRef = ref<HTMLButtonElement>()

const { loggedIn, clear } = useUserSession()

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

const active = useState()

const { images, uploadFile, deleteFile } = useFile()

async function onDrop(files: any) {
  uploadFile(files)
}

</script>

<template>
  <section class="gap-[22px] relative p-4">

    <UModal v-model="isOpen">
      <Login @close-modal="isOpen = false" />
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
          <UButton v-if="loggedIn" @click="clear" icon="i-heroicons-power-20-solid" color="red" variant="outline" />
          <UButton v-else @click="isOpen = true" label="Sign in" color="green" variant="outline" aria-label="Sign in" />
        </div>
      </template>
    </BottomMenu>

    <div class="masonry-container">
      <div ref="dropZoneRef">
        <UButton v-if="loggedIn" @click="isOpenUpload = true" variant="outline" color="white" class="border border-1 border-gray-500 border-dashed ring-transparent h-[430px] transition-colors duration-200 rounded-md upload group" :rounded="false">
          <div class="w-full rounded-md flex flex-col gap-2 items-center justify-center h-[430px opacity-50 group-hover:opacity-100">
            <span class="i-heroicons-arrow-up-tray-20-solid h-12 w-12" />
            <span class="transition-all duration-100 ">Drag & drop to upload an image</span>
          </div>
        </UButton>
      </div>

      <ul v-if="images && images.length">
        <li v-for="image in images" class="relative w-full group masonry-item" ref="mansoryItem">
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
        </li>
      </ul>
      <div v-if="(!images || !images.length) && !loggedIn" class="absolute inset-0 flex flex-col gap-2 w-full h-screen items-center justify-center">
        <h3 class="text-4xl text-white">Welcome to the Image Gallery template.</h3>
        <p class="text-gray-300 text-xl">Please sign-in to upload images.</p>
      </div>
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
