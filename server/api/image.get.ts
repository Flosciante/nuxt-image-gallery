import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { idImage } = query || {}

  return useDB()
    .select()
    .from(tables.images)
    .where(eq(tables.images.id, idImage))
    .get()
})
