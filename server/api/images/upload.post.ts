export default eventHandler(async (event) => {
  await requireUserSession(event)
  const form = await readFormData(event)
  const image = form.get('image') as File

  // @ts-expect-error: jpg format
  ensureBlob(image, { maxSize: '8MB', types: ['image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/webp', 'image/jpg'] })

  return hubBlob().put(image.name, image)
})
