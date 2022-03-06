import React, { useEffect, useState } from 'react';

import Alert from 'react-bootstrap/Alert';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Gameboard from './components/Gameboard';
import Rules from './components/Rules';

function App() {  
  const [numberToGuess, setNumberToGuess] = useState(0)
  const [numberToGuessArray, setNumberToGuessArray] = useState([])
  const [newGame, setNewGame] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [messageTimeoutId, setMessageTimeoutId] = useState()
  const [gameState, setGameState] = useState('')
  const [showRules, setShowRules] = useState(false)

  const numberOfDigits = 4 //number will be 4 digits long

  useEffect(() => {
    //generate a random number on entry using the guess array
    //number cannot start with 0 or repeat
    if(newGame){
      let guessArray = [0,1,2,3,4,5,6,7,8,9]
      let randomArray = []  
      let pickedDigit = 0;

      for (let i=0; i<numberOfDigits; i++){
        if(i === 0){
          //for the first digit, we must exclude 0
          pickedDigit = Math.floor((Math.random() * 9) + 1)
          randomArray[0] = pickedDigit  
        } else {
          //i > 0
          //as i increases, we reduce the guessArray and also the numbers that can be picked
          pickedDigit = Math.floor((Math.random() * (10 - i)))
          randomArray.push(guessArray[pickedDigit])  
        }

        guessArray.splice((pickedDigit), 1)

        //console.log('guess Array ', guessArray)
        //console.log('random Array ', randomArray)
      }

      let randomNumber = randomArray[0] * 1000 + randomArray[1] * 100 + randomArray[2] * 10 + randomArray[3]
      
      setNumberToGuessArray(randomArray)
      setNumberToGuess(randomNumber)
    }
    
    setNewGame(false)
    displayMessage('Computer has picked a number. Try to guess it', 'primary', 5000)
  }, [newGame])

  const playNewGame = () => {
    setNewGame(true)
  }

  const displayMessage = (message, type, timeOut) => {
    clearTimeout(messageTimeoutId)
    setMessage(message)
    setMessageType(type)
    
    if(message > ' '){
      window.scroll(0,0)
    }
    
    if (timeOut > 0) {
      const messageTimeoutId = setTimeout(() => {
        setMessage('')
      }, timeOut)
      setMessageTimeoutId(messageTimeoutId)
    }
  }

  const handleShowRules = () => {
    setShowRules(true)
  }

  const handleClickRules = () => {
    setShowRules(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        Cows and Bulls
      </header>
      
      <div className="NotificationArea">
        {message &&
            <Alert variant={messageType} onClose={() => setMessage('')} dismissible>
              <div>
                  <h5>{message}</h5>
              </div>
            </Alert>
        } 
      </div>

      <Gameboard 
        numberToGuessArray={numberToGuessArray}
        playNewGame={playNewGame}
        displayMessage={displayMessage}
        message={message}
        numberToGuess={numberToGuess}
      />

      {!showRules &&
        <div className="ButtonSection">
          <button
            onClick={handleShowRules}
          >
            Show Rules
          </button>  
        </div>  
      }
      
      {showRules && 
        <Rules
          clickRules={handleClickRules}
        />
      }

      <div className="subtitle">
        The good ol' game of cows and bulls
      </div>
    </div>
  );
}

export default App;
