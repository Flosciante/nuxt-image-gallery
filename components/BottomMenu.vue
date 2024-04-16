<script setup lang="ts">
defineProps({
  filter: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
</script>

<template>
  <div
    :class="[route.path === '/' ? 'bottom-8' : 'bottom-16', filter ? 'h-auto rounded-md p-8' : 'h-[60px]']"
    class="justify-center flex flex-col inset-x-0 mx-auto fixed w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] 2xl:w-[30%] z-[9999] bg-gray-900 rounded-full after:rounded-full border border-1 border-white/30"
  >
    <slot name="filter" />
    <div
      class="flex justify-between items-center h-full z-50"
      :class="filter ? 'pt-6' : 'pl-6 pr-3'"
    >
      <slot name="logo" />
      <div
        class="text-white text-sm text-center"
        :class="{ 'px-2': !filter }"
      >
        <slot name="description" />
      </div>

      <slot name="buttons" />
    </div>
  </div>
</template>
