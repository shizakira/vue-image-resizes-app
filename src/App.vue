<script setup lang="ts">
import { ref } from 'vue'
import { useScreenConfigStore } from '@/stores/useScreenConfig.ts'
import { storeToRefs } from 'pinia'
import DraggableResizeableImage from '@/components/DraggableResizeableImage.vue'
import ScreenDiagonalSetter from '@/components/ScreenDiagonalSetter.vue'
import TopPanel from '@/layouts/TopPanel.vue'

const store = useScreenConfigStore()
const { resetDiagonal } = store
const { isScreenDiagonalSet } = storeToRefs(store)

const selectedFile = ref<HTMLInputElement | null>(null)
const imageSrc = ref<string>('')
const proxyUploadBtn = ref<HTMLButtonElement | null>(null)

const handleProxyToInput = () => {
  selectedFile.value?.click()
}
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
      <div class="main-inner">
        <top-panel>
          <screen-diagonal-setter v-if="!isScreenDiagonalSet"></screen-diagonal-setter>
          <div v-if="isScreenDiagonalSet" class="manage">
            <div class="manage__reset-diagonal">
              <el-button @click="resetDiagonal" type="primary">Изменить диагональ</el-button>
            </div>
            <div class="manage__image-input">
              <el-button
                type="primary"
                class="proxy-upload-btn"
                ref="proxyUploadBtn"
                @click="handleProxyToInput"
              >
                Загрузить фото
                <input
                  type="file"
                  ref="selectedFile"
                  class="image-input"
                  multiple
                  @change="handleResizeableImage"
                />
              </el-button>
              <el-button v-if="imageSrc" @click="deleteResizeableImage" type="primary">
                Удалить фото
              </el-button>
            </div>
          </div>
        </top-panel>
        <draggable-resizeable-image
          v-if="imageSrc && isScreenDiagonalSet"
          :image-src="imageSrc"
        ></draggable-resizeable-image>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/mixins.scss";
.main {
  background-color: rgb(102.2, 177.4, 255);
  height: 100vh;
  padding: 20px 0;

  .container,
  .main-inner {
    height: 100%;
  }
}

.main-inner {
  @include box-shadow-template;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
}

.manage {
  display: flex;
  align-items: center;
  gap: 20px;
}

.manage__reset-diagonal {
  flex: 1;
}

.image-input {
  display: none;
}
</style>
