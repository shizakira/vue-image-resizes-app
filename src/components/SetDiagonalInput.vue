<script setup lang="ts">
import { ref } from 'vue'
import { useScreenConfigStore } from '@/stores/screen-config-store.ts'

const { setDiagonal } = useScreenConfigStore()
const diagonalInput = ref<string>('')

const validateInputOnNumber = (): boolean => {
  const regexp = /\d+/
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
  <label for="setDiagonalInput">Установить диагональ экрана</label>
  <input v-model="diagonalInput" type="text" class="input-diagonal" id="setDiagonalInput" />
  <span v-if="isError">Значение должно быть числом</span>
  <button class="set-diagonal-input" @click="handleSetDiagonalInput">Применить</button>
</template>

<style scoped></style>
