export default defineNuxtPlugin((ctx: any) => {
  const visibleModal = ref(false)
  const idImage: Ref<number> = ref(0)

  const openModal = (imageId: number) => {
    visibleModal.value = true
    idImage.value = imageId
  }
  const closeModal = () => (visibleModal.value = false)

  if (process.client) {
    watch(
      visibleModal,
      (isVisible) => {
        const html = document.documentElement

        if (isVisible) {
          html.style.overflow = 'hidden'
        } else {
          html.style.overflow = ''
        }
      },
      {
        immediate: true
      }
    )
  }

  return {
    provide: {
      modal: {
        visibleModal,
        closeModal,
        openModal,
        idImage
      }
    }
  }
})
