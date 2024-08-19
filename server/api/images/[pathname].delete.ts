export default eventHandler(async (event) => {
  await requireUserSession(event)
  const { pathname } = event.context.params || {}

  return hubBlob().del(pathname)
})
