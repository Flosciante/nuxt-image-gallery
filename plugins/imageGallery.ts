import { useMoviesStore } from '../stores/movies'

export default defineNuxtPlugin((ctx: any) => {
    const config = useRuntimeConfig()
    const moviesStore = useMoviesStore()

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
      const currentMovie = moviesStore.movies.filter((movie: any) => movie.id == ctx.$router.currentRoute.value.params.slug)

      return moviesStore.movies.indexOf(currentMovie[0])
    }

  return {
    provide: {
      imageGallery: {
        fetchList,
        currentIndex,
      }
    }
  }
})
