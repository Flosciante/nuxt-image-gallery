<script setup lang="ts">
const { fetch: refreshSession } = useUserSession()
const password = ref('')

const emit = defineEmits(['closeLogin'])
const toast = useToast()

async function login () {
  await $fetch('/api/auth', {
    method: 'POST',
    body: { password: password.value }
  })
  .then(async () => {
    await refreshSession()
    emit('closeLogin')
  })
  .catch(() => {
    toast.add({
      title: 'Wrong password',
      description: 'Please try again',
      color: 'red'
    })
  })
}
</script>

<template>
  <form class="flex flex-col gap-y-4 p-4 items-center" @submit.prevent="login">
    <h1 class="text-lg">Login to upload images</h1>
    <UInput type="password" v-model="password" placeholder="Enter password" icon="i-heroicons-key" class="!w-60" />

    <UButton type="submit" label="Login" color="green" variant="outline" class="px-4" size="lg" />
  </form>
</template>
