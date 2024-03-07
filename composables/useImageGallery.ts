export function useImageGallery() {
  const config = useRuntimeConfig()
  const imageToDownload = ref()

  const applyFilters = async (imageContainer: HTMLElement | undefined, poster: CanvasImageSource | null, contrast: number, blur: number, invert: number, saturate: number, hueRotate: number, sepia: number, rounded: number, filter: boolean = false) => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d')

    canvas.width = imageContainer!.getBoundingClientRect().width
    // if filter panel we must restore orignal height
    canvas.height = filter ? (imageContainer!.getBoundingClientRect().height * 100) / 80 : imageContainer!.getBoundingClientRect().height

    context!.filter = `contrast(${contrast}%) blur(${blur}px) invert(${invert}%)
      saturate(${saturate}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%) border-radius(${rounded}px)`

    context!.drawImage(poster!, 0, 0, canvas.width, canvas.height)

    const modifiedImage = new Image()

    modifiedImage.src = canvas.toDataURL('image/png')
    imageToDownload.value = modifiedImage

    return imageToDownload
  }

  const downloadImage = async (filename: string, imageContainer: HTMLElement | undefined, poster: CanvasImageSource, contrast: number, blur: number, invert: number, saturate: number, hueRotate: number, sepia: number, rounded: number) => {
    await applyFilters(imageContainer, poster, contrast, blur, invert, saturate, hueRotate, sepia, rounded)

    await useFetch(imageToDownload.value.src, {
      baseURL: `${config.public.imageApi}/ipx/_/tmdb/`,
    }).then((response: any) => {
      const blob: any = response.data.value
      const url: string = URL.createObjectURL(blob)
      const link: HTMLAnchorElement = document.createElement('a')

      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.click()
    })
  }

  const convertBase64ToFile = async (image: any, originalImage: any) => {
    const url = image.value.currentSrc

    const response = await fetch(url)

    const blob = await response.blob()

    const convertedFile = new File([blob], originalImage.split('.')[1], { type: `image/${originalImage.split('.')[1]}` })

    return convertedFile
  }

  const magnifierImage = (e: any, containerEl: any, imageEl: HTMLElement, magnifierEl: HTMLElement, zoomFactor: number = 2) => {
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
  }

  return {
    downloadImage,
    applyFilters,
    convertBase64ToFile,
    magnifierImage,
  }
}
