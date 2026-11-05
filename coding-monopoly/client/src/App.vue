<script lang="ts">
import { defineComponent } from 'vue'
import LobbyView from './components/LobbyView.vue'
import BoardView from './components/BoardView.vue'
import AdminView from './components/AdminView.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import { store } from './store'
import websocketService from './services/websocketService'

export default defineComponent({
  name: 'App',
  components: { LobbyView, BoardView, AdminView, LanguageSwitcher, ThemeSwitcher },
  data() {
    return {
      isAdmin: false,
    }
  },
  computed: {
    showBoard(): boolean {
      return store.connected && store.boardCells.length > 0
    },
  },
  methods: {
    leaveGame() {
      websocketService.disconnect()
      for (const key of ['playerId', 'playerName', 'roomId']) sessionStorage.removeItem(key)
      store.playerId = ''
      store.playerName = ''
      store.roomId = ''
      store.boardCells = []
      store.players = []
      store.activeQuestion = null
      store.questionActive = false
      store.gameOver = null
      store.currentTurnPlayer = ''
      store.isStarted = false
      store.joinError = ''
    },
  },
  created() {
    this.isAdmin = new URLSearchParams(window.location.search).get('admin') === '1'
  },
})
</script>

<template>
  <div class="app-controls">
    <button v-if="!isAdmin && showBoard" class="leave-button" @click="leaveGame">Выйти из игры / Exit game / Ойыннан шығу</button>
    <ThemeSwitcher />
    <LanguageSwitcher />
  </div>
  <!-- Admin area mode: open the page with ?admin=1 -->
  <AdminView v-if="isAdmin" />
  <template v-else>
    <LobbyView v-if="!showBoard" />
    <BoardView v-else />
  </template>
</template>


<style scoped>
 .leave-button { background: #9b2525; color: white; border: 0; border-radius: 8px; padding: 10px; cursor: pointer; font-weight: 700; }
/* Theme and language controls stay reachable on every screen. */
.app-controls {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 10000;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
</style>
