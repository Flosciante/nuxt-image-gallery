<script setup lang="ts">

const { loggedIn, user, session, clear } = useUserSession()

</script>

<template>
  <div v-if="loggedIn">
    <h1>Welcome {{ user.login }}!</h1>
    <p>Logged in since {{ session.loggedInAt }}</p>
    <button @click="clear">Logout</button>
  </div>
  <div v-else>
    <h1>Not logged in</h1>
    <a href="/api/auth/">Login</a>
  </div>
</template>
