import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useScreenConfigStore = defineStore('screenConfig', () => {
  const screenDiagonal = ref<string | null>(localStorage.getItem('screenDiagonal'))

  const isScreenDiagonalSet = computed((): boolean => screenDiagonal.value !== null)
  const setDiagonal = (fetchedScreenDiagonal: string): void => {
    screenDiagonal.value = fetchedScreenDiagonal
    localStorage.setItem('screenDiagonal', `${fetchedScreenDiagonal}`)
  }

  const resetDiagonal = () => {
    screenDiagonal.value = null
    localStorage.removeItem('screenDiagonal')
  }
  const getDpi = (): number => {
    if (!screenDiagonal.value) {
      throw new Error('screenDiagonal is not set')
    }

    const totalScreenWidth: number = window.screen.width
    const totalScreenHeight: number = window.screen.height
    const pixelDiagonal = Math.sqrt(totalScreenWidth ** 2 + totalScreenHeight ** 2)
    const diagonalInInches = parseFloat(screenDiagonal.value)

    return pixelDiagonal / diagonalInInches
  }

  return { screenDiagonal, isScreenDiagonalSet, setDiagonal, resetDiagonal, getDpi }
})
