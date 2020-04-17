import Vue from 'vue'
import Vuex from 'vuex'
import Player from './player.js'
// import Game from './board.js'
import io from 'socket.io-client'
const socket = io.connect('https://quiet-thicket-58379.herokuapp.com/')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    P1: 'X',
    P2: 'O',
    player: null,
    game: null,
    name: '',
    type: '',
    currentTurn: true,
    playsArr: 0,
    count1: 0,
    count2: 0,
    count1Sock: 0,
    count2Sock: 0
  },
  mutations: {
    SET_PLAYER: function (state, payload) {
      state.player = payload
      console.log(state.player)
    },
    SET_GAME: function (state, payload) {
      // state.game = new Game(payload)
    },
    SET_CURRENT_TURN (state, payload) {
      state.currentTurn = payload
    },
    counter1 (state, count1) {
      state.count1Sock++
    },
    counter2 (state, count2) {
      state.count2Sock++
    },
    setCount1 (state, count1) {
      state.count1Sock = count1
    },
    setCount2 (state, count2) {
      state.count2Sock = count2
    }
  },
  actions: {
    // start game
    newGame: function (context, payload) {
      const name = payload
      return new Promise((resolve, reject) => {
        if (!name) {
          const msg = 'Please enter your name.'
          return reject(msg)
        } else {
          const msg = name + ' success created'
          socket.emit('createGame', name)
          context.commit('SET_PLAYER', new Player(name, this.state.P1))
          return resolve(msg)
        }
      })
    },
    // join another game
    joinGame: function (context, payload) {
      return new Promise((resolve, reject) => {
        const name = payload.name
        const room = payload.room
        if (!name || !room) {
          const msg = 'Please enter your name and Room id'
          return reject(msg)
        } else {
          const msg = `Wellcome ${name}`
          context.commit('SET_PLAYER', new Player(name, this.state.P2))
          return resolve(msg)
        }
      })
    }
  },
  modules: {
  }
})
