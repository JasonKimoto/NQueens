import React from 'react';
import ReactDOM from 'react-dom';
import bq from './BQ.png'
import wq from './WQ.png'


function Square(props) {
  if (props.value === false) {
    return (
      <button className="square" onClick={props.onClick}>
      </button>
    );
  }
  if (props.value === true && props.color > 0) {
    return (
      <button className="square" onClick={props.onClick}>
        <img className="queen" src={wq} alt="White Queen"/>
      </button>
    );
  }
  return (
    <button className="square" onClick={props.onClick}>
      <img className="queen" src={bq} alt="<Black Queen"/>
    </button>
  );
}

export default Square
