const $ = require('jquery')
const io = require('socket.io-client')
const socket = io.connect('http://localhost:3000')
class Game {
  constructor (roomId, player, game) {
    this.roomId = roomId
    this.board = []
    this.moves = 0
    this.player = player
    this.game = game
  }

  createGameBoard () {
    function tileClickHandler () {
      const row = parseInt(this.id.split('_')[1][0], 10)
      const col = parseInt(this.id.split('_')[1][1], 10)
      if (!this.player.getCurrentTurn() || !this.game) {
        alert('Its not your turn!')
        return
      }
      if ($(this).prop('disabled')) {
        alert('This tile has already been played on!')
        return
      }
      this.game.playTurn(this)
      this.game.updateBoard(this.player.getPlayerType(), row, col, this.id)

      this.player.setCurrentTurn(false)
      this.player.updatePlaysArr(1 << ((row * 3) + col))

      this.game.checkWinner()
    }

    for (let i = 0; i < 3; i++) {
      this.board.push(['', '', ''])
      for (let j = 0; j < 3; j++) {
        $(`#button_${i}${j}`).on('click', tileClickHandler)
      }
    }
  }

  displayBoard (message) {
    $('.gameBoard').css('display', 'block')
    $('#userHello').html(message)
    this.createGameBoard()
  }

  updateBoard (type, row, col, tile) {
    $(`#${tile}`).text(type).prop('disabled', true)
    this.board[row][col] = type
    this.moves++
  }

  getRoomId () {
    return this.roomId
  }

  playTurn (tile) {
    const clickedTile = $(tile).attr('id')
    socket.emit('playTurn', {
      tile: clickedTile,
      room: this.getRoomId()
    })
  }

  checkWinner () {
    const currentPlayerPositions = this.player.getPlaysArr()

    this.Player.wins.forEach((winningPosition) => {
      if ((winningPosition & currentPlayerPositions) === winningPosition) {
        this.game.announceWinner()
      }
    })

    const tieMessage = 'Game Tied :('
    if (this.checkTie()) {
      socket.emit('gameEnded', {
        room: this.getRoomId(),
        message: tieMessage
      })
      alert(tieMessage)
    }
  }

  checkTie () {
    return this.moves >= 9
  }

  announceWinner () {
    const message = this.player.getPlayerName() + 'wins!'
    socket.emit('gameEnded', {
      room: this.getRoomId(),
      message
    })
    alert(message)
  }

  endGame (message) {
    alert(message)
  }
}

module.exports = Game
