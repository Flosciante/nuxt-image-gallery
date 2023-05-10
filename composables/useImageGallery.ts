import { useMoviesStore } from '../stores/movies'

export const useImageGallery = () => {
  const config = useRuntimeConfig()
  const moviesStore = useMoviesStore()
  const route = useRoute()

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

  const currentIndex = () => {
    const currentMovie = moviesStore.movies.filter((movie: any) => movie.id == route.params.slug)
    return moviesStore.movies.indexOf(currentMovie[0])
  }

  const isFirstMovie = () => moviesStore.movies[0].id == route.params.slug

  const isLastMovie = () => moviesStore.movies[moviesStore.movies.length - 1].id == route.params.slug

  return {
    fetchList,
    currentIndex,
    isFirstMovie,
    isLastMovie
  }
}
