import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, base64, imageId } = body || {}

  const image = imageId === undefined ? await useDB()
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
    .get() : await useDB()
      .update(tables.images)
      .set({
        name: name,
        base64: base64
      })
      .where(eq(tables.images.id, imageId))
      .returning()
      .get()



  return image
})
