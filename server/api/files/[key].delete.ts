export default eventHandler(async (event) => {
  const key = getRouterParam(event, 'key')

  if (!key) {
    throw createError({ statusCode: 400, message: 'Missing key' })
  }
  const bucket = useFiles()
  await bucket.delete(key)

  return { success: true }
})