<template>
  <div class="menu">
    <h1>Tic - Tac - Toe</h1>
    <h3>How To Play</h3>
    <ol>
      <li>Player 1 Create a new game by entering the username</li>
      <li>Player 2 Enter another username and the room id that is displayed on first window.</li>
      <li>Click on join game. </li>
    </ol>
    <h4>Create a new Game</h4>
    <form @submit.prevent="newGame">
    <input v-model="name" type="text" name="name" id="nameNew" placeholder="Enter your name">
    <button id="new">New Game</button>
    </form>

    <br><br>
    <h4>Join an existing game</h4>
    <form action="">
      <input type="text" name="name" id="nameJoin" placeholder="Enter your name" required>
      <input type="text" name="room" id="room" placeholder="Enter Game ID" required>
      <button id="join">Join Game</button>
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
      name: ''
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
    }
    // existingGame () {
    //   this.$store.dispatch('newGame', this.name)
    //     .then(result => {
    //       Swal.fire(result)
    //       this.$router.push('/board')
    //     })
    //     .catch(err => {
    //       Swal.fire(err)
    //     })
    // }
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
    background-color: lightgreen;
    padding: 20px;
    margin: 100px auto;
  }
</style>
