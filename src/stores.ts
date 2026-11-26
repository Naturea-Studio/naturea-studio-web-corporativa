import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
export const useFavorites = defineStore('favorites', () => {
  const key = 'naturea-favorites'
  const ids = ref<string[]>([])
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(key) ?? '[]')
    if (Array.isArray(saved)) ids.value = saved.filter((id): id is string => typeof id === 'string')
  } catch {
    /* Session-only storage. */
  }
  watch(ids, (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* Session-only storage. */
    }
  })
  function toggle(id: string) {
    ids.value = ids.value.includes(id)
      ? ids.value.filter((item) => item !== id)
      : [...ids.value, id]
  }
  return { ids, toggle }
})
