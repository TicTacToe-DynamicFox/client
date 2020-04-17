<template>
  <div class="gameBoard">
    <h2 id="userHello">{{ player }}</h2>
    <h3 id="message">{{ message }}</h3>
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
import socket from '../config/socket'
import $ from 'jquery'
import Game from '../store/board.js'

export default {
  name: 'Board',
  data () {
    return {
      player: '',
      message: ''
    }
  },
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
  mounted () {
    socket.on('newGame', (data) => {
      const message =
        `Hello, ${data.name}. Please ask your friend to enter Game ID: 
        ${data.room}. Waiting for player 2...`
      this.message = message
      // Create game for player 1
      this.$store.commit('SET_GAME', new Game(data.room))
      // game = new Game(data.room);
      // game.displayBoard(message);
    })
    socket.on('player1', (data) => {
      const message = `Hello, ${this.$store.state.player.getPlayerName()}`
      this.player = message
      // $('#userHello').html(message);
      this.$store.state.player.setCurrentTurn(true)
    })
    socket.on('player2', (data) => {
      const message = `Hello, ${data.name}`
      this.message = message
      // Create game for player 2
      this.$store.commit('SET_GAME', new Game(data.room))
      // game = new Game(data.room);
      // game.displayBoard(message);
      this.$store.state.player.setCurrentTurn(false)
    })
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
  }
}
</script>
