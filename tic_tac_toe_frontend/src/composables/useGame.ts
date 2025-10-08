import { computed, reactive } from 'vue'

export type Player = 'X' | 'O'
export type CellValue = Player | null
export type Mode = 'PVP' | 'PVC'

interface GameState {
  board: CellValue[]
  currentPlayer: Player
  mode: Mode
  scores: Record<Player, number>
  winner: Player | null
  winningLine: number[] | null
  isDraw: boolean
  computerThinking: boolean
}

/**
 * PUBLIC_INTERFACE
 * useGame
 * This composable manages the Tic Tac Toe game state and mechanics.
 * - Provides board, current player, scores, mode, winner, draw status.
 * - Exposes actions: setMode, playAt, reset, newGame, and computerMove for AI.
 */
export function useGame() {
  const state = reactive<GameState>({
    board: Array<CellValue>(9).fill(null),
    currentPlayer: 'X',
    mode: 'PVP',
    scores: { X: 0, O: 0 },
    winner: null,
    winningLine: null,
    isDraw: false,
    computerThinking: false,
  })

  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ] as const

  const currentTurnLabel = computed(() => {
    if (state.winner) return `Winner: ${state.winner}`
    if (state.isDraw) return 'Draw'
    return `Turn: ${state.currentPlayer}`
  })

  function setMode(mode: Mode) {
    state.mode = mode
    newGame(true)
  }

  function checkWinner(board: CellValue[]): { winner: Player | null; line: number[] | null } {
    for (const [a, b, c] of lines) {
      const va = board[a], vb = board[b], vc = board[c]
      if (va && va === vb && vb === vc) {
        return { winner: va, line: [a, b, c] }
      }
    }
    return { winner: null, line: null }
  }

  function updateOutcome() {
    const { winner, line } = checkWinner(state.board)
    state.winner = winner
    state.winningLine = line
    state.isDraw = !winner && state.board.every(c => c !== null)
    if (state.winner) {
      state.scores[state.winner] += 1
    }
  }

  function switchTurn() {
    state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X'
  }

  function playAt(index: number) {
    if (state.winner || state.isDraw || state.board[index] !== null) return
    state.board[index] = state.currentPlayer
    updateOutcome()
    if (!state.winner && !state.isDraw) {
      switchTurn()
      if (state.mode === 'PVC' && state.currentPlayer === 'O') {
        computerMove()
      }
    }
  }

  function reset() {
    state.board = Array<CellValue>(9).fill(null)
    state.currentPlayer = 'X'
    state.winner = null
    state.winningLine = null
    state.isDraw = false
    state.computerThinking = false
  }

  function newGame(keepScores = false) {
    if (!keepScores) {
      state.scores.X = 0
      state.scores.O = 0
    }
    reset()
  }

  function availableMoves(board = state.board): number[] {
    const moves: number[] = []
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) moves.push(i)
    }
    return moves
  }

  function pickBestMove(): number | null {
    const me: Player = 'O'
    const opp: Player = 'X'
    const avail = availableMoves()

    for (const i of avail) {
      const clone = [...state.board]
      clone[i] = me
      if (checkWinner(clone).winner === me) return i
    }

    for (const i of avail) {
      const clone = [...state.board]
      clone[i] = opp
      if (checkWinner(clone).winner === opp) return i
    }

    if (state.board[4] === null) return 4

    const corners = [0, 2, 6, 8].filter(i => state.board[i] === null)
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)]

    if (avail.length) return avail[Math.floor(Math.random() * avail.length)]
    return null
  }

  async function computerMove() {
    if (state.mode !== 'PVC' || state.currentPlayer !== 'O' || state.winner || state.isDraw) return
    state.computerThinking = true
    await new Promise(res => setTimeout(res, 400))
    const move = pickBestMove()
    if (move !== null) {
      state.board[move] = 'O'
      updateOutcome()
      if (!state.winner && !state.isDraw) {
        switchTurn()
      }
    }
    state.computerThinking = false
  }

  return {
    state,
    currentTurnLabel,
    setMode,
    playAt,
    reset,
    newGame,
    computerMove,
  }
}
