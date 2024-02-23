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

const value = useVModel(props, 'modelValue', emit)

</script>

<template>
  <div class="flex justify-between items-center relative">
    <span class="text-gray-400 w-40">
      {{ title }}
    </span>

    <URange :min="min" :max="max" v-model="value" color="gray" />

    <span class="text-center text-medium text-white w-16 px-2"> {{ Math.round(modelValue) }} </span>
  </div>
</template>
