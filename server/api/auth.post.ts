export default eventHandler(async (event) => {
  const body = await readBody(event) || {}
  const session = await getUserSession(event)

  if (!process.env.NUXT_ADMIN_PASSWORD)
    throw createError({ statusCode: 500, statusMessage: 'NUXT_ADMIN_PASSWORD env variable not found' })

  if (session.lastAttemptAt && Date.now() - session.lastAttemptAt < 5000)
    throw createError({ statusCode: 429, statusMessage: 'Too Many Requests' })

  if (body.password === process.env.NUXT_ADMIN_PASSWORD) {
    await setUserSession(event, {
      user: { username: 'anonymous' },
    })

    return { loggedIn: true }
  }

  await setUserSession(event, { lastAttemptAt: Date.now() })

  throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
})
