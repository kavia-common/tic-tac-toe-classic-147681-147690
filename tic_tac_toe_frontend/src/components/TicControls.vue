<script setup lang="ts">
import { useGame } from '@/composables/useGame'

const { state, reset, newGame } = useGame()
</script>

<template>
  <div class="controls">
    <button class="ghost" aria-label="Start a new round" @click="reset">
      New Round
    </button>
    <button class="secondary" aria-label="Reset scores and start a new game" @click="newGame()">
      New Game
    </button>
    <button
      class="btn-danger"
      aria-label="Clear board"
      @click="reset"
      v-show="state.board.some(c => c !== null)"
    >
      Clear Board
    </button>
  </div>
</template>

<style scoped>
.controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
@media (max-width: 480px) {
  .controls {
    grid-template-columns: 1fr;
  }
}
</style>
