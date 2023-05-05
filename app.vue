<script setup lang="ts">
const route = useRoute()
const isHome = ref(false)

watch(route, () => { 
  const thumbnails: any = document.getElementById('thumbnails')
  thumbnails.style.opacity = route.path === '/' ? 0 : 1
})
</script>

<template>
  <div class="bg-black min-h-[100dvh] overflow-x-auto relative">
    <NuxtPage />
    <ThumbnailList id="thumbnails" />
  </div>
</template>
