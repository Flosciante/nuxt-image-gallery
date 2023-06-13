<script setup lang="ts">
const { fetch: refreshSession } = useUserSession()
const password = ref()

const emit = defineEmits(['closeModal'])

async function login () {
  await $fetch('/api/auth', {
    method: 'POST',
    body: { password: password.value }
  })
  await refreshSession()
  emit('closeModal')
}
</script>

<template>
  <form class="flex flex-col gap-y-4" @submit.prevent="login">
    <h1>Login to upload images</h1>
    <UInput v-model="password" type="password" placeholder="Enter password"/>
    <UButton type="submit" label="Login" />
  </form>
</template>
