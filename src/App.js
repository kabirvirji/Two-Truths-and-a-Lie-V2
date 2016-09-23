import React, { Component } from 'react';
import './App.css';


function get_random(list) {
  const nextIndex = Math.floor((Math.random()*list.length));
  return [list[nextIndex], list[nextIndex + 1] ? list[nextIndex + 1] : list[nextIndex - 1] ];
}

class App extends Component {

  constructor () { // initializing the state of the component 
    super();
    this.state = {
      score: 0,
      currTruths: ["I interned at a Vancouver start up last summer", "I love going to hackathons"],
      currLie: "I develop beautiful Android applications",
      message: '',
      truths: ["1", "2", "3", "4", "5"], 
      lies: ["A", "B", "C", "D"]
    } // object key value pair
  }


  onClickRight = () => {
    const nextQuestions = get_random(this.state.truths);
    const nextLie = get_random(this.state.lies)[0];
    this.setState({
      ...this.state, // Spread Operator, merges two objects
      score: this.state.score + 1,
      currTruths: nextQuestions,
      currLie: nextLie,
      lies: this.state.lies.filter((each) => nextLie !== each),
      truths: this.state.truths.filter((each) => nextQuestions[0] !== each && nextQuestions[1] !== each),
      message: ''
    });
    this.checkIfFinished();
  }

  clearMessage = () => {
    this.setState({
      ...this.state,
      message: ''
    });
  }

  checkIfFinished = () => {
    if (this.state.truths.length < 1 || this.state.lies.length === 0) {
      this.setState({
        message: 'Game Over!',
      });
    }
  }

  onClickWrong = () => {
    const nextQuestions = get_random(this.state.truths);
    const nextLie = get_random(this.state.lies)[0];
    this.setState({
      ...this.state,
      currTruths: nextQuestions,
      currLie: nextLie,
      lies: this.state.lies.filter((each) => nextLie !== each),
      truths: this.state.truths.filter((each) => nextQuestions[0] !== each && nextQuestions[1] !== each),
      message: 'Wrong Answer!'
    });
    this.checkIfFinished();
    setTimeout(this.clearMessage, 1000);
  }

  render() {
    return (
      <div className="App">
      <p>{this.state.score}</p>
      <p>{this.state.message}</p>
      {this.state.currTruths.map((each, index) => {
        return (
          <p
            onClick={this.onClickRight}
            key={index}
          >{each}</p>
        );
      })}

      <p
        onClick={this.onClickWrong}
      >{this.state.currLie}</p>

      </div>
    );
  }
}

export default App;
