<script setup lang="ts">
const isOpen = ref(false)

const dropZoneRef = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()
const mansoryItem = ref<Array<HTMLElement>>([])

const { uploadImage, deleteImage, images } = useFile()
const { loggedIn, clear } = useUserSession()

const active = useState()

const isSmallScreen = useMediaQuery('(max-width: 1024px)')
useDropZone(dropZoneRef, onDrop)

function openFilePicker() {
  fileInput.value?.click()
}

async function fileSelection(event: any) {
  await uploadImage(event.target.files[0])
}

async function onDrop(files: any) {
  await uploadImage(files[0])
}
</script>

<template>
  <section ref="dropZoneRef" class="relative h-screen gap-[22px] p-4">
    <USlideover v-model="isOpen" class="flex items-center justify-center" side="left">
      <Login class="z-50 bg-gray-800 rounded-md" @close-login="isOpen = false" />
      <UButton icon="i-heroicons-x-mark" class="absolute right-4 top-4" @click="isOpen = false" />
    </USlideover>

    <BottomMenu class="bottom-menu">
      <template #logo>
        <img src="/logo.svg" width="29" height="20">
      </template>
      <template #description>
        <p class="bottom-menu-description">
          Media Gallery template
        </p>
      </template>
      <template #buttons>
        <div class="flex gap-x-2">
          <UButton v-if="loggedIn" icon="i-heroicons-power-20-solid" color="red" variant="ghost" @click="clear" />
          <UButton v-else label="Sign in" color="green" variant="ghost" aria-label="Sign in" @click="isOpen = true" />
        </div>
      </template>
    </BottomMenu>

    <div class="masonry-container w-full">
      <ul v-if="images && images.length" class="grid grid-cols-1 gap-4 lg:block">
        <li v-for="image in images" ref="mansoryItem" :key="image.pathname" class="relative w-full group masonry-item">
          <UButton v-if="loggedIn" color="white" icon="i-heroicons-trash-20-solid" class="absolute top-4 right-4 z-[9999] opacity-0 group-hover:opacity-100" @click="deleteImage(image.pathname)" />
          <NuxtLink :to="`/detail/${image.pathname.split('.')[0]}`" @click="active = image.pathname.split('.')[0]">
            <img
              v-if="image"
              width="527"
              height="430"
              :src="`/images/${image.pathname}`"
              class="h-auto w-full max-h-[430px] rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-100 will-change-[filter] object-cover"
            >
          </NuxtLink>
        </li>
      </ul>
      <div v-if="loggedIn" :class="{ 'mb-4': isSmallScreen }">
        <input ref="fileInput" class="hidden" type="file" accept="image/*" @change="fileSelection">
        <UploadButton type="submit" @click="openFilePicker" />
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

@media screen and (min-width: 1024px) {
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
}
</style>
