<script setup lang="ts">
const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  secondary: {
    type: Number,
    default: 0,
  },
  modelValue: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const scrubber = ref()
const scrubbing = ref(false)
const pendingValue = ref(0)
const value = useVModel(props, 'modelValue', emit)
const { elementX, elementWidth } = useMouseInElement(scrubber)

useEventListener('mouseup', () => (scrubbing.value = false))

watch([scrubbing, elementX], () => {
  const progress = Math.max(0, Math.min(1, elementX.value / elementWidth.value))

  pendingValue.value = progress * props.max

  if (scrubbing.value) {
    value.value = pendingValue.value
  }
})
</script>

<template>
  <div class="flex gap-x-4 justify-between items-center relative">
    <span class="text-white w-40">
      {{ title }}
    </span>

    <div ref="scrubber" class="w-full relative z-9990 h-4 rounded-sm cursor-pointer select-none bg-gray-600" @mousedown="scrubbing = true">
      <div class="relative w-full h-4 overflow-hidden">
        <div class="absolute w-full h-4 opacity-30 left-0 top-0 rounded-sm bg-gray-900" :style="{ transform: `translateX(${(secondary / max) * 100 - 100}%)` }" />
        <div class="relative w-full h-4 rounded-sm bg-gray-300" :style="{ transform: `translateX(${(value / max) * 100 - 100}%)` }" />
      </div>
      <div class="absolute opacity-0 inset-0 hover:opacity-100 h-4">
        <slot :pending-value="pendingValue" :position="`${Math.max(0, Math.min(elementX, elementWidth - 100))}px`" />
      </div>
    </div>
    <span class="text-medium text-white w-12"> {{ Math.round(modelValue) }} </span>
  </div>
</template>
