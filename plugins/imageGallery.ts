export default defineNuxtPlugin((ctx: any) => {
    const config = useRuntimeConfig()
    const movies = useState<any>('movies', () => [])
    const currentMovieId = ref()

    const fetchList = async () => {
      const { data } = await useFetch('/tmdb/tv/popular', {
        baseURL: config.public.imageApi,
        query: {
          page: 1,
          language: 'en',
        },
      })
      movies.value = data.value
    }

  return {
    provide: {
      imageGallery: {
        fetchList,
        movies,
        currentMovieId
      }
    }
  }
})
