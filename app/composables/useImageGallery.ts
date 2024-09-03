import type { UseSwipeDirection } from '@vueuse/core'
import type { BlobObject } from '@nuxthub/core'
import type { FilePlugin } from '../../types'

export function useImageGallery() {
  const nuxtApp = useNuxtApp()
  const config = useRuntimeConfig()
  const imageToDownload = ref<HTMLImageElement>()
  const router = useRouter()
  const route = useRoute()

  const file = nuxtApp.$file as FilePlugin

  const currentIndex: ComputedRef<number> = computed(() => file.images.value!.findIndex((image: BlobObject) => image.pathname.split('.')[0] === route.params.slug![0]))
  const isFirstImg: ComputedRef<boolean> = computed(() => file.images.value?.[0]?.pathname.split('.')[0] === route.params.slug![0] || false)
  const isLastImg: ComputedRef<boolean> = computed(() => file.images.value?.[file.images.value.length - 1]?.pathname.split('.')[0] === route.params.slug![0] || false)

  const initSwipe = (el: Ref<HTMLImageElement | undefined>) => {
    useSwipe(el, {
      passive: false,

      onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
        if (direction === 'left') {
          if (isLastImg.value)
            router.push('/')
          else
            router.push(`/detail/${file.images.value![currentIndex.value + 1]?.pathname.split('.')[0]}`)
        }
        else {
          if (isFirstImg.value)
            router.push('/')
          else
            router.push(`/detail/${file.images.value![currentIndex.value - 1]?.pathname.split('.')[0]}`)
        }
      }
    })
  }

  const applyFilters = async (poster: HTMLImageElement, contrast: number, blur: number, invert: number, saturate: number, hueRotate: number, sepia: number) => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')

    canvas.width = poster?.naturalWidth
    canvas.height = poster?.naturalHeight

    context!.filter = `contrast(${contrast}%) blur(${blur}px) invert(${invert}%)
      saturate(${saturate}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%)`

    context!.drawImage(poster!, 0, 0, canvas.width, canvas.height)

    const modifiedImage = new Image()

    modifiedImage.src = canvas.toDataURL('image/png')
    imageToDownload.value = modifiedImage

    return imageToDownload as Ref<HTMLImageElement>
  }

  const downloadImage = async (filename: string, poster: HTMLImageElement, contrast: number, blur: number, invert: number, saturate: number, hueRotate: number, sepia: number) => {
    await applyFilters(poster, contrast, blur, invert, saturate, hueRotate, sepia)

    if (!imageToDownload.value) {
      return
    }

    await useFetch(imageToDownload.value.src, {
      baseURL: `${config.public.imageApi}/ipx/_/tmdb/`
    }).then((response) => {
      const blob = response.data.value as Blob
      const url: string = URL.createObjectURL(blob)
      const link: HTMLAnchorElement = document.createElement('a')

      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.click()
    })
  }

  const convertBase64ToFile = async (image: Ref<HTMLImageElement>, originalImage: Ref<BlobObject>) => {
    const url = image.value.currentSrc

    const response = await fetch(url)
    const blob = await response.blob()

    const convertedFile = new File([blob], `${Math.random().toString().split('.')[1]}.${originalImage.value?.contentType?.split('/').pop()}`, { type: originalImage.value.contentType })

    return convertedFile as File
  }

  const magnifierImage = (e: MouseEvent, containerEl: HTMLElement, imageEl: HTMLImageElement, magnifierEl: HTMLElement, zoomFactor: number = 2) => {
    if (magnifierEl.style.filter !== imageEl.style.filter)
      magnifierEl.style.filter = imageEl.style.filter

    const imageRect = imageEl.getBoundingClientRect()
    const containerRect = containerEl.getBoundingClientRect()

    const x = e.pageX - containerRect.left
    const y = e.pageY - containerRect.top

    const imgWidth = imageRect.width
    const imgHeight = imageRect.height

    const zoomedWidth = imgWidth * (zoomFactor === 1 ? 1.5 : zoomFactor)
    const zoomedHeight = imgHeight * (zoomFactor === 1 ? 1.5 : zoomFactor)

    let xperc = (x / imgWidth) * 100
    let yperc = (y / imgHeight) * 100

    if (x > 0.01 * imgWidth)
      xperc += 0.15 * xperc

    if (y >= 0.01 * imgHeight)
      yperc += 0.15 * yperc

    magnifierEl.style.backgroundSize = `${zoomedWidth}px ${zoomedHeight}px`
    magnifierEl.style.backgroundPositionX = `${xperc - 9}%`
    magnifierEl.style.backgroundPositionY = `${yperc - 9}%`
    magnifierEl.style.left = `${x - 50}px`
    magnifierEl.style.top = `${y - 50}px`
    magnifierEl.style.zIndex = '9999'
  }

  return {
    downloadImage,
    applyFilters,
    convertBase64ToFile,
    magnifierImage,
    initSwipe,
    currentIndex,
    isFirstImg,
    isLastImg
  }
}
