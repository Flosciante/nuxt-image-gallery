<script setup lang="ts">

const { loggedIn } = useUserSession()

const fileInputEl: Ref<HTMLElement | undefined> = ref()
const selectedFile = ref()
const name = ref('')
const base64Img = ref()

const upload = () => {
  fileInputEl.value?.click()
}

const handleFileUpload = (event: any) => {
  selectedFile.value = event.target.files[0];

  convertToBase64(selectedFile.value)
}

const convertToBase64 = (selectedFile: any) => {
  const reader = new FileReader();

  reader.onload = () => {
    base64Img.value = reader.result
  }

  reader.readAsDataURL(selectedFile)
}

const saveImage = (image: any) => {
  if (!loggedIn.value) {
    return alert('You need to login to add your image!')
  }
  $fetch('/api/upload', {
    method: 'POST',
    body: { image }
  })
}

</script>


<template>
  <div class="p-8 bg-gray-900/70 backdrop-blur flex flex-col gap-y-4">
    <UInputGroup label="Image Name" hint="Required" required>
      <UInput placeholder="name" />
    </UInputGroup>
    <UInputGroup label="Upload an image" hint="Required" required>
      <UButton @click="upload()" label="Upload" icon="i-heroicons-cloud-arrow-down" size="xl" />
      <input type="file" ref="fileInputEl" class="hidden" @change="handleFileUpload" />
    </UInputGroup>
    <div v-if="selectedFile" class="flex items-center justify-center flex-col gap-y-4 ">
      <NuxtImg v-if="base64Img" class=" h-40" :src="base64Img" :format="selectedFile.type.split('/')[1]" />
      <UButton @click="saveImage({ name: 'test', base64: base64Img })" color="green" variant="outline" label="Add to gallery" icon="i-heroicons-plus-20-solid" size="lg" class="transition-colors duration-200" />
    </div>

  </div>
</template>
