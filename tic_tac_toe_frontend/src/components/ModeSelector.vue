<script setup lang="ts">
import { useGame, type Mode } from '@/composables/useGame'

const { state, setMode } = useGame()

function onSelect(mode: Mode) {
  setMode(mode)
}
</script>

<template>
  <div class="selector">
    <button
      class="mode-btn"
      :class="{ active: state.mode === 'PVP' }"
      aria-label="Select Player versus Player mode"
      @click="onSelect('PVP')"
    >
      PvP
    </button>
    <button
      class="mode-btn"
      :class="{ active: state.mode === 'PVC' }"
      aria-label="Select Player versus Computer mode"
      @click="onSelect('PVC')"
    >
      vs Computer
    </button>
  </div>
</template>

<style scoped>
.selector {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.mode-btn {
  background: #eef2ff;
  color: var(--color-primary);
  border-radius: 12px;
  padding: 10px 12px;
  font-weight: 700;
  box-shadow: var(--shadow-soft);
}
.mode-btn.active {
  background: var(--color-primary);
  color: #fff;
}
.mode-btn:focus-visible {
  outline: 3px solid rgba(37,99,235,0.38);
  outline-offset: 2px;
}
</style>
