import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { idImage } = query || {}

  console.log('idImage', idImage)

  return useDb()
    .select()
    .from(tables.images)
    .where(eq(tables.images.id, idImage))
    .get()
})
