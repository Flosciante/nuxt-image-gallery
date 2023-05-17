<script setup lang="ts">

const { page } = useContent()

</script>

<template>
  <div>
    <ContentRenderer :value="page" class="overflow-hidden p-8" />
  </div>
</template>
