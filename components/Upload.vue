<script setup lang="ts">

const props = defineProps({
  image: {
    type: Object,
    default: null
  }
})


const fileInputEl: Ref<HTMLElement | undefined> = ref()
const dropZoneRef = ref<HTMLDivElement>()

const { loggedIn } = useUserSession()
const { fetchImages } = useImageGallery()
const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

const selectedFile = ref(null)
const name = ref('Nuxt Gallery Image')
const base64Img = ref(null)
const keepOriginal = ref(false)
const filesData = ref([])
const scrollHeight = document.documentElement.scrollHeight;

const emit = defineEmits(['closeModal', 'success'])

const router = useRouter()


const upload = () => {
  fileInputEl.value?.click()
}

async function onDrop(files: File[] | null) {
  if (files) {
    selectedFile.value = files[0];

    await convertToBase64(selectedFile.value)
  }
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

const cancel = () => {
  emit('closeModal')
}

onMounted(async () => {
  if (props.image) {
    await convertBase64ToFile(props.image.newImage)
  }
})
</script>


<template>
  <div class="p-8 bg-gray-900/70 backdrop-blur flex flex-col gap-y-5">
    <UCheckbox v-if="props.image" label="Keep original" v-model="keepOriginal" />
    <div ref="dropZoneRef" @click="upload()" class="border border-1 border-gray-500 border-dashed h-[197px] w-[447px] flex items-center justify-center rounded-sm !ring-transparent" color="white">
      <div v-if="!selectedFile" class="flex gap-y-2 w-full h-full justify-center items-center flex-col">
        <img v-if="!isOverDropZone" src="/icons/upload-solid.svg" class="text-gray-700 h-12 w-12" />
        <span v-if="!isOverDropZone" class="text-white">Drag & drop or click to upload</span>
        <UIcon v-if="isOverDropZone" name="i-heroicons-plus-circle-20-solid" class="w-12 h-12 text-green-500" />
        <input type="file" ref="fileInputEl" class="hidden" @change="handleFileUpload" />
      </div>
      <div v-else @click="upload()">
        <NuxtImg v-if="base64Img" width="447" height="197" class="object-cover h-[195px] w-[445px]" :src="base64Img" :format="selectedFile.type.split('/')[1]" />
      </div>
    </div>
    <UInputGroup label="Image Name" hint="Required" required>
      <UInput placeholder="Image name" v-model="name" />
    </UInputGroup>
    <div class="flex gap-x-4 justify-self-end">
      <UButton @click="saveImage()" label="Add to gallery" :disabled="!base64Img" size="lg" class="transition-colors duration-200" />
      <UButton @click="cancel()" label="Cancel" size="lg" class="transition-colors duration-200" />
    </div>

    <!-- <UInputGroup label="Upload an image" hint="Required" required>
      <UButton @click="upload()" label="Upload" icon="i-heroicons-cloud-arrow-down" size="xl" />
      <input type="file" ref="fileInputEl" class="hidden" @change="handleFileUpload" />
    </UInputGroup>

    <div v-if="selectedFile" class="flex items-center justify-center flex-col gap-y-4">
      <NuxtImg v-if="base64Img" width="240px" height="240px" class="object-contain w-full h-60" :src="base64Img" :format="selectedFile.type.split('/')[1]" />
      <UButton @click="saveImage()" color="green" variant="outline" label="Add to gallery" icon="i-heroicons-plus-20-solid" size="lg" class="transition-colors duration-200" />
    </div> -->
  </div>
</template>
