<script setup lang="ts">
import { computed } from 'vue'
import type { CellValue } from '@/composables/useGame'

const props = defineProps<{
  index: number
  value: CellValue
  isWinning: boolean
  disabled?: boolean
}>()

const label = computed(() => {
  const pos = props.index + 1
  return `Cell ${pos}${props.value ? `, ${props.value}` : ''}`
})
</script>

<template>
  <button
    class="cell"
    :class="[{ winning: isWinning, hasVal: !!value }, value]"
    :aria-label="label"
    :disabled="disabled"
  >
    <transition name="pop">
      <span v-if="value" class="mark" :class="value">{{ value }}</span>
    </transition>
  </button>
</template>

<style scoped>
.cell {
  height: 100%;
  width: 100%;
  background: var(--color-surface);
  border-radius: 14px;
  border: 1px solid rgba(17,24,39,0.08);
  box-shadow: var(--shadow-soft);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base), background var(--transition-base);
}
.cell:hover { transform: translateY(-1px); box-shadow: var(--shadow-hover); }
.cell:disabled { cursor: default; transform: none; }
.cell.hasVal { background: #fcfcff; }
.cell.winning { border-color: var(--color-secondary); box-shadow: 0 0 0 4px rgba(245,158,11,0.15), var(--shadow-hover); }

.mark {
  font-size: clamp(42px, 9vw, 72px);
  font-weight: 900;
  letter-spacing: -0.02em;
}
.mark.X { color: var(--color-primary); }
.mark.O { color: var(--color-secondary); }

.pop-enter-active, .pop-leave-active { transition: transform 200ms ease, opacity 200ms ease; }
.pop-enter-from, .pop-leave-to { transform: scale(0.6); opacity: 0; }
</style>
