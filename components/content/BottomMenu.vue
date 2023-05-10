<template>
  <div ref="menu" :class="$route.path === '/' ? 'bottom-8' : 'bottom-24'" class="inset-x-0 mx-auto fixed w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[60px] z-[9999] bg-zinc-900/95 rounded-full after:rounded-full border border-1 border-white/30">
    <div class="flex justify-between items-center pl-6 pr-3 h-full z-50">
      <slot name="logo" />
      <div class="text-white text-sm text-center px-2">
        <slot name="description" />
      </div>

      <slot name="buttons" />
    </div>
  </div>
</template>
