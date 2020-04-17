<template>
  <div class="menu nes-text">
    <h1 class="nes-text">Click it and win!</h1>
  <Click/>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import socket from '../config/socket'
import Click from '../views/Click'

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
  components: {
    Click
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
