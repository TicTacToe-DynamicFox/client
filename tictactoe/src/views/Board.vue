<template>
  <div class="gameBoard nes-text">
    <h2 id="userHello"></h2>
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
// import Swal from 'sweetalert2'
// import io from 'socket.io-client'
// const socket = io.connect('http://localhost:3000')
import socket from '../config/socket'
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
  // methods: {
  //   createGameBoard () {
  //     function tileClickHandler () {
  //       const row = parseInt(this.id.split('_')[1][0], 10)
  //       const col = parseInt(this.id.split('_')[1][1], 10)
  //       console.log('ini this.player', this.player)
  //       if (!this.player.getCurrentTurn() || !this.game) {
  //         Swal.fire('Its not your turn!')
  //         return
  //       }
  //       if ($(this).prop('disabled')) {
  //         Swal.fire('This tile has already been played on!')
  //         return
  //       }
  //       this.game.playTurn(this)
  //       this.game.updateBoard(this.player.getPlayerType(), row, col, this.id)

  //       this.player.setCurrentTurn(false)
  //       this.player.updatePlaysArr(1 << ((row * 3) + col))

  //       this.game.checkWinner()
  //     }

  //     for (let i = 0; i < 3; i++) {
  //       this.board.push(['', '', ''])
  //       for (let j = 0; j < 3; j++) {
  //         $(`#button_${i}${j}`).on('click', tileClickHandler)
  //       }
  //     }
  //   }
  // },
  created: function () {
    socket.on('newGame', (data) => {
      console.log('ini data', data)
      const message = 'Hello, ' + data.name + ' Please ask your friend to enter Game ID: ' + data.room + '. Waiting for player 2...'
      console.log('thisplayer form on', this.player)
      this.$store.commit('SET_GAME', new Game(data.room, this.player, this.game))
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
