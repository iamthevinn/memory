import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Footer extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      count: 3
    }
  }

  getFooterText (gameStatus) {
    if (gameStatus === "start")
      return "Start Game"
  }

  render() {
    let button = <button style={{fontFamily: 'Sans-Serif', fontSize : '36px'}} onClick={this.props.updateGameState}>{this.getFooterText(this.props.gameStatus)}</button>
    if (this.props.gameStatus === "getready")
      button = <div style={{fontFamily: 'Sans-Serif', fontSize : '36px'}}>Game will start in {this.state.count}</div>
    return (
      <div style={{display: 'flex', aligItems: 'center', justifyContent: 'center'}}>
        {button}
      </div>
    );
  }
}

class Tile extends React.Component {
  render() {
    return (
      <button style={{width: '150px', height: '150px'}} onClick={() => {this.props.setValue(this.props.position)}}></button>
    );
  }
}

let squareObj = {
  systemSelected: false,
  userSelected: false
}


const generateSquares = () => {
  const arr = [];
  for(let i = 0; i < 12; i++) {
    arr.push(squareObj);
  }
  return arr;
}

const getColor = (tile, gameStatus) => {
  
}

class Tiles extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      gameStatus: 'start',
      tiles: generateSquares()
    }
    this.setUserTile = this.setUserTile.bind(this)
    this.newGame = this.newGame.bind(this)
    this.updateGameState = this.updateGameState.bind(this)
  }

  renderTile(i) {
    return <Tile position={i} setValue={this.setUserTile}/>;
  }

  setUserTile (position) {
    let temp = this.state.tiles;
    let tempObj = {systemSelected: temp[position].systemSelected, userClicked: true}
    temp[position] = tempObj
    this.setState({tiles: temp})
  }

  updateGameState () {
    let newState = '';
    switch(this.state.gameStatus) {
      case 'start':
        newState = 'getready'
        this.newGame();
        console.log("in starting case")
        break;
      case 'getready':
        newState = 'memorize'
        break;
      case 'memorize':
        newState = 'guess'
        break;
      case 'guess':
        newState = 'check'
        break;
      case 'check':
        newState = 'getready'
        break;
      default:
        console.log("this should never happen")
        break;
    }

    this.setState({gameStatus: newState})
    
  }

  updateTile() {

  }

  randomizeArray() {
    let randomArray = this.getRandomizedArray();
    for (let i = 0; i < randomArray.length; i++)
      this.setSystemTile(i)
  }

  getRandomizedArray() {
    let randomArray = [];

    while (randomArray.length < 4) {
      var randomNumber = Math.floor(Math.random() * randomArray.length);
      if (!randomArray.includes(randomNumber))
        randomArray.push(randomNumber);
    }
    return randomArray;
  }

  setSystemTile (position) {
    let temp = this.state.tiles;
    let tempObj = {systemSelected: true, userClicked: temp[position].userSelected}
    temp[position] = tempObj
    this.setState({tiles: temp})
  }
  
  newGame() {
    generateSquares();
    this.randomizeArray();
  }

  setFooterText() {
    
  }
  
  render() {
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {this.renderTile(0)}
          {this.renderTile(1)}
          {this.renderTile(2)}
          {this.renderTile(3)}
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {this.renderTile(4)}
          {this.renderTile(5)}
          {this.renderTile(6)}
          {this.renderTile(7)}
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {this.renderTile(8)}
          {this.renderTile(9)}
          {this.renderTile(10)}
          {this.renderTile(11)}
        </div>
        <br />
        <Footer updateGameState = {this.updateGameState} gameStatus = {this.state.gameStatus}/>;
      </div>
    );
  }
}



class App extends React.Component {

  render() {
    return (
      <div className="game">
        <h1 style={{textAlign: 'center', fontFamily: 'Sans-Serif'}}>Memory Game</h1>
        <div>
          <Tiles />
        </div>
      </div>
    );
  }
}

export default App;