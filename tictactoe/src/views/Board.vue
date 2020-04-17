<template>
  <div class="gameBoard nes-text">
    <h2 id="userHello">{{ player }}</h2>
    <h3 id="message">{{ message }}</h3>
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
<<<<<<< HEAD
import socket from '../config/socket'
<<<<<<< HEAD
=======
import $ from 'jquery'
import Game from '../store/board.js'

<<<<<<< HEAD
>>>>>>> development
=======
=======
import $ from 'jquery'
import Game from '../store/board.js'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')
>>>>>>> 65780127303d3d9aed505b3db43b09dce5ed3f77
>>>>>>> development
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> development
  createGameBoard (button) {
    function tileClickHandler () {
      const row = parseInt(this.id.split('_')[1][0], 10)
      const col = parseInt(this.id.split('_')[1][1], 10)
      if (!this.$store.state.player.getCurrentTurn() || !this.$store.state.game) {
        alert('Its not your turn!')
        return
      }

      // if ($(this).prop('disabled')) {
      //   alert('This tile has already been played on!')
      //   return
      // }

      // Update board after your turn.
      this.$store.state.game.playTurn(this)
      this.$store.state.game.updateBoard(this.$store.state.player.getPlayerType(), row, col, this.id)

      this.$store.state.player.setCurrentTurn(false)
      this.$store.state.player.updatePlaysArr(1 << ((row * 3) + col))

      this.$store.state.game.checkWinner()
    }

    for (let i = 0; i < 3; i++) {
      this.board.push(['', '', ''])
      for (let j = 0; j < 3; j++) {
        $(`#button_${i}${j}`).on('click', tileClickHandler)
      }
    }
  },
>>>>>>> development
  mounted () {
    socket.on('newGame', (data) => {
      const message =
        `Hello, ${data.name}. Please ask your friend to enter Game ID: 
        ${data.room}. Waiting for player 2...`
      this.message = message
      // Create game for player 1
<<<<<<< HEAD
      this.$store.commit('SET_GAME', data.room)
=======
      this.$store.commit('SET_GAME', new Game(data.room))
>>>>>>> development
      // game = new Game(data.room);
      // game.displayBoard(message);
=======
  created: function () {
    socket.on('newGame', (data) => {
      const message = 'Hello,' + data.name + 'Please ask your friend to enter Game ID: ' + data.room + 'Waiting for player 2...'
      this.$store.commit('SET_GAME', new Game(data.room, this.computed.player, Game))
      this.computed.game.displayBoard(message)
>>>>>>> 65780127303d3d9aed505b3db43b09dce5ed3f77
    })
    socket.on('player1', () => {
      const message = `Hello, ${this.computed.player.player.getPlayerName()}`
      $('#userHello').html(message)
      this.computed.player.setCurrentTurn(true)
    })
    socket.on('player2', (data) => {
      const message = `Hello, ${data.name}`
<<<<<<< HEAD
      this.message = message
      // Create game for player 2
<<<<<<< HEAD
      this.$store.commit('SET_GAME', data.room)
=======
      this.$store.commit('SET_GAME', new Game(data.room))
>>>>>>> development
      // game = new Game(data.room);
      // game.displayBoard(message);
      this.$store.state.player.setCurrentTurn(false)
=======
      this.$store.commit('SET_GAME', new Game(data.room, this.computed.player, this.computed.game))
      this.computed.game.displayBoard(message)
      this.computed.player.setCurrentTurn(false)
>>>>>>> 65780127303d3d9aed505b3db43b09dce5ed3f77
    })
<<<<<<< HEAD
=======
    socket.on('turnPlayed', (data) => {
      const row = data.tile.split('_')[1][0]
      const col = data.tile.split('_')[1][1]
      const opponentType = this.$store.state.player.getPlayerType() === this.$store.state.P1 ? this.$store.state.P2 : this.$store.state.P1

      this.$store.state.game.updateBoard(opponentType, row, col, data.tile)
      this.$store.state.player.setCurrentTurn(true)
    })
    socket.on('gameEnd', (data) => {
      this.$store.state.game.endGame(data.message)
      this.socket.leave(data.room)
    })
    socket.on('err', (data) => {
      this.$store.state.game.endGame(data.message)
    })
>>>>>>> development
  }
}
</script>
