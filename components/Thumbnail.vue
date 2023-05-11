<script setup lang="ts">
defineProps({
  thumbnail: {
    type: Object,
    default: null
  },
})

</script>

<template>
  <li class="text-black inline-block test">
    <NuxtLink :to="`/detail/${thumbnail.id}`">
        <NuxtImg
          v-if="thumbnail.poster_path"
          width="100"
          height="60"
          format="webp"
          :src="`/tmdb${thumbnail.poster_path}`"
          :alt="thumbnail.title || thumbnail.name"
          class="object-cover bg-black/20 hover:bg-black/0 rounded-xs rounded-sm transition-all duration-500"
          :class="thumbnail.id == $router.currentRoute.value.params.slug ? 'active scale-100 mx-4' : 'scale-75 opacity-75 mx-2'"
        />
      </NuxtLink>
  </li>
</template>
