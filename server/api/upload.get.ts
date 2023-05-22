export default defineEventHandler((event) => {

  return useDb()
    .select()
    .from(tables.images)
    .all()
})
