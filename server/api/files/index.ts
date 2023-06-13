export default eventHandler(async (event) => {
  const options = {}
  const files = await useFiles().list(options)

  // https://developers.cloudflare.com/r2/api/workers/workers-api-reference/?_ga=2.164780601.747342894.1686312990-688670250.1684857154#r2listoptions
  while (files.truncated) {
    const moreFiles = await useFiles().list({
      ...options,
      cursor: files.cursor
    })
    files.objects.push(...moreFiles.objects)
    files.truncated = moreFiles.truncated
    files.cursor = moreFiles.cursor
  }

  return files.objects.map(file => ({
    ...file,
    url: '/_files/default/' + file.key,
  }))
})