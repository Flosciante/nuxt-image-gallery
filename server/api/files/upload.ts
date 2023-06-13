import { randomUUID } from 'uncrypto'

export default eventHandler(async (event) => {
  let files = (await readMultipartFormData(event) || [])


  // Filter only files
  files = files.filter((file) => Boolean(file.filename))
  if (!files) {
    throw createError({ statusCode: 400, message: 'Missing files' })
  }
  const urls = []
  for (const file of files) {
    const extension = file.filename!.split(".").pop()
    const filename = `${randomUUID()}${extension ? `.${extension}` : ''}`
    await useFiles().put(filename, file.data)
    urls.push(`/_files/default/${filename}`)
  }

  return urls
})
