export default defineNuxtPlugin((ctx: any) => {
  const images = ref()
  const router = useRouter()

  const uploadFile = async (files: any, filter: boolean = false) => {
    const formData = new FormData();

    formData.append('files', files[0])

    await $fetch('/api/files/upload', {
      method: 'POST',
      body: formData
    })

    await getFiles()

    if (filter) {
      router.push('/')
    }
  }

  async function deleteFile(key: string) {

    await $fetch(`/api/files/${key}`, {
      method: 'DELETE'
    })

    await getFiles()
  }

  const getFiles = async () => {
    const { data: files } = await useFetch('/api/files')

    images.value = files.value as any
  }

  return {
    provide: {
      file: {
        uploadFile,
        deleteFile,
        getFiles,
        images,
      }
    }
  }
})
