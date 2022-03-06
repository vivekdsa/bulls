import React, { useEffect, useState } from "react";
import './Gameboard.css'

const Gameboard = (props) => {
    let { 
        numberToGuessArray, 
        playNewGame, 
        displayMessage,
        message,
        numberToGuess 
    } = props

    const [guesses, setGuesses] = useState([[]])
    const [firstGuess, setFirstGuess ] = useState(true)
    const [currentGuess, setCurrentGuess] = useState([])
    const [numberOfGuesses, setNumberOfGuesses] = useState(0)
    const [userGuessNumber, setUserGuessNumber] = useState('')
    const [gameOver, setGameOver] = useState(false)
    const [gameWon, setGameWon] = useState(false)

    const minGuess = 1023
    const maxGuess = 9876
    const maxGuesses = 10
    
    //display message for 5 seconds
    const timeOut = 5000

    useEffect(() => {
        setFirstGuess(true)
        setGameWon(false)
    }, [])

    const digitCount = (num) => {
        if(num === 0 ) return 1
        return Math.floor(Math.log10(Math.abs(num))) + 1
      }

    const convertNumberToArray = (number) => {
        let userGuessArray = []

        if(number > 0 ){
            let digits = digitCount(number)
            //console.log('digits ', digits)
            let workNumber = number
            
            for(let i=0; i<digits; i++){
                //console.log('workNumber ', workNumber)

                if(i === digits){
                    userGuessArray[0] = workNumber % 10
                } else {
                    userGuessArray.splice(0, 0, workNumber % 10)
                }

                workNumber = Math.floor(workNumber/10)
                //console.log('userGuessArray ', userGuessArray)

                //check if the number entered is valid, otherwise show error
                for(let j=0; j<digits; j++){
                    if(i != j){
                        //no numbers must match
                        if(userGuessArray[i] === userGuessArray[j]){
                            let message = 'Invalid number - no digits can repeat. Please enter a new number'
                            setDisplayMessage(message, 'danger', timeOut)
                            setUserGuessNumber('')
                            break;
                        }
                    }
                }
            }
        }
        
        return userGuessArray
    }

    const checkUserGuess = (inputArray, attemptedGuesses ) => {
        let cows = 0;
        let bulls = 0;
        let workingArray = [...inputArray]
        //console.log('inputArray ', inputArray)

        for(let i=0; i<4; i++){
            for(let j=0; j<4; j++){    
                if(inputArray[i] === numberToGuessArray[j]){
                    if(i === j){
                        bulls++
                    } else {
                        cows++
                    }
                }
            }
        }

        workingArray.push(cows)
        workingArray.push(bulls)

        let correctGuess = false;
        let message = ''
        let type = 'primary'
        let overrideTimeOut = 0;

        if((cows === 0) && (bulls === 0)){
            if(attemptedGuesses === 1){
                message = 'Sorry, no matches found for your guess. You made 1 guess'
            } else {
                message = 'Sorry, no matches found for your guess. You made ' + attemptedGuesses + ' guesses'    
            }
        } else if(bulls === 4){
            message = 'Congratulations, you have guessed correctly. You made ' + attemptedGuesses + ' guesses'
            setGameWon(true)
            setGameOver(true)
            correctGuess = true
        } else {
            let cowsWord =  ' cows ';
            let bullsWord = ' bulls';

            if(cows === 1){
                cowsWord = ' cow '
            }

            if(bulls === 1){
                bullsWord = ' bull'
            }
            message = 'You have ' + cows + cowsWord + 'and ' + bulls +  bullsWord + '. You made ' + attemptedGuesses + ' guesses'
        }

        if(attemptedGuesses > (maxGuesses - 1) && !correctGuess){
            //you have exceeded the guess limit
            message = 'You have exceeded the max attempts. The correct number is ' + numberToGuess
            type = 'danger'
            overrideTimeOut = 10000

            setGameOver(true)
            setGameWon(false)
        }

        if(overrideTimeOut > 0){
            setDisplayMessage(message, type, overrideTimeOut)

        } else {
            setDisplayMessage(message, type, timeOut)
        }
        
        return workingArray
    }

    const handleUserGuess = (e) => {
        if(message > ' '){
            setDisplayMessage('', 'primary', 0)
        }
        
        let userGuess = e.target.value
        setUserGuessNumber(userGuess)
    
        setCurrentGuess(convertNumberToArray(userGuess))
    }

    const handleSubmitGuess = (e) => {
        e.preventDefault()

        let message = ''
        if(userGuessNumber < minGuess){
            message = `Your guess is too low. The minimum number is ${minGuess}`
            setDisplayMessage(message, 'danger', timeOut)   
        } else if(userGuessNumber > maxGuess){
            message = `Your guess is too high. The maximum number is ${maxGuess}`
            setDisplayMessage(message, 'danger', timeOut)   
        } else {
            let guessAttempt = numberOfGuesses + 1
            let userGuessArray = checkUserGuess(currentGuess, guessAttempt)
            setNumberOfGuesses(guessAttempt)
    
            let currentGuesses = guesses

            if(firstGuess){
                currentGuesses[0] = userGuessArray
            } else {
                currentGuesses.push(userGuessArray)
            }
            
            setUserGuessNumber('')
            setGuesses(currentGuesses)

            if(firstGuess){
                setFirstGuess(false)
            }
        }
    }

    const playAgain = () => {
        setGameOver(false)
        setGuesses([[]])
        setCurrentGuess([])
        playNewGame()
        setFirstGuess(true)
        setNumberOfGuesses(0)
    }

    const setDisplayMessage = (message, type, timeOut) => {
        displayMessage(message, type, timeOut)
    }

    const resign = () => {
        setGameOver(true)
        setGameWon(false)
    }

    return (
        <div className="Gameboard">
            {!gameOver &&
                <div className="card">
                    <div className="EnterGuess">
                        <label htmlFor={userGuessNumber}>   
                            Enter Your Guess
                        </label>

                        <input 
                            type="number"
                            name="userGuess"
                            placeholder="0000"
                            min={minGuess}
                            max={maxGuess}
                            value={userGuessNumber}
                            onChange={handleUserGuess}
                        />

                        <button
                            tyoe="submit"
                            onClick={handleSubmitGuess}
                        >
                            Submit your guess
                        </button>
                    </div>    
                </div>    
            }

            <div className="Spacer">  </div>

            {!firstGuess && 
                <div className="PrevGuesses">
                    <div className="Guesses">
                        Your Guesses
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th key="hdr0">Guess</th>
                                <th key="hdr1">Digit 1</th>
                                <th key="hdr2">Digit 2</th>
                                <th key="hdr3">Digit 3</th>
                                <th key="hdr4">Digit 4</th>
                                <th key="hdr5">Result</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {guesses.map((guess, idx)=> {
                                let unique = (idx+1)*10
                                return (
                                    <tr key={unique+6}>
                                        <td key={unique}> # {idx + 1}</td>
                                        <td key={unique+1}>{guess[0]}</td>
                                        <td key={unique+2}>{guess[1]}</td>
                                        <td key={unique+3}>{guess[2]}</td>
                                        <td key={unique+4}>{guess[3]}</td>
                                        <td key={unique+5}> Cows: {guess[4]}, Bulls: {guess[5]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="Spacer">  </div>
                </div>
            }

            {gameOver &&
                <>
                    {gameWon && 
                        <div className="Gamewon">
                            Congratulations !!! You Won.
                            <div>The answer is {numberToGuess}</div> 
                        </div>
                    }

                    {!gameWon && 
                        <div className="Gamelost">
                            Sorry you lost :( 
                            <div>The answer is {numberToGuess}</div> 
                            
                        </div>
                    }

                    <div className="Playagain">
                        <button
                            onClick={playAgain}
                        >
                            Play Again
                        </button>            
                    </div>
                </>
                
            }

            {!gameOver && !firstGuess && numberOfGuesses > 4 &&
                <div className="Resign">
                    <button
                        onClick={resign}
                    >
                        I Give Up
                    </button>            
                </div>
            }
        </div>
    )
}

export default Gameboard