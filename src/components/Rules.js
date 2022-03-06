import React from "react";

import './Rules.css';

const Rules = (props) => {
    let { clickRules } = props

    const closeRules = () => {
        clickRules() 
    }
 
    return(
        <div className="Rules" onClick={closeRules}>
            <div className="Rulescontent">
            <div className="RulesHeader">
                <h1> Game Rules</h1>
            </div>
            <div className="Clickme">
                Click anywhere to Close ...
            </div>
            <div className="Section">
                <p>
                    The objective of the Game is to guess the correct number
                    within 10 tries
                </p>
                <div>
                    The computer will set a number for you to guess. 
                    Let us call this the Answer
                </div>
                <div>
                    It will be a 4 digit number with no repeating digits
                    between 1023 and 9876
                </div>
            </div>

            <div className="Section">
                <div>
                    1. Start by guessing a 4 digit number with no repeating digits
                </div>
                <div>
                    2. If any digit in your guess matches the Answer, you score either
                    a Cow or a Bull
                </div>
                <div>
                    3. If the matching number is in the same position as the number 
                    in the Answer, you score a Bull; otherwise you score a Cow
                </div>
            </div>

            <div className="Section">
                <div>
                    Example: 
                </div>
                <div>
                    1. The computer picks 2468.
                </div>
                <div>
                    2. If you guess 5183, you score 1 Cow since
                    #8 is matching, but in the wrong position.
                </div>
                <div>
                    3. However if you guess 5163, you score 1 Bull 
                    since #6 is present and in the right position.
                </div>
                <div>
                    4. Now if you guess 2678, you score 2 Bulls 
                    and 1 Cow since 3 numbers are matching, 2 of which 
                    are in the right position.
                </div>
                <div>
                    5. Once you score 4 Bulls, you win the game
                </div> 
            </div>
            </div>
            

        </div>
    )
}

export default Rules