export default eventHandler(async (event) => {
  const body = await readBody(event) || {}
  const session = await getUserSession(event)

  if (session.lastAttemptAt && Date.now() - session.lastAttemptAt < 5000) {
    throw createError({ statusCode: 429 , message: 'Too Many Requests' })
  }

  if (body.password === process.env.NUXT_ADMIN_PASSWORD) {
    await setUserSession(event, {
      user: { username: 'anonymous' }
    })

    return { loggedIn: true }
  }

  await setUserSession(event, { lastAttemptAt: Date.now() })

  throw createError({ statusCode: 401 , message: 'Unauthorized' })
})
