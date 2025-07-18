import type { FilePlugin } from '../../types'

export default defineNuxtPlugin(() => {
  const images = ref()
  const router = useRouter()
  const toast = useToast()
  // https://hub.nuxt.com/docs/storage/blob#useupload
  const upload = useUpload('/api/images/upload', { multiple: false })

  async function getImages () {
    const file = await $fetch('/api/images')

    images.value = file
  }

  async function uploadImage (image: File, filter: boolean = false) {
    await upload(image).catch(err => toast.add({
      color: 'red',
      title: 'Failed to upload image',
      description: err.data?.message || err.message
    }))

    getImages()

    if (filter) {
      router.push('/')
    }
  }

  async function deleteImage (pathname: string) {
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
      } as FilePlugin
    }
  }
})
