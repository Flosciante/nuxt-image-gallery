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
          width="83"
          height="51"
          format="webp"
          :src="thumbnail.base64"
          :alt="thumbnail.name"
          class="object-cover rounded-md transition-all duration-500 hover:brightness-100 w-[83px] h-[51px]"
          :class="thumbnail.id == $router.currentRoute.value.params.slug ? 'active brightness-100' : 'opacity-75 brightness-50'"
        />
      </NuxtLink>
  </li>
</template>
