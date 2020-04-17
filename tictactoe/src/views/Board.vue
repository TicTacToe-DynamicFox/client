<template>
  <div class="gameBoard nes-text">
    <h2 id="userHello">{{ player }}</h2>
    <h3 id="message">{{ message }}</h3>
    <h1>Time's up!</h1>
    <h1>Final Score</h1>
    <div>
      <h2>Player 1: {{count1Sock}}</h2>
      <h3>Player 2: {{count2Sock}}</h3>
    </div>
  </div>
</template>

<script>
import socket from '../config/socket'

export default {
  name: 'Board',
  data () {
    return {
      player: '',
      message: ''
    }
  },
  computed: {
    count1Sock: {
      get () {
        return this.$store.state.count1Sock
      }
    },
    count2Sock: {
      get () {
        return this.$store.state.count2Sock
      }
    }
  },
  methods: {
    setCurrentTurn (turn) {
      this.$store.commit('SET_CURRENT_TURN', turn)
    }
  },
  mounted () {
    socket.on('newGame', (data) => {
      const message =
        `Hello, ${data.name}. Please ask your friend to enter Game ID: 
        ${data.room}. Waiting for player 2...`
      this.message = message
      console.log('hei sudah new game')
      // Create game for player 1
      this.$store.commit('SET_GAME', data.room)
      // game = new Game(data.room);
      // game.displayBoard(message);
    })
    socket.on('player1', (data) => {
      const message = `Hello, ${this.$store.state.player.getPlayerName()}`
      this.player = message
      console.log('yap, kamu player 1.')
      // $('#userHello').html(message);
      this.$store.state.player.setCurrentTurn(true)
    })
    socket.on('player2', (data) => {
      const message = `Hello, ${data.name}`
      this.message = message
      // Create game for player 2
      console.log('ada yang gabung')
      this.$store.commit('SET_GAME', data.room)
      // game = new Game(data.room);
      // game.displayBoard(message);
      this.$store.state.player.setCurrentTurn(false)
    })
  }
}
</script>
