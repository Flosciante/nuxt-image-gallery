import { defineStore } from "pinia"
import type { Image } from 'types'

export const useImagesStore = defineStore('images', () => {
  const images = ref<Array<Image>>([])

  return {
    images
  }
})
