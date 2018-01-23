import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Footer extends React.Component {

  getFooterText (gameStatus) {
    if (gameStatus === "start")
      return "Start Game"
    if (gameStatus === "check")
      return "Play Again"
  }

  render() {
    let button = <button style={{fontFamily: 'Sans-Serif', fontSize : '36px'}} onClick={this.props.updateGameState}>{this.getFooterText(this.props.gameStatus)}</button>
    if (this.props.gameStatus === "getready")
      button = <div style={{fontFamily: 'Sans-Serif', fontSize : '36px'}}>Get ready to memorize cells in {this.props.count}</div>
    if (this.props.gameStatus === "memorize")
      button = null
    if (this.props.gameStatus === "guess")
      button = <div style={{fontFamily: 'Sans-Serif', fontSize : '36px'}}>Guess the correct cells!</div>
    if (this.props.gameStatus === "check")
      button = <button style={{fontFamily: 'Sans-Serif', fontSize : '36px'}} onClick={this.props.updateGameState}>{this.getFooterText(this.props.gameStatus)}</button>

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
      <button style={Object.assign({width: '150px', height: '150px'}, {backgroundColor: this.props.tileColor})} onClick={() => {this.props.setUserSelection(this.props.position)}}></button>
    );
  }
}

const squareObj = {
  systemSelected: false,
  userSelected: false
}

const generateTiles = () => {
  const arr = [];
  for(let i = 0; i < 12; i++) {
    arr.push(squareObj);
  }
  return arr;
}

const getColor = (tile, gameState) => {
  //if currentBoardstate is memorized AND square.systemSelected
  if (gameState === "memorize" && tile.systemSelected === true)
    return 'blue';
  else if (gameState === "guess" && tile.userSelected === true)
    return 'purple';
  //else if currentBoardstate is checkstate
  else if (gameState === "check") {
    //if square.systemSelected AND square.userSelected
    if (tile.systemSelected && tile.userSelected)
      return 'green'
    else if (tile.systemSelected && !tile.userSelected)
      return 'yellow'
    else if (!tile.systemSelected && tile.userSelected)
      return 'red'
  }
  return 'grey'
}

class Tiles extends React.Component {
  
  constructor (props) {
    super(props);
    this.state = {
      gameStatus: 'start',
      tiles: generateTiles(),
      count: 3
    }
    this.setUserTile = this.setUserTile.bind(this)
    this.newGame = this.newGame.bind(this)
    this.updateGameState = this.updateGameState.bind(this)
    this.decrementCount = this.decrementCount.bind(this)
    this.countInterval;
  }

  renderTile(i, color) {
    return <Tile position={i} setUserSelection={this.setUserTile} tileColor={color}/>;
  }

  setUserTile (position) {
    let temp = this.state.tiles;
    let tempObj = {systemSelected: temp[position].systemSelected, userSelected: true}
    temp[position] = tempObj
    this.setState({tiles: temp})
  }

  drainTheCount() {
    this.countInterval = setInterval(this.decrementCount, 1000)
  }

  decrementCount () {
    if (this.state.count === 1) {
      clearInterval(this.countInterval)
      this.updateGameState();
    } else {
      let tempCount = this.state.count;
      tempCount -= 1;
      this.setState({count: tempCount})
    }
    
  }

  peek() {
    setTimeout(() => {this.updateGameState()},2000)
  }

  updateGameState () {
    let newState = '';
    switch(this.state.gameStatus) {
      case 'start':
        newState = 'getready'
        this.newGame();
        console.log("moving to get ready")
        this.drainTheCount();
        break;
      case 'getready':
        console.log("moving to memorize")
        newState = 'memorize'
        this.peek();
        break;
      case 'memorize':
        newState = 'guess'
        console.log("moving to guess")
        this.drainTheCount();
        break;
      case 'guess':
        newState = 'check'
        console.log("Done guessing")
        break;
      case 'check':
        newState = 'getready'
        console.log("play again")
        this.newGame();
        this.drainTheCount();
        break;
      default:
        console.log("this should never happen")
        break;
    }

    this.setState({count: 3})
    this.setState({gameStatus: newState})
    
  }

  randomizeArray() {
    let randomArray = this.getRandomizedArray();
    for (let i = 0; i < randomArray.length; i++)
      this.setSystemTile(randomArray[i])
  }
  
  getRandomizedArray() {
    let randomArray = [];
    while (randomArray.length < 4) {
      var randomNumber = Math.floor(Math.random() * this.state.tiles.length);
      if (!randomArray.includes(randomNumber))
        randomArray.push(randomNumber);
    }
    return randomArray;
  }

  setSystemTile (position) {
    let temp = this.state.tiles;
    let tempObj = {systemSelected: true, userSelected: temp[position].userSelected}
    temp[position] = tempObj
    this.setState({tiles: temp})
  }
  
  newGame() {
    const newArray = generateTiles();
    //this.setState({tiles: newArray});
    this.setState({ tiles: newArray }, () => {this.randomizeArray();
    }); 
  }

  render() {
    return (
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {this.renderTile(0, getColor(this.state.tiles[0], this.state.gameStatus))}
          {this.renderTile(1, getColor(this.state.tiles[1], this.state.gameStatus))}
          {this.renderTile(2, getColor(this.state.tiles[2], this.state.gameStatus))}
          {this.renderTile(3, getColor(this.state.tiles[3], this.state.gameStatus))}
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {this.renderTile(4, getColor(this.state.tiles[4], this.state.gameStatus))}
          {this.renderTile(5, getColor(this.state.tiles[5], this.state.gameStatus))}
          {this.renderTile(6, getColor(this.state.tiles[6], this.state.gameStatus))}
          {this.renderTile(7, getColor(this.state.tiles[7], this.state.gameStatus))}
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {this.renderTile(8, getColor(this.state.tiles[8], this.state.gameStatus))}
          {this.renderTile(9, getColor(this.state.tiles[9], this.state.gameStatus))}
          {this.renderTile(10, getColor(this.state.tiles[10], this.state.gameStatus))}
          {this.renderTile(11, getColor(this.state.tiles[11], this.state.gameStatus))}
        </div>
        <br />
        <Footer count = {this.state.count} updateGameState = {this.updateGameState} gameStatus = {this.state.gameStatus}/>;
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