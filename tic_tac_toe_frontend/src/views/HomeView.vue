<script setup lang="ts">
import ScoreBoard from '@/components/ScoreBoard.vue'
import ModeSelector from '@/components/ModeSelector.vue'
import GameBoard from '@/components/GameBoard.vue'
import TicControls from '@/components/TicControls.vue'
</script>

<template>
  <main style="display:grid; gap:12px;">
    <ScoreBoard />
    <ModeSelector />
    <GameBoard />
    <TicControls />
  </main>
</template>
