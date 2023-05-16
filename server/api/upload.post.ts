export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await readBody(event)
  const { image } = body || {}

  // if (!['coffee', 'tea'].includes(choice)) {
  //   return createError({
  //     statusCode: 400,
  //     message: 'Bad choice, choose between coffee or tea'
  //   })
  // }

  // const vote = await useDb()
  //   .insert(tables.votes)
  //   .values({
  //     userId: session.user.id,
  //     username: session.user.login,
  //     choice
  //   })
  //   .onConflictDoUpdate({
  //     target: tables.votes.userId,
  //     set: { choice }
  //   })
  //   .returning()
  //   .get()

  return vote
})
