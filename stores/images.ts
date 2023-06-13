import { defineStore } from "pinia"
import type { Image } from 'types'

export const useImagesStore = defineStore('images', () => {
  const images = ref<Array<any>>([])

  return {
    images
  }
})
