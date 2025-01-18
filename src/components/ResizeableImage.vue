<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Sizes } from '@/interfaces/Sizes.ts'

const props = defineProps<{ imageSrc: string }>()
const imageElem = ref<HTMLImageElement | null>(null)

const DPI = 108
const inchCm = 2.54

const totalScreenWidth = window.screen.width
const totalScreenHeight = window.screen.height

console.log(totalScreenWidth, totalScreenHeight)

const sizes = reactive<Sizes>({
  width: 0,
  height: 0,
})

const assignSizes = () => {
  const widthPx = imageElem.value?.width
  const heightPx = imageElem.value?.height

  sizes.width = +(((widthPx as number) / DPI) * inchCm).toFixed(2)
  sizes.height = +(((heightPx as number) / DPI) * inchCm).toFixed(2)
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
            class="image-object"
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


.image-object{
  width: 100%;
  height: 100%;
  object-fit: fill;
}

</style>
