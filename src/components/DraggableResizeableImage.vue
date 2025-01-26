<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue'
import type { Sizes } from '@/interfaces/Sizes.ts'
import { useScreenConfigStore } from '@/stores/useScreenConfig.ts'

const props = defineProps<{ imageSrc: string }>()
const imageElem = ref<HTMLImageElement | null>(null)

const { getDpi } = useScreenConfigStore()
const dpi = getDpi()
const inchCm = 2.54

const pixelSizes = reactive<Sizes>({
  width: 500,
  height: 500,
})

const cmSizes = reactive<Sizes>({
  width: 0,
  height: 0,
})

const resizeableImageComponentPositions = reactive({
  x: 0,
  y: 0,
})

const assignCmSizes = () => {
  pixelSizes.width = imageElem.value?.width as number
  pixelSizes.height = imageElem.value?.height as number

  cmSizes.width = +((pixelSizes.width / dpi) * inchCm).toFixed(1)
  cmSizes.height = +((pixelSizes.height / dpi) * inchCm).toFixed(1)
}

const assignPixelSizes = () => {
  pixelSizes.width = Math.round((cmSizes.width / inchCm) * dpi)
  pixelSizes.height = Math.round((cmSizes.height / inchCm) * dpi)
}

const centerResizeableImageComponentPositions = () => {
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  const quarterFromDefault = 250

  resizeableImageComponentPositions.x =
    Math.round((windowWidth - pixelSizes.width) / 2) - quarterFromDefault

  resizeableImageComponentPositions.y =
    Math.round((windowHeight - pixelSizes.height) / 2) - quarterFromDefault
}
const handleImageOnLoad = () => {
  if (imageElem.value) {
    assignCmSizes()
    nextTick(() => {
      centerResizeableImageComponentPositions()
    })
  }
}

watch(() => cmSizes, assignPixelSizes, { deep: true })
</script>

<template>
  <div class="image-container">
    <div class="image-sizes">
      <div class="length-block">
        <div class="length-elem">
          <span class="length-word"> Ширина </span>
          <el-input v-model="cmSizes.width" style="width: 80px" :placeholder="cmSizes.width" />
          <span>см</span>
        </div>
        <div class="length-elem">
          <span class="length-word">Высота</span>
          <el-input v-model="cmSizes.height" style="width: 80px" :placeholder="cmSizes.height" />
          <span>см </span>
        </div>
      </div>
    </div>
    <vue-draggable-resizable
      :x="resizeableImageComponentPositions.x"
      :y="resizeableImageComponentPositions.y"
      :w="pixelSizes.width"
      :h="pixelSizes.height"
      @resize="assignCmSizes"
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

<style scoped lang="scss">
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

.length-block {
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-width: fit-content;

  padding: 15px;
  margin-top: 10px;

  border: 1px solid rgb(166.2, 168.6, 173.4);
  border-radius: 15px;

  .length-elem {
    display: flex;
    gap: 10px;
    align-items: self-start;
    width: 200px;

    .length-word {
      flex: 1;
    }
  }
}
</style>
