import type { FilePlugin } from '../../types'

export function useFile() {
  const { $file } = useNuxtApp()
  return $file as FilePlugin
}
