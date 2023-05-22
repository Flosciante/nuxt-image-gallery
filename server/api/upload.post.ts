import { useImagesStore } from '../../stores/images'

export default defineEventHandler(async (event) => {
  const imagesStore = useImagesStore()
  const session = await requireUserSession(event)
  const body = await readBody(event)
  const { name, base64 } = body || {}

  const image = await useDb()
    .insert(tables.images)
    .values({
      name: name,
      base64: base64
    })
    .onConflictDoUpdate({
      target: tables.images.id,
      set: { name, base64 }
    })
    .returning()
    .get()

  return image
})
