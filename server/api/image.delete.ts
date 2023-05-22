import { eq } from 'drizzle-orm'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const { idImage } = query || {}

  return useDb()
    .delete(tables.images)
    .where(eq(tables.images.id, idImage))
    .run()
})
