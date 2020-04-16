import Vue from 'vue'
import Vuex from 'vuex'
import Player from './player.js'
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
    }
  },
  actions: {
    // start game
    newGame: function (context, payload) {
      const name = payload.name
      return new Promise((resolve, reject) => {
        if (!name) {
          const msg = 'Please enter your name.'
          return reject(msg)
        } else {
          const msg = name + 'success created'
          socket.emit('createGame', { name })
          context.commit('SET_PLAYER', new Player(name, this.p1))
          return resolve(msg)
        }
      })
    }
    // join another game
  },
  modules: {
  }
})
