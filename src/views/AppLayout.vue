<script setup lang="ts">
import {ref} from "vue"

const selectedFile = ref<HTMLInputElement | null>(null)
const imageSrc = ref<string | null>(null)
const image = ref<HTMLImageElement | null>(null)
const handleImage = () => {
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

const deleteImage = () => {
  imageSrc.value = null
}

const checkSizes = () => {
  alert(image.value.width, image.value.height);
}
</script>

<template>
  <div class="app">
    <input type="file" ref="selectedFile" class="image-input" multiple @change="handleImage">
    <button class="delete-img-btn" @click="deleteImage">Удалить фото</button>
    <button class="check-img-btn" @click="checkSizes">Посмотркть размеры</button>
    <div class="image-container">
      <img ref="image" v-show="imageSrc" class="image" :src="imageSrc" alt="">
    </div>
  </div>
</template>

<style scoped>

</style>
