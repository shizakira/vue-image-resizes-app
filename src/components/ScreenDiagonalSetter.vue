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
  if (!validateInputOnNumber()){
    isError.value = true
    return
  }

  setDiagonal(diagonalInput.value)
}
</script>

<template>
  <div class="set-diagonal-wrapper">
    <div class="set-diagonal-box">
      <label for="setDiagonalInput">Установить диагональ экрана</label>
      <input v-model="diagonalInput" type="text" class="input-diagonal" id="setDiagonalInput" />
      <span v-if="isError">Значение должно быть числом. Например, 27, 21.5</span>
      <button class="set-diagonal-input" @click="handleSetDiagonalInput">Применить</button>
    </div>
  </div>
</template>

<style scoped>
  .set-diagonal-wrapper{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
