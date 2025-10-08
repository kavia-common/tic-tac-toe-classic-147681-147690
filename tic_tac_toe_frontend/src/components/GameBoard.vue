<script setup lang="ts">
import { computed } from 'vue'
import { useGame } from '@/composables/useGame'
import TicCell from './TicCell.vue'

const { state, playAt } = useGame()

const gridStyle = computed(() => ({
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
}))
</script>

<template>
  <div class="board-wrapper">
    <div class="board" :style="gridStyle" role="grid" aria-label="Tic Tac Toe board">
      <TicCell
        v-for="(val, idx) in state.board"
        :key="idx"
        :index="idx"
        :value="val"
        :is-winning="state.winningLine?.includes(idx) ?? false"
        :disabled="!!state.winner || state.isDraw || val !== null || (state.mode === 'PVC' && state.currentPlayer === 'O')"
        @click="playAt(idx)"
      />
    </div>

    <transition name="fade-up">
      <div v-if="state.winner || state.isDraw" class="overlay" role="alert" aria-live="assertive">
        <div class="result-card" :class="{ win: !!state.winner, draw: state.isDraw }">
          <span v-if="state.winner">Winner: {{ state.winner }}</span>
          <span v-else>It's a draw</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.board-wrapper {
  position: relative;
}
.board {
  display: grid;
  gap: 10px;
  aspect-ratio: 1 / 1;
  width: min(92vw, 520px);
  margin: 0 auto;
}
.overlay {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
.result-card {
  background: #ffffff;
  border: 1px solid rgba(17,24,39,0.08);
  box-shadow: var(--shadow-hover);
  border-radius: 14px;
  padding: 12px 16px;
  color: #111827;
  font-weight: 800;
}
.result-card.win { border-color: rgba(37,99,235,0.25); }
.result-card.draw { border-color: rgba(107,114,128,0.25); }

.fade-up-enter-active, .fade-up-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}
.fade-up-enter-from, .fade-up-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
