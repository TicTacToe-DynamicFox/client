class Game {
  constructor(roomId) {
    this.roomId = roomId;
    this.board = [];
    this.moves = 0;
  }

  // Create the Game board by attaching event listeners to the buttons.
  createGameBoard(button) {
    function tileClickHandler() {
      const row = parseInt(this.id.split('_')[1][0], 10);
      const col = parseInt(this.id.split('_')[1][1], 10);
      if (!player.getCurrentTurn() || !game) {
        alert('Its not your turn!');
        return;
      }

      // if ($(this).prop('disabled')) {
      //   alert('This tile has already been played on!');
      //   return;
      // }

      // Update board after your turn.
      game.playTurn(this);
      game.updateBoard(player.getPlayerType(), row, col, this.id);

      player.setCurrentTurn(false);
      player.updatePlaysArr(1 << ((row * 3) + col));

      game.checkWinner();
    }

    for (let i = 0; i < 3; i++) {
      this.board.push(['', '', '']);
      for (let j = 0; j < 3; j++) {
        $(`#button_${i}${j}`).on('click', tileClickHandler);
      }
    }
  }
  // Remove the menu from DOM, display the gameboard and greet the player.
  displayBoard(message) {
    $('.menu').css('display', 'none');
    $('.gameBoard').css('display', 'block');
    $('#userHello').html(message);
    this.createGameBoard();
  }
  /**
   * Update game board UI
   *
   * @param {string} type  of player(X or O)
   * @param {int} row Row in which move was played
   * @param {int} col Col in which move was played
   * @param {string} tile Id of the the that was clicked
   */
  updateBoard(type, row, col, tile) {
    $(`#${tile}`).text(type).prop('disabled', true);
    this.board[row][col] = type;
    this.moves++;
  }

  getRoomId() {
    return this.roomId;
  }

  // Send an update to the opponent to update their UI's tile
  playTurn(tile) {
    const clickedTile = $(tile).attr('id');

    // Emit an event to update other player that you've played your turn.
    socket.emit('playTurn', {
      tile: clickedTile,
      room: this.getRoomId(),
    });
  }
  /**
   *
   * To determine a win condition, each square is "tagged" from left
   * to right, top to bottom, with successive powers of 2.  Each cell
   * thus represents an individual bit in a 9-bit string, and a
   * player's squares at any given time can be represented as a
   * unique 9-bit value. A winner can thus be easily determined by
   * checking whether the player's current 9 bits have covered any
   * of the eight "three-in-a-row" combinations.
   *
   *     273                 84
   *        \               /
   *          1 |   2 |   4  = 7
   *       -----+-----+-----
   *          8 |  16 |  32  = 56
   *       -----+-----+-----
   *         64 | 128 | 256  = 448
   *       =================
   *         73   146   292
   *
   *  We have these numbers in the Player.wins array and for the current
   *  player, we've stored this information in playsArr.
   */
  checkWinner() {
    const currentPlayerPositions = player.getPlaysArr();

    Player.wins.forEach((winningPosition) => {
      if ((winningPosition & currentPlayerPositions) === winningPosition) {
        game.announceWinner();
      }
    });

    const tieMessage = 'Game Tied :(';
    if (this.checkTie()) {
      socket.emit('gameEnded', {
        room: this.getRoomId(),
        message: tieMessage,
      });
      alert(tieMessage);
    }
  }

  checkTie() {
    return this.moves >= 9;
  }

  // Announce the winner if the current client has won.
  // Broadcast this on the room to let the opponent know.
  announceWinner() {
    const message = `${player.getPlayerName()} wins!`;
    socket.emit('gameEnded', {
      room: this.getRoomId(),
      message,
    });
    alert(message);
  }

  // End the game if the other player won.
  endGame(message) {
    alert(message);
  }
}

module.exports = Game