<script setup lang="ts">
import { ref } from 'vue'
import ResizeableImage from '@/components/ResizeableImage.vue'

const selectedFile = ref<HTMLInputElement | null>(null)
const imageSrc = ref<string>('')
const handleResizeableImage = () => {
  const fileInput = selectedFile.value

  if (!fileInput || !fileInput?.files) {
    return
  }

  const file = fileInput.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    imageSrc.value = reader.result as string
  }

  reader.readAsDataURL(file)
}

const deleteResizeableImage = () => {
  if (selectedFile.value) {
    selectedFile.value.value = ''
  }
  imageSrc.value = ''
}
</script>

<template>
  <div class="app">
    <div class="container">
      <input
        type="file"
        ref="selectedFile"
        class="image-input"
        multiple
        @change="handleResizeableImage"
      />
      <button v-if="imageSrc" class="delete-img-btn" @click="deleteResizeableImage">
        Удалить фото
      </button>
      <resizeable-image v-if="imageSrc" :image-src="imageSrc"></resizeable-image>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
</style>
