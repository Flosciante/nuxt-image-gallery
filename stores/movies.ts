import { defineStore } from "pinia"

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref([])
  const scrollPosition = ref(0)

  return {
    movies,
    scrollPosition
  }
})
