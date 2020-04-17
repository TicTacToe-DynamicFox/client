<template>
  <div class="gameBoard" style="">
    <h2 id="userHello"></h2>
    <h3 id="turn"></h3>
    <table class="kenter nes-table is-centered">
      <tr>
        <td><button class="nes-btn" id="button_00"></button></td>
        <td><button class="nes-btn" id="button_01"></button></td>
        <td><button class="nes-btn" id="button_02"></button></td>
      </tr>
      <tr>
        <td><button class="nes-btn" id="button_10"></button></td>
        <td><button class="nes-btn" id="button_11"></button></td>
        <td><button class="nes-btn" id="button_12"></button></td>
      </tr>
      <tr>
        <td><button class="nes-btn" id="button_20"></button></td>
        <td><button class="nes-btn" id="button_21"></button></td>
        <td><button class="nes-btn" id="button_22"></button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import $ from 'jquery'
import Game from '../store/board.js'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')
export default {
  name: 'Board',
  computed: {
    player: function () {
      return this.$store.player
    },
    game: function () {
      return this.$store.game
    }
  },
  created: function () {
    socket.on('newGame', (data) => {
      const message = 'Hello,' + data.name + 'Please ask your friend to enter Game ID: ' + data.room + 'Waiting for player 2...'
      this.$store.commit('SET_GAME', new Game(data.room, this.computed.player, Game))
      this.computed.game.displayBoard(message)
    })
    socket.on('player1', () => {
      const message = `Hello, ${this.computed.player.player.getPlayerName()}`
      $('#userHello').html(message)
      this.computed.player.setCurrentTurn(true)
    })
    socket.on('player2', (data) => {
      const message = `Hello, ${data.name}`
      this.$store.commit('SET_GAME', new Game(data.room, this.computed.player, this.computed.game))
      this.computed.game.displayBoard(message)
      this.computed.player.setCurrentTurn(false)
    })
  }
}
</script>
