import React from 'react';
import ReactDOM from 'react-dom';
import Square from './Square.js'

class Board extends React.Component {
  renderSquare(i, val) {
    return (
      <Square
        value={val}
        color={this.props.squares[Math.ceil(i/this.props.size)-1]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  boardCreate(){
    console.log(this.props.squares);
    let board = [];
    let boardSize = this.props.size;
    // Outer loop to create parent
    for (let i = 1; i <= boardSize; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 1; j <= boardSize; j++) {
        if (Math.abs(this.props.squares[i-1]) == j) {

          children.push(this.renderSquare((j)+(i-1)*boardSize, true))
        }
        else {
          children.push(this.renderSquare((j)+(i-1)*boardSize, false))
        }
      }
      //Create the parent and add the children
      board.push(<div className="board-row">{children}</div>)
    }
    return board;
  }
  render() {
    return (
      <div>
        {this.boardCreate()}
      </div>
    );
  }
}

export default Board
