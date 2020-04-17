<template>
  <div class="gameBoard nes-text">
    <h2 id="userHello">{{ player }}</h2>
    <h3 id="message">{{ message }}</h3>
    <h2>{{m}}</h2>
    <table class="kenter nes-table is-centered">
      <tr>
        <td><button class="nes-btn tic" id="button_00"></button></td>
        <td><button class="nes-btn tic" id="button_01"></button></td>
        <td><button class="nes-btn tic" id="button_02"></button></td>
      </tr>
      <tr>
        <td><button class="nes-btn tic" id="button_10"></button></td>
        <td><button class="nes-btn tic" id="button_11"></button></td>
        <td><button class="nes-btn tic" id="button_12"></button></td>
      </tr>
      <tr>
        <td><button class="nes-btn tic" id="button_20"></button></td>
        <td><button class="nes-btn tic" id="button_21"></button></td>
        <td><button class="nes-btn tic" id="button_22"></button></td>
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
  data () {
    return {
      m: ''
    }
  },
  computed: {
    player: function () {
      return this.$store.state.player
    },
    game: function () {
      return this.$store.state.game
    }
  },
  created: function () {
    socket.on('newGame', (data) => {
      const message = 'Hello,' + data.name + 'Please ask your friend to enter Game ID: ' + data.room + 'Waiting for player 2...'
      this.m = message
      console.log(this.m)
      this.$store.commit('SET_GAME', new Game(data.room, this.player, Game))
      this.game.displayBoard(message)
    })
    socket.on('player1', () => {
      const message = `Hello, ${this.player.getPlayerName()}`
      $('#userHello').html(message)
      this.player.setCurrentTurn(true)
    })
    socket.on('player2', (data) => {
      const message = `Hello, ${data.name}`
      this.$store.commit('SET_GAME', new Game(data.room, this.player, this.game))
      this.game.displayBoard(message)
      this.player.setCurrentTurn(false)
    })
  }
}
</script>
