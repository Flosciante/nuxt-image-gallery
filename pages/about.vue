<template>
  <div class="flex w-full">
    <h1 class="title text-lg">
      TEST TRANSITION
    </h1>
  </div>
</template>

<style scoped>

.title {
  view-transition-name: header;
}
</style>

<style>
@keyframes slide-from-right {
  from { transform: translateX(100px); }
}

::view-transition-old(header),
::view-transition-new(header) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
    300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}
</style>
