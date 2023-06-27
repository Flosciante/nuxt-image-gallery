<script setup lang="ts">
const { fetch: refreshSession } = useUserSession()
const password = ref()

const emit = defineEmits(['closeLogin', 'openLogin'])

async function login () {
  await $fetch('/api/auth', {
    method: 'POST',
    body: { password: password.value }
  })

  await refreshSession()

  emit('closeLogin')
}
</script>

<template>
  <form class="flex flex-col gap-y-4 p-4 items-center" @submit.prevent="login">
    <h1 class="text-lg">Login to upload images</h1>
    <UInput type="password" placeholder="Enter password" icon="i-heroicons-key" class="!w-60" />

    <UButton type="submit" label="Login" color="green" variant="outline" class="px-4" size="lg" />
  </form>
</template>
