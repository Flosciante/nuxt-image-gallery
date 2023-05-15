import { useMoviesStore } from '../stores/movies'
import type { UseSwipeDirection } from '@vueuse/core'

export const useImageGallery = () => {
  const config = useRuntimeConfig()
  const moviesStore = useMoviesStore()
  const route = useRoute()
  const router = useRouter()

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

  return {
    fetchList,
    currentIndex,
    isFirstMovie,
    isLastMovie,
    initSwipe
  }
}
