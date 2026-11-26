<script setup lang="ts">
import { computed } from 'vue'
import type { TableStudy } from './configuration'
const props = defineProps<{ study: TableStudy }>()
const scale = computed(() => 100 / Math.max(props.study.length, props.study.width, 1))
const fill = computed(() =>
  props.study.wood === 'nogal' ? '#67412a' : props.study.wood === 'olivo' ? '#9d7548' : '#b18b61',
)
const geometry = computed(() => ({
  width: Math.max(props.study.length, 0) * scale.value + '%',
  height: Math.max(props.study.width, 0) * scale.value * 1.45 + 'px',
  borderRadius: props.study.shape === 'ovalada' ? '50%' : '4px',
  backgroundColor: fill.value,
}))
</script>
<template>
  <figure class="table-plan">
    <figcaption>Vista superior esquemática · {{ study.length }} × {{ study.width }} cm</figcaption>
    <div class="table-outline" :style="geometry" aria-hidden="true">
      <span v-if="study.resin !== 'sin-resina'"></span>
    </div>
  </figure>
</template>
