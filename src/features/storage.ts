import { ref, watch } from 'vue'
export function useLocalRecord<T>(
  key: string,
  fallback: T,
  accepts: (value: unknown) => value is T,
) {
  const data = ref<T>(fallback)
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? 'null')
    if (accepts(value)) data.value = value
  } catch {
    /* Start with the default when storage cannot be read. */
  }
  const writable = ref(true)
  watch(
    data,
    (value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
        writable.value = true
      } catch {
        writable.value = false
      }
    },
    { deep: true, flush: 'sync' },
  )
  return { data, writable }
}
export function downloadText(name: string, value: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([value], { type: type + ';charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
