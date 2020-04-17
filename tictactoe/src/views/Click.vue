<template>
  <div>
      <h2>Player 1: {{count1Sock}}</h2>
      <h3>Player 2: {{count2Sock}}</h3>
      <button @click="counter1" class="btn btn-danger">Player 1</button>
      <button @click="counter2" class="btn btn-success">Player2</button>
  </div>
</template>

<script>
import socket from '../config/socket'
export default {
  name: 'Click',
  methods: {
    counter1 () {
    //   setTimeout(() => {
      this.$store.commit('counter1')
      const count1 = this.$store.state.count1Sock
      socket.emit('count1', count1)
    //   setTimeout(() => {
    //     this.$router.push('/board')
    //   }, 2000)
    //   }, 10000)
    },
    counter2 () {
      this.$store.commit('counter2')
      const count2 = this.$store.state.count2Sock
      socket.emit('count2', count2)
    //   setTimeout(() => {
    //     this.$router.push('/board')
    //   }, 2000)
    }
  },
  computed: {
    count1: {
      get () {
        return this.$store.state.count1
      }
    },
    count2: {
      get () {
        return this.$store.state.count2
      }
    },
    count1Sock: {
      get () {
        return this.$store.state.count1Sock
      }
    },
    count2Sock: {
      get () {
        return this.$store.state.count2Sock
      }
    }
  },
  created () {
    socket.on('count1', data => {
      this.$store.commit('setCount1', data)
    })
    socket.on('count2', data => {
      this.$store.commit('setCount2', data)
    })
    setTimeout(() => {
      this.$router.push('/board')
    }, 15000)
  }
}
</script>

<style>

</style>
