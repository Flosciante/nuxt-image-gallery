export default defineEventHandler((event) => {

  return useDB()
    .select()
    .from(tables.images)
    .all()
})
