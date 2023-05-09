<script setup lang="ts">

const menu = ref<HTMLElement>()
const { width, height } = useWindowSize()
const route = useRoute()

const state = reactive({
  isDragging: false,
  startX: 0,
  startY: 0,
  left: 0,
  top: 0
});

const left = ref<number>(0)
const top = ref<number>(0)

onMounted(() => { 
  left.value = (width.value / 2) - (menu.value?.getBoundingClientRect().width / 2)
  top.value = height.value - (route.path === '/' ? 100 : 200)
})

const onMouseDown = (event: any) => {
  state.isDragging = true;
  state.startX = event.clientX - left.value;
  state.startY = event.clientY - top.value;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

const onMouseMove = (event: any) => {
  if (state.isDragging) {
    left.value = event.clientX - state.startX;
    top.value = event.clientY - state.startY;
  }
}

const onMouseUp = () => {
  state.isDragging = false;

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
}

</script>

<template>
  <div ref="menu" @mousedown="onMouseDown" :style="`left: ${left}px; top: ${top}px`" class="mx-auto fixed w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] h-[60px] z-[9999] bg-zinc-900/95 rounded-full after:rounded-full border border-1 border-white/30">
    <div class="flex justify-between items-center pl-6 pr-3 h-full z-50">
      <slot name="logo" />
      <div class="text-white text-sm text-center px-2">
        <slot name="description" />
      </div>

      <slot name="buttons" />
    </div>
  </div>
</template>
