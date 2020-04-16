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

export default {
  name: 'Board',
  data () {
    return {
      player: '',
      message: ''
    }
  },
  mounted () {
    socket.on('newGame', (data) => {
      const message =
        `Hello, ${data.name}. Please ask your friend to enter Game ID: 
        ${data.room}. Waiting for player 2...`;
      this.message = message
      // Create game for player 1
      this.$store.commit('SET_GAME', data.room)
      // game = new Game(data.room);
      // game.displayBoard(message);
    }),
    socket.on('player1', (data) => {
      const message = `Hello, ${this.$store.state.player.getPlayerName()}`;
      this.player = message
      // $('#userHello').html(message);
      this.$store.state.player.setCurrentTurn(true);
    }),
    socket.on('player2', (data) => {
      const message = `Hello, ${data.name}`;
      this.message = message
      // Create game for player 2
      this.$store.commit('SET_GAME', data.room)
      // game = new Game(data.room);
      // game.displayBoard(message);
      this.$store.state.player.setCurrentTurn(false);
    })
  }
}
</script>
