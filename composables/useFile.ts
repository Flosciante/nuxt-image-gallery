export function useFile() {
  const { $file } = useNuxtApp()
  return $file
}
