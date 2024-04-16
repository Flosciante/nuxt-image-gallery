export default defineNuxtPlugin(() => {
  const images = ref()
  const router = useRouter()
  const toast = useToast()

  const getImages = async () => {
    const { data: files } = await useFetch('/api/images')

    images.value = files.value
  }

  async function uploadImage(image: File, filter: boolean = false) {
    const formData = new FormData()
    formData.append('image', image)

    await $fetch('/api/images/upload', {
      method: 'POST',
      body: formData
    }).catch(err => toast.add({
      color: 'red',
      title: 'Failed to upload image',
      description: err.data?.message || err.message
    }))

    getImages()

    if (filter)
      router.push('/')
  }

  async function deleteImage(pathname: string) {
    await $fetch(`/api/images/${pathname}`, { method: 'DELETE' })

    getImages()
  }

  return {
    provide: {
      file: {
        getImages,
        images,
        uploadImage,
        deleteImage
      }
    }
  }
})
