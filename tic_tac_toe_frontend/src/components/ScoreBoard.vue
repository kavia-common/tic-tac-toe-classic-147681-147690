<script setup lang="ts">
import { useGame } from '@/composables/useGame'

const { state, currentTurnLabel } = useGame()
</script>

<template>
  <div class="scoreboard" role="status" aria-live="polite">
    <div class="scores">
      <div class="card x">
        <span class="label">Player X</span>
        <strong class="value">{{ state.scores.X }}</strong>
      </div>
      <div class="card o">
        <span class="label">Player O</span>
        <strong class="value">{{ state.scores.O }}</strong>
      </div>
    </div>
    <div class="status">
      <span class="badge">{{ currentTurnLabel }}</span>
    </div>
  </div>
</template>

<style scoped>
.scoreboard {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
.scores {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.card {
  background: #ffffff;
  border-radius: 12px;
  padding: 12px 14px;
  border: 1px solid rgba(17,24,39,0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card.x .value { color: #2563EB; }
.card.o .value { color: #F59E0B; }
.label { color: #6b7280; font-weight: 600; }
.value { font-size: 22px; }
.status {
  text-align: center;
}
@media (min-width: 640px) {
  .scoreboard {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}
</style>
