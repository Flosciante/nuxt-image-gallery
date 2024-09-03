<script setup lang="ts">
const isOpen = ref(false)

const dropZoneRef = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()
const mansoryItem = ref<Array<HTMLElement>>([])
const deletingImg = ref('')
const uploadingImg = ref(false)
const disconnect = ref(false)

const toast = useToast()
const { uploadImage, deleteImage, images } = useFile()
const { loggedIn, clear } = useUserSession()

const active = useState()

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

function openFilePicker() {
  fileInput.value?.click()
}

async function fileSelection(event: Event) {
  const target = event.target as HTMLInputElement

  if (target.files?.[0]) {
    await uploadFile(target.files[0])
  }
}

async function onDrop(files: File[] | null) {
  if (files) {
    await uploadFile(files[0] as File)
  }
}

async function uploadFile(file: File) {
  uploadingImg.value = true

  await uploadImage(file)
    .catch(() => toast.add({ title: 'An error occured', description: 'Please try again', color: 'red' }))
    .finally(() => uploadingImg.value = false)
}

async function deleteFile(pathname: string) {
  deletingImg.value = pathname

  await deleteImage(pathname)
    .catch(() => toast.add({ title: 'An error occured', description: 'Please try again', color: 'red' }))
    .finally(() => deletingImg.value = '')
}

async function clearSession() {
  disconnect.value = true

  await clear().finally(() => disconnect.value = false)
}
</script>

<template>
  <div>
    <section
      v-if="images"
      ref="dropZoneRef"
      class="relative h-screen gap-[22px] p-4"
    >
      <UModal
        v-model="isOpen"
        class="flex items-center justify-center relative"
        side="left"
      >
        <LoginForm
          class="z-50 bg-gray-800 rounded-md"
          @close="isOpen = false"
        />
      </UModal>

      <BottomMenu class="bottom-menu">
        <template #logo>
          <img
            src="/logo.svg"
            width="29"
            height="20"
          >
        </template>
        <template #description>
          <div class="flex gap-x-4 items-center">
            <p class="bottom-menu-description text-sm sm:text-base leading-tight sm:leading-normal">
              Media Gallery template
            </p>
            <NuxtLink
              to="https://github.com/Flosciante/nuxt-image-gallery"
              target="blank"
              class="flex items-center"
            >
              <UIcon
                name="i-simple-icons-github"
                class="w-5 h-5"
              />
            </NuxtLink>
          </div>
        </template>
        <template #buttons>
          <div class="flex gap-x-2">
            <UButton
              v-if="loggedIn"
              :loading="disconnect"
              icon="i-heroicons-power-20-solid"
              color="red"
              variant="ghost"
              @click="clearSession"
            />
            <UButton
              v-else
              label="Sign in"
              color="green"
              variant="ghost"
              aria-label="Sign in"
              class="mr-4 sm:mr-0"
              @click="isOpen = true"
            />
          </div>
        </template>
      </BottomMenu>

      <div
        class="w-full"
        :class="{ 'masonry-container': images && images.length }"
      >
        <div v-if="loggedIn">
          <input
            ref="fileInput"
            class="hidden"
            type="file"
            accept="image/*"
            @change="fileSelection"
          >
          <UploadButton
            :uploading="uploadingImg"
            type="submit"
            class="mb-6"
            :is-over-drop-zone="isOverDropZone"
            @click="openFilePicker"
          />
        </div>
        <div
          v-else
          class="text-2xl text-white flex flex-col gap-y-4 items-center justify-center h-full w-full pb-8"
        >
          <h1 class="font-medium text-5xl">
            Welcome to image gallery
          </h1>
          <p class="text-gray-400">
            You must be logged in to start uploading images
          </p>
        </div>

        <ul
          v-if="images && images.length"
          class="grid grid-cols-1 gap-4 lg:block"
        >
          <li
            v-for="image in images"
            ref="mansoryItem"
            :key="image.pathname"
            class="relative w-full group masonry-item"
          >
            <UButton
              v-if="loggedIn"
              :loading="deletingImg === image.pathname"
              color="white"
              icon="i-heroicons-trash-20-solid"
              class="absolute top-4 right-4 z-[9999] opacity-0 group-hover:opacity-100"
              @click="deleteFile(image.pathname)"
            />
            <NuxtLink
              :to="`/detail/${image.pathname.split('.')[0]}`"
              @click="active = image.pathname.split('.')[0]"
            >
              <img
                v-if="image"
                width="527"
                height="430"
                :src="`/images/${image.pathname}`"
                :class="{ imageEl: image.pathname.split('.')[0] === active }"
                class="h-auto w-full max-h-[430px] rounded-md transition-all duration-200 border-image brightness-[.8] hover:brightness-100 will-change-[filter] object-cover"
              >
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
    <div
      v-else
      class="flex items-center space-x-4 z-10"
    >
      <USkeleton
        class="h-12 w-12 bg-primary-500"
        :ui="{ rounded: 'rounded-full' }"
      />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px] bg-primary-500" />
        <USkeleton class="h-4 w-[200px] bg-primary-500" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
@media (min-width: 768px) {
  .imageEl {
    view-transition-name: vtn-image;
  }

  .bottom-menu-description {
    view-transition-name: vtn-bottom-menu-description;
  }

  .bottom-menu-button {
    view-transition-name: vtn-bottom-menu-button;
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
