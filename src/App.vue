<script setup lang="ts">
import { ref } from 'vue'
import { useScreenConfigStore } from '@/stores/screen-config-store.ts'
import { storeToRefs } from 'pinia'
import ResizeableImage from '@/components/ResizeableImage.vue'
import SetDiagonalInput from '@/components/SetDiagonalInput.vue'

const store = useScreenConfigStore()
const { resetDiagonal } = store
const { isScreenDiagonalSet } = storeToRefs(store)

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
  <div class="main">
    <div class="container">
      <set-diagonal-input v-if="!isScreenDiagonalSet"></set-diagonal-input>
      <div v-if="isScreenDiagonalSet" class="manage">
        <div class="manage__reset-diagonal">
          <button class="manage__reset-diagonal_btn" @click="resetDiagonal">
            Изменить диагональ
          </button>
        </div>
        <div class="manage__image-input">
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
        </div>
      </div>
      <resizeable-image
        v-if="imageSrc && isScreenDiagonalSet"
        :image-src="imageSrc"
      ></resizeable-image>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
</style>
