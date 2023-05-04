<script setup lang="ts">
const props = defineProps({
  thumbnail: {
    type: Object,
    default: null
  },
  thumbnailsRef: {
    type: Object as PropType<HTMLElement>,
    default: null
  }
})

const thumbnailRef = ref<HTMLElement>()
const active = useState()
const { x, y } = useScroll(props.thumbnailsRef)
const { width } = useWindowSize()
const pos = ref()

const translatePlease = () => {
  console.log(thumbnailRef.value?.getBoundingClientRect().left)
  pos.value += 100
}

</script>

<template>
  <li class="backdrop-blur-sm text-black inline-block px-4" @click="translatePlease()" ref="thumbnailRef" :style="`transform: translateX(${pos}px)`">
    <NuxtLink :to="`/detail/${thumbnail.id}`" @click.native="active = thumbnail.id">
        <NuxtImg
          v-if="thumbnail.poster_path"
          width="100"
          height="60"
          format="webp"
          :src="`/tmdb${thumbnail.poster_path}`"
          :alt="thumbnail.title || thumbnail.name"
          class="object-cover bg-black/20 hover:bg-black/0 rounded-xs transition-colors duration-200 border-image"
          :class="{ active: active === thumbnail.id }"
        />
      </NuxtLink>
  </li>
</template>
