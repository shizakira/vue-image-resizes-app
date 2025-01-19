<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Sizes } from '@/interfaces/Sizes.ts'
import { useScreenConfigStore } from '@/stores/useScreenConfig.ts'

const props = defineProps<{ imageSrc: string }>()
const imageElem = ref<HTMLImageElement | null>(null)

const { getDpi } = useScreenConfigStore()
const dpi = getDpi()
const inchCm = 2.54

const sizes = reactive<Sizes>({
  width: 0,
  height: 0,
})

const assignSizes = () => {
  const widthPx = imageElem.value?.width
  const heightPx = imageElem.value?.height

  sizes.width = +(((widthPx as number) / dpi) * inchCm).toFixed(1)
  sizes.height = +(((heightPx as number) / dpi) * inchCm).toFixed(1)
}

const handleImageOnLoad = () => {
  if (imageElem.value) {
    assignSizes()
  }
}
</script>

<template>
  <div class="image-container">
    <div class="image-sizes">
      <span>Ширина {{ sizes.width }} cм</span>
      <span>Высота {{ sizes.height }} см</span>
    </div>
      <vue-draggable-resizable  @resize="assignSizes">
        <div class="image-wrapper">
          <img
            ref="imageElem"
            @load="handleImageOnLoad"
            class="target-image"
            :src="props.imageSrc"
            alt="img"
          />
        </div>
      </vue-draggable-resizable>
  </div>
</template>

<style>

.image-sizes {
  display: flex;
  flex-direction: column;
}

.image-wrapper {
  width: 100%;
  height: 100%;
}

.target-image{
  width: 100%;
  height: 100%;
  object-fit: contain;
}

</style>
