import { useMoviesStore } from '../stores/movies'
import type { UseSwipeDirection } from '@vueuse/core'

export const useImageGallery = () => {
  const config = useRuntimeConfig()
  const moviesStore = useMoviesStore()
  const route = useRoute()
  const router = useRouter()
  const imageToDownload = ref()

  const fetchList = async () => {
    const { data } = await useFetch<any>('/tmdb/tv/popular', {
      baseURL: config.public.imageApi,
      query: {
        page: 1,
        language: 'en',
      },
    })

    moviesStore.movies = data.value.results
  }

  const currentIndex = computed(() => moviesStore.movies.indexOf(moviesStore.movies.filter((movie: any) => movie.id == route.params.slug)[0]))
  const isFirstMovie = computed(() => moviesStore.movies[0].id == route.params.slug[0])
  const isLastMovie = computed(() => moviesStore.movies[moviesStore.movies.length - 1].id == route.params.slug[0])

  const initSwipe = (el: Ref<HTMLElement | null>) => {
    useSwipe(el, {
      passive: false,

      onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
        if (direction === 'left') {
          if (isLastMovie.value) {
            router.push('/')
          } else {
            router.push(`/detail/${moviesStore.movies[currentIndex.value + 1].id}`)
          }
        } else {
          if (isFirstMovie.value) {
            router.push('/')
          } else {
            router.push(`/detail/${moviesStore.movies[currentIndex.value - 1].id}`)
          }
        }
      },
    })
  }


const applyFilters = async (imageContainer: HTMLElement | undefined, poster: CanvasImageSource | null, contrast: number, blur: number, invert: number, saturate: number, hueRotate: number, sepia: number) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  canvas.width = imageContainer!.getBoundingClientRect().width
  canvas.height = imageContainer!.getBoundingClientRect().height

  context!.filter = `contrast(${contrast}%) blur(${blur}px) invert(${invert}%)
    saturate(${saturate}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%)`

  context!.drawImage(poster!, 0, 0, canvas.width, canvas.height)

  const modifiedImage = new Image()
  modifiedImage.src = canvas.toDataURL('image/png')

  imageToDownload.value = modifiedImage
}

const downloadImage = async (filename: string, imageContainer: HTMLElement | undefined, poster: CanvasImageSource, contrast: number, blur: number, invert: number, saturate: number, hueRotate: number, sepia: number) => {

  await applyFilters(imageContainer, poster, contrast, blur, invert, saturate, hueRotate, sepia)

  await useFetch(imageToDownload.value.src, {
    baseURL: `${config.public.imageApi}/ipx/_/tmdb/`,
  }).then((response: any) => {
    const blob = response.data.value
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.click()
  })
}

  return {
    fetchList,
    currentIndex,
    isFirstMovie,
    isLastMovie,
    initSwipe,
    downloadImage
  }
}
