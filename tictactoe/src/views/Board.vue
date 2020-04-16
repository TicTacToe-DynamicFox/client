<template>
  <div class="gameBoard">
    <h2 id="userHello"></h2>
    <h3 id="message"></h3>
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
      this.$store.commit('SET_GAME', data.room)
      // Create game for player 1
      // game = new Game(data.room);
      // game.displayBoard(message);
    })
  }
}
</script>
