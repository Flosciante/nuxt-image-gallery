declare module '#auth-utils' {
  interface User {
    role: 'admin'
  }

  interface UserSession {
    lastAttemptAt?: number
  }
}

export {}
