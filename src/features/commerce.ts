import { computed } from 'vue'
import { defineStore } from 'pinia'
import { conceptProducts } from '../data'
import { useLocalRecord } from './storage'
type Line = { id: string; quantity: number; unit: number; name: string }
export type TestOrder = {
  id: string
  date: string
  lines: Line[]
  shipping: number
  total: number
  delivery: 'recogida' | 'estandar'
}
const object = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object')
const integer = (value: unknown): value is number =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= 0
const isOrder = (value: unknown): value is TestOrder =>
  object(value) &&
  typeof value.id === 'string' &&
  typeof value.date === 'string' &&
  Number.isFinite(Date.parse(value.date)) &&
  integer(value.total) &&
  integer(value.shipping) &&
  (value.delivery === 'recogida' || value.delivery === 'estandar') &&
  Array.isArray(value.lines) &&
  value.lines.every(
    (row) =>
      object(row) &&
      typeof row.id === 'string' &&
      typeof row.name === 'string' &&
      integer(row.quantity) &&
      row.quantity > 0 &&
      integer(row.unit),
  )
const testCartIds = new Set([
  'bandeja-decorativa',
  'organizador-personal',
  'reloj-de-pared',
  'estanteria-flotante',
  'mesa-auxiliar',
  'mesa-de-centro',
])
export const canAddToTestCart = (id: string) => testCartIds.has(id)

export const useCommerce = defineStore('test-commerce', () => {
  const { data: cart, writable: cartWritable } = useLocalRecord(
    'naturea-test-cart',
    {} as Record<string, number>,
    (value): value is Record<string, number> =>
      object(value) &&
      !Array.isArray(value) &&
      Object.values(value).every((item) => integer(item) && item <= 9),
  )
  const { data: orders, writable: ordersWritable } = useLocalRecord(
    'naturea-test-orders',
    [] as TestOrder[],
    (value): value is TestOrder[] => Array.isArray(value) && value.every(isOrder),
  )
  const lines = computed(() =>
    conceptProducts.flatMap((item) =>
      canAddToTestCart(item.id) &&
      item.price &&
      Object.hasOwn(cart.value, item.id) &&
      cart.value[item.id] > 0
        ? [
            {
              id: item.id,
              name: item.name,
              quantity: cart.value[item.id],
              unit: item.price.subtotalCents,
            },
          ]
        : [],
    ),
  )
  const subtotal = computed(() =>
    lines.value.reduce((sum, line) => sum + line.quantity * line.unit, 0),
  )
  function set(id: string, quantity: number) {
    if (
      !conceptProducts.some((item) => item.id === id && canAddToTestCart(id) && item.price) ||
      !Number.isSafeInteger(quantity)
    )
      return
    const next = { ...cart.value }
    if (quantity <= 0) delete next[id]
    else next[id] = Math.min(9, quantity)
    cart.value = next
  }
  function place(delivery: TestOrder['delivery']) {
    if (!lines.value.length) return
    const shipping = delivery === 'estandar' ? 1290 : 0
    const order = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      lines: lines.value,
      shipping,
      total: subtotal.value + shipping,
      delivery,
    }
    orders.value = [order, ...orders.value]
    cart.value = {}
    return order.id
  }
  return { lines, orders, subtotal, set, place, cartWritable, ordersWritable }
})
