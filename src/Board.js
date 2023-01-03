import React from "react";
import Square from "./Square";
import classnames from "classnames";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      currentPlayer: "X"
    };
  }

  // handleClick is called when a square is clicked.
  // It updates the squares and currentPlayer state.
  handleClick(index) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = this.state.currentPlayer;
    this.setState({
      squares: squares,
      currentPlayer: this.state.currentPlayer === "X" ? "O" : "X"
    });
  }

  // resetGame resets the squares and currentPlayer state to their default values.
  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      currentPlayer: "X"
    });
  }

  // renderSquare returns a single Square component.
  renderSquare(index) {
    return (
      <Square
        value={this.state.squares[index]}
        onClick={() => this.handleClick(index)}
      />
    );
  }

  render() {
    // Determine the status message based on the winner or current player.
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (this.state.squares.every((square) => square !== null)) {
      status = "Draw";
    } else {
      status = "Next player: " + this.state.currentPlayer;
    }

    return (
      <div className="board">
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button className="reset-button" onClick={() => this.resetGame()}>
          New Game
        </button>
      </div>
    );
  }
}

// calculateWinner checks if a player has won the game.
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
