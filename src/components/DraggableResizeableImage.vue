<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { Sizes } from '@/interfaces/Sizes.ts'
import { useScreenConfigStore } from '@/stores/useScreenConfig.ts'

const props = defineProps<{ imageSrc: string }>()
const imageElem = ref<HTMLImageElement | null>(null)

const { getDpi } = useScreenConfigStore()
const dpi = getDpi()
const inchCm = 2.54

const pixelSizes = reactive({
  width: 500,
  height: 500,
})

const cmSizes = reactive<Sizes>({
  width: 0,
  height: 0,
})

const assignSizes = () => {
  const widthPx = imageElem.value?.width
  const heightPx = imageElem.value?.height

  cmSizes.width = +(((widthPx as number) / dpi) * inchCm).toFixed(1)
  cmSizes.height = +(((heightPx as number) / dpi) * inchCm).toFixed(1)
}

const handleImageOnLoad = () => {
  if (imageElem.value) {
    assignSizes()
  }
}

watch(
  () => cmSizes,
  () => {
    pixelSizes.width = Math.round((cmSizes.width / inchCm) * dpi)
    pixelSizes.height = Math.round((cmSizes.height / inchCm) * dpi)
  },
  { deep: true },
)
</script>

<template>
  <div class="image-container">
    <div class="image-sizes">
      <span>
        Ширина
        <el-input v-model="cmSizes.width" style="width: 80px" :placeholder="cmSizes.width" />
        cм
      </span>
      <span>
        Высота
        <el-input v-model="cmSizes.height" style="width: 80px" :placeholder="cmSizes.height" />
        см
      </span>
    </div>
    <vue-draggable-resizable
      :x="400"
      :y="70"
      :w="pixelSizes.width"
      :h="pixelSizes.height"
      @resize="assignSizes"
    >
      <div class="image-wrapper" ref="imageWrapper">
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

.target-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
