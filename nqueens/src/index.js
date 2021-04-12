import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board.js'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(this.props.size).fill(0)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const row = Math.ceil(i/this.props.size)-1;
    const colm = i%this.props.size==0 ? this.props.size : i%this.props.size;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[row] || !(validMove(squares,row,colm))) {
      return;
    }
    squares[row] = this.state.xIsNext ? colm : -1*colm;
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "White" : "Black");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            size={this.props.size}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
const boardSize = 5
ReactDOM.render(<Game size={boardSize}/>, document.getElementById("root"));

function calculateWinner(squares) {
  /*
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
  */
  return null;
}

function validMove(squares,row,column){
  for(let i = 0; i < squares.length; i++){
    if(i!=row){
      if(Math.abs(squares[i])==column ||
        (Math.abs(squares[i])==column+(i-row) && column+(i-row) != 0) ||
        (Math.abs(squares[i])==column+(i-row) && column+(i-row) != 0) ||
        (Math.abs(squares[i])==column-(i-row) && column-(i-row) != 0) ||
        (Math.abs(squares[i])==column-(i-row) && column-(i-row) != 0)
        ) {
        console.log("invalid move");
        return false;
      }
    }
  }
  return true;
}
