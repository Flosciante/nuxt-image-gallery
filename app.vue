<script setup lang="ts">
useSeoMeta({
  title: 'NuxtHub Image Gallery Starter',
  description: 'A Nuxt template to build your full-stack image gallery application on the edge.',
})
</script>

<template>
  <div class="bg-black min-h-[100dvh] overflow-x-auto relative" :class="{ 'flex flex-col md:block': $router.currentRoute.value.fullPath !== '/' }">
    <NuxtPage />
  </div>
</template>
