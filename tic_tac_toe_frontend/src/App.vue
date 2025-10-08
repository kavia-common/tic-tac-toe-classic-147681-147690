<script setup lang="ts">
import ScoreBoard from './components/ScoreBoard.vue'
import ModeSelector from './components/ModeSelector.vue'
import GameBoard from './components/GameBoard.vue'
import TicControls from '@/components/TicControls.vue'
</script>

<template>
  <div class="app-shell">
    <main class="container">
      <header class="header">
        <h1 class="title" aria-label="Tic Tac Toe Title">Tic Tac Toe</h1>
        <p class="subtitle">Ocean Professional Edition</p>
      </header>

      <section class="panel scoreboard">
        <ScoreBoard />
      </section>

      <section class="panel selector" aria-label="Game mode selection">
        <ModeSelector />
      </section>

      <section class="panel board" aria-label="Game Board">
        <GameBoard />
      </section>

      <section class="panel controls" aria-label="Game controls">
        <TicControls />
      </section>

      <footer class="footer">
        <small>Built with Vue 3 + Vite</small>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  /* Subtle gradient background: blue-500/10 to gray-50 */
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), #f9fafb);
  display: grid;
  place-items: center;
  color: #111827;
}
.container {
  width: 100%;
  max-width: 980px;
  padding: 24px;
}
.header {
  text-align: center;
  margin-bottom: 16px;
}
.title {
  color: #111827;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.subtitle {
  color: #4b5563;
  margin-top: 4px;
}
.panel {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04);
  padding: 16px;
  margin: 10px 0;
  transition: box-shadow 220ms ease, transform 220ms ease;
}
.panel:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.07), 0 10px 10px rgba(0,0,0,0.04);
}
.scoreboard {
  padding: 12px 16px;
}
.selector {
  padding: 12px 16px;
}
.board {
  padding: 18px;
}
.controls {
  padding: 12px 16px;
  display: grid;
  gap: 12px;
}
.footer {
  text-align: center;
  color: #6b7280;
  margin-top: 16px;
}
@media (min-width: 768px) {
  .container {
    padding: 32px;
  }
  .title {
    font-size: 40px;
  }
}
</style>
