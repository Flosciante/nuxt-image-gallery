export default defineNuxtPlugin(() => {
  const images = ref()
  const router = useRouter()

  const getImages = async () => {
    const { data: files } = await useFetch('/api/images')

    images.value = files.value as any
  }

  async function uploadImage(image: File, filter: boolean = false) {
    const formData = new FormData()
    formData.append('image', image)

    await $fetch('/api/images/upload', {
      method: 'POST',
      body: formData,
    }).catch(err => alert(`Failed to upload image:\n${err.data?.message}`))

    getImages()

    if (filter)
      router.push('/')
  }

  async function deleteImage(pathname: string) {
    await $fetch(`/api/images/${pathname}`, { method: 'DELETE' })
    // await refresh()
    getImages()
  }

  // const uploadFile = async (files: any, filter: boolean = false) => {
  //   const formData = new FormData()

  //   formData.append('files', files[0])

  //   await $fetch('/api/files/upload', {
  //     method: 'POST',
  //     body: formData,
  //   })

  //   await getFiles()

  //   if (filter)
  //     router.push('/')
  // }

  // async function deleteFile(key: string) {
  //   await $fetch(`/api/files/${key}`, {
  //     method: 'DELETE',
  //   })

  //   await getFiles()
  // }

  return {
    provide: {
      file: {
        // uploadFile,
        // deleteFile,
        getImages,
        images,
        uploadImage,
        deleteImage,
      },
    },
  }
})
