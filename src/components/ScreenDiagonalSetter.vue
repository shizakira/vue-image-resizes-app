<script setup lang="ts">
import { ref } from 'vue'
import { useScreenConfigStore } from '@/stores/useScreenConfig.ts'

const { setDiagonal } = useScreenConfigStore()
const diagonalInput = ref<string>('')

const validateInputOnNumber = (): boolean => {
  const regexp = /^\d+(\.\d+)?$/
  return regexp.test(diagonalInput.value)
}

const isError = ref<boolean>(false)

const handleSetDiagonalInput = (): void => {
  if (!validateInputOnNumber()) {
    isError.value = true
    return
  }

  setDiagonal(diagonalInput.value)
}
</script>

<template>
  <div class="top-panel">
    <div class="set-diagonal-box">
      <el-input
        v-model="diagonalInput"
        style="width: 240px"
        placeholder="Установите диагональ экрана"
        @keyup.enter="handleSetDiagonalInput"
      />
      <el-button
        type="primary"
        @click="handleSetDiagonalInput"
        >Применить
      </el-button>
      <span v-if="isError">Значение должно быть числом. Например, 27, 21.5</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.set-diagonal-box {
  display: flex;
  gap: 10px;
  align-items: center;

  span {
    color: #fff;
  }
}
</style>
