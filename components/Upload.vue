<script setup lang="ts">
const fileInputEl: Ref<HTMLElement | undefined> = ref()
const selectedFile = ref()
const name = ref('')

const upload = () => {
  fileInputEl.value?.click()
}

const handleFileUpload = (event: any) => {
  selectedFile.value = event.target.files[0];
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
    <div v-if="selectedFile" class="flex items-center justify-center">
      <NuxtImg class="w-full h-40" :src="selectedFile" :format="selectedFile.type.split('/')[1]" />
    </div>

  </div>
</template>
