<script setup lang="ts">

const isSmallScreen = useMediaQuery('(max-width: 1024px)')

</script>

<template>
  <UButton variant="outline" color="white" class="border border-1 border-gray-500 border-dashed ring-transparent h-[100px] md:h-[200px] lg:h-[430px] transition-colors duration-200 rounded-md upload group w-full" :rounded="false">
    <div v-if="!isSmallScreen" class="w-full rounded-md flex items-center justify-center h-[430px]">
      <UIcon name="i-heroicons-arrow-up-tray" class="group-hover:hidden h-12 w-12 m-auto absolute" />
      <div class="relative opacity-0 group-hover:opacity-100 flex w-full h-full justify-center items-center transition-all duration-100">
        <UIcon name="i-heroicons-arrow-up-tray" class="absolute m-auto h-12 w-12 transition-all duration-100 group-hover:-translate-y-5" />
        <span class="absolute m-auto opacity-0 group-hover:opacity-100 group-hover:translate-y-5 transition-all duration-200 text-white">Click or Drag & drop to upload</span>
      </div>
    </div>
    <div v-else class="w-full rounded-md flex items-center justify-center h-[100px] md:h-[200px]">
      <div class="relative flex flex-col w-full h-full justify-center items-center">
        <UIcon name="i-heroicons-arrow-up-tray" class="w-12 h-12 text-white" />
        <span class="text-white">Press to upload</span>
      </div>
    </div>
  </UButton>
</template>
