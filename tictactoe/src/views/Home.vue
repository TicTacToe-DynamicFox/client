<template>
  <div class="menu nes-text">
    <h1 class="nes-text">Tic - Tac - Toe</h1>
    <h3 class="nes-text">How To Play</h3>
    <ol>
      <li>Player 1 Create a new game by entering the username</li>
      <li>Player 2 Enter another username and the room id that is displayed on first window.</li>
      <li>Click on join game. </li>
    </ol>
    <form class="" @submit.prevent="newGame">
    <h4>Create a new Game</h4>
    <input class="" v-model="name" type="text" name="name" id="nameNew" placeholder="Enter your name">
    <button class="nes-btn is-success" id="new">New Game</button>
    </form>

    <br><br>
    <form class="" @submit.prevent="joinGame">
      <h4>Join an existing game</h4>
      <input class="" v-model="join.name" type="text" name="name" id="nameJoin" placeholder="Enter your name">
      <input class="" v-model="join.room" type="text" name="room" id="room" placeholder="Enter Game ID">
      <button class="nes-btn is-success" id="join">Join Game</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import socket from '../config/socket'

export default {
  name: 'Home',
  data () {
    return {
      name: '',
      join: {
        name: '',
        room: ''
      },
      joinGameForm: false,
      newGameForm: false
    }
  },
  methods: {
    newGame () {
      this.$store.dispatch('newGame', this.name)
        .then(result => {
          Swal.fire(result)
          socket.emit('createGame', this.name)
          console.log(this.$store.state.player)
          this.$router.push('/board')
        })
        .catch(err => {
          Swal.fire(err)
        })
    },
    joinGame () {
      this.$store.dispatch('joinGame', this.join)
        .then(result => {
          socket.emit('joinGame', this.join)
          Swal.fire(result)
          this.$router.push('/board')
        })
        .catch(err => {
          Swal.fire(err)
        })
    }
  }
}
</script>
<style>
  *{
    list-style-type: none;
  }
  .menu{
    width: 70%;
    height: 70%;
    border-radius: 10px;
    /* background-color: lightgreen; */
    padding: 20px;
    margin: 100px auto;
  }
</style>
