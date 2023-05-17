export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody(event)
  const { name, base64 } = body || {}

  console.log('session', session)

  // if (!['coffee', 'tea'].includes(choice)) {
  //   return createError({
  //     statusCode: 400,
  //     message: 'Bad choice, choose between coffee or tea'
  //   })
  // }

  const image = await useDb()
    .insert(tables.images)
    .values({
      name: name,
      base64: base64
    })
    .onConflictDoUpdate({
      target: tables.images.id,
      set: { name, base64 }
    })
    .returning()
    .get()

  return image
})
