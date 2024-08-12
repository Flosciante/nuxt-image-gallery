<script setup lang="ts">
const emit = defineEmits(['close'])
const { fetch: refreshSession } = useUserSession()
const password = ref('')
const loading = ref(false)

const toast = useToast()

async function login() {
  if (loading.value || !password.value) return
  loading.value = true
  await $fetch('/api/auth', {
    method: 'POST',
    body: { password: password.value }
  })
    .then(async () => {
      await refreshSession()
      emit('close')
    })
    .catch((err) => {
      toast.add({
        title: `Error ${err.statusCode}`,
        description: `${err.data?.message || err.message}. Please try again`,
        color: 'red'
      })
    })
  loading.value = false
}
</script>

<template>
  <form
    class="flex flex-col gap-y-4 p-4 items-center"
    @submit.prevent="login"
  >
    <h1 class="text-lg text-gray-300">
      Login to upload images
    </h1>
    <UInput
      v-model="password"
      type="password"
      placeholder="Enter password"
      icon="i-heroicons-key"
      class="!w-60"
    />

    <UButton
      :loading="loading"
      type="submit"
      label="Login"
      color="green"
      variant="ghost"
      class="px-4"
      size="lg"
      :disabled="!password"
    />

    <UButton
      icon="i-heroicons-x-mark"
      color="gray"
      variant="ghost"
      size="xs"
      class="absolute right-2 top-2"
      @click="$emit('close')"
    />
  </form>
</template>
