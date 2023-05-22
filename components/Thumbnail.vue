<script setup lang="ts">
defineProps({
  thumbnail: {
    type: Object,
    default: null
  },
})

</script>

<template>
  <li class="text-black inline-block relative" :class="{ 'z-50': thumbnail.id == $router.currentRoute.value.params.slug }">
    <NuxtLink :to="`/detail/${thumbnail.id}`">
        <NuxtImg
          v-if="thumbnail.base64"
          width="100"
          height="60"
          format="webp"
          :src="thumbnail.base64"
          :alt="thumbnail.name"
          class="object-cover rounded-xs rounded-sm transition-all duration-500 hover:brightness-100 w-[100px] h-[60px]"
          :class="thumbnail.id == $router.currentRoute.value.params.slug ? 'active scale-100 mx-4 brightness-100' : 'scale-75 opacity-75 mx-2 brightness-50'"
        />
      </NuxtLink>
  </li>
</template>
