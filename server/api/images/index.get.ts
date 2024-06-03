export default eventHandler(async () => {
  const { blobs } = await hubBlob().list({
    limit: 1000
  })

  return blobs
})
