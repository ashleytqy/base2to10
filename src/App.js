import React, { Component } from 'react';
import './App.css';

class Display extends Component {
  constructor() {
    super();
    this.state = {
      bits: [0, 0, 0, 0, 0, 0, 0, 0],
      total: 0,
      sizes: [4, 8, 12, 16],
      currentSize: 8
    }

    this.calculateTotal = this.calculateTotal.bind(this);
  }

  calculateTotal(array) {
    let num = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 1) {
        num += Math.pow(2, array.length - i - 1);
      }
    }
    return num;
  }

  handleClick(i) {
    const copy = this.state.bits.slice();
    //this increments bits at the right index
    copy[i] = (copy[i] === 1) ? 0 : 1;
    this.setState({bits: copy, total: this.calculateTotal(copy)});
  }

  chooseSize(i) {
    let newBits = [];
    for (let x = 0; x < i; x++) {
      newBits.push(0);
    }
    this.setState({currentSize: i, bits: newBits, total: 0});
  }

  render() {
    const clickers = this.state.bits.map((count, i) => {
      return <Bit key={i} clickHandler={this.handleClick.bind(this, i)} bit={this.state.bits[i]}/>;
    });

    let sizes = [];
    for (let i = 0; i < this.state.currentSize; i++) {
      const val = this.state.sizes[i];
      sizes.push(<Size key={i} clickHandler={this.chooseSize.bind(this, val)} size={val}/>);
    };

    return (
      <div className="binary">
        <h1 className="title">Binary to Decimal Calculator</h1>
        <h2 className="words">how many # of bits would you like to experiment with?</h2>
        {sizes}
        <h2 className="words">(click to switch the bits on and off)</h2>
        <div className="bits">
        {clickers}
        </div>
        <div className="words total">in base 10, this is {this.state.total} </div>
      </div>
    )
  }
}

class Size extends Component {
 render() {
    return (
      <div className="bit" onClick={this.props.clickHandler}>{this.props.size}</div>
    )
  } 
}

class Bit extends Component {
  render() {
    return (
      <div className="bit" onClick={this.props.clickHandler}>{this.props.bit}</div>
    )
  }
}

export default Display;
