<script setup lang="ts">
import type { Image } from 'types'

const props = defineProps({
  image: {
    type: Object,
    default: null
  }
})

const { loggedIn } = useUserSession()
const { fetchImages } = useImageGallery()

const fileInputEl: Ref<HTMLElement | undefined> = ref()
const selectedFile = ref()
const name = ref('Nuxt Gallery Image')
const base64Img = ref()
const scrollHeight = document.documentElement.scrollHeight;
const keepOriginal = ref(false)
const emit = defineEmits(['closeModal', 'success'])
const router = useRouter()

const upload = () => {
  fileInputEl.value?.click()
}

const handleFileUpload = async (event: any) => {
  selectedFile.value = event.target.files[0];

  await convertToBase64(selectedFile.value)
}

const convertToBase64 = async (selectedFile: any) => {
  const reader = new FileReader();

  reader.onload = () => {
    base64Img.value = reader.result
  }

  reader.readAsDataURL(selectedFile)
}

const convertBase64ToFile = async (image: any) => {
  const url = image.currentSrc;

  await fetch(url)
    .then(res => res.blob())
    .then(async blob => {
      selectedFile.value = blob

      await convertToBase64(new File([blob], "File name", { type: "image/png" }))
    })
}

const saveImage = () => {
  if (!loggedIn.value) {
    return alert('You need to login to add your image!')
  }

  $fetch('/api/upload', {
    method: 'POST',
    body: { name: name.value, base64: base64Img.value, imageId: props.image && !keepOriginal.value ? props.image.id : undefined }})
    .then(async (e) => await fetchImages())
    .finally(() => {
      closeModal()

      if (props.image) {
        router.push('/')
      }
    })
}

const closeModal = () => {
  emit('closeModal')

  window.scrollTo({
    top: scrollHeight,
    behavior: 'smooth'
  });
}

onMounted(async () => {
  if (props.image) {
    await convertBase64ToFile(props.image.newImage)
  }
})
</script>


<template>
  <div class="p-8 bg-gray-900/70 backdrop-blur flex flex-col gap-y-4">
    <UCheckbox v-if="props.image" label="Keep original" v-model="keepOriginal" />
    <UInputGroup label="Image Name" hint="Required" required>
      <UInput placeholder="name" v-model="name" />
    </UInputGroup>
    <UInputGroup label="Upload an image" hint="Required" required>
      <UButton @click="upload()" label="Upload" icon="i-heroicons-cloud-arrow-down" size="xl" />
      <input type="file" ref="fileInputEl" class="hidden" @change="handleFileUpload" />
    </UInputGroup>
    <div v-if="selectedFile" class="flex items-center justify-center flex-col gap-y-4">
      <NuxtImg v-if="base64Img" width="240px" height="240px" class="object-contain w-full h-60" :src="base64Img" :format="selectedFile.type.split('/')[1]" />
      <UButton @click="saveImage()" color="green" variant="outline" label="Add to gallery" icon="i-heroicons-plus-20-solid" size="lg" class="transition-colors duration-200" />
    </div>
  </div>
</template>
