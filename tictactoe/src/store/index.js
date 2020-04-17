import Vue from 'vue'
import Vuex from 'vuex'
import Player from './player.js'
<<<<<<< HEAD
=======
// import Game from './board.js'
>>>>>>> 65780127303d3d9aed505b3db43b09dce5ed3f77
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    P1: 'X',
    P2: 'O',
    player: null,
    game: null
  },
  mutations: {
    SET_PLAYER: function (state, payload) {
      state.player = payload
      console.log(state.player)
    },
    SET_GAME: function (state, payload) {
<<<<<<< HEAD
      state.game = payload
=======
      state.player = payload
>>>>>>> 65780127303d3d9aed505b3db43b09dce5ed3f77
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
