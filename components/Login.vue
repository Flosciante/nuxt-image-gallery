<script setup lang="ts">

const { loggedIn, user, session, clear } = useUserSession()
const password = ref()

const emit = defineEmits(['closeModal'])

const login = () => {
  $fetch('/api/auth', {
    method: 'POST',
    body: { password: password.value }})
    .then(() => {
      emit('closeModal')
    })
}

</script>

<template>
  <div v-if="loggedIn">
    <h1>Welcome {{ user.login }}!</h1>
    <p>Logged in since {{ session.loggedInAt }}</p>
    <button @click="clear">Logout</button>
  </div>
  <div v-else class="flex flex-col gap-y-4">
    <h1>Not logged in</h1>
    <UInput v-model="password" placeholder="Enter password"/>
    <UButton label="Login" @click="login" />
  </div>
</template>
