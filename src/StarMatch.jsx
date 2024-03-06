import React, { useEffect } from 'react';
import './StarMatch.css';
import { useState } from 'react';

// GAME - Starting Template
const Game = (props) => {
  const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState([1,2,3,4,5,6,7,8,9]);
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);
    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    // const gameIsWon = availableNums.length === 0;
    // const gameIsLost = secondsLeft === 0;
    const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';
    const numberStatus = (number) => {
      if(!availableNums.includes(number)){
        return 'used';
      }
      if(candidateNums.includes(number)){
        return candidatesAreWrong ? 'wrong' : 'candidate';
      }
      return 'available';
    }
    const onNumberClick = (number, currentStatus) => {
        if(gameStatus != 'active' || currentStatus == 'used'){
          return;
        }
        const newCandidateNums = currentStatus == 'available' ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number);
        if(utils.sum(newCandidateNums) !== stars){
          setCandidateNums(newCandidateNums);
        }
        else{
          const newAvailableNums = availableNums.filter(n => !newCandidateNums.includes(n));
          //redraw available stars that are playable
          setStars(utils.randomSumIn(newAvailableNums,9));
          setAvailableNums(newAvailableNums);
          setCandidateNums([]);
        }
    }
    // when using side effects, clear them after every state change
    useEffect(() => {
      if(secondsLeft > 0 && availableNums.length > 0){
        const timerId = setTimeout(() => {
          setSecondsLeft(secondsLeft - 1);
        },1000);
        return() => {clearTimeout(timerId)}
      }
    })
    const resetGame = () => {
      setStars(utils.random(1, 9));
      setAvailableNums([1,2,3,4,5,6,7,8,9]);
      setCandidateNums([]);
      setSecondsLeft(10);
    }
    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left"> {/* Try to use map,reduce instead of for,while for looping */}
            {gameStatus != 'active' ? <PlayAgain playAgain={props.startNewGame} gameStatus={gameStatus}/> :  <StarsDisplay stars={stars}/>} 
          </div>
          <div className="right">
            {utils.range(1,9).map(number => 
                <PlayNumber key={number} number={number} onClick={onNumberClick} status={numberStatus(number)}/>
            )}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
  };
// Unmounting the game component and remounting it after clickng on play again for reset. Used for resetting the entire component including side effects
const StarMatch = () => {
    const [gameId, setGameId] = useState(1);
    return (
      <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>
    )
}
const PlayAgain = (props) => {
  return (
    <div> 
      <div style={{ color : props.gameStatus == 'lost' ? 'red' : 'green',  fontSize : '30px'}} >
        {props.gameStatus == 'lost' ? 'Game Over' : 'Well Done'}
      </div>
      <button onClick={props.playAgain}>Play Again</button>
    </div>
  );
}
const StarsDisplay = (props) => (
  <>
    {utils.range(1,props.stars).map(starId => 
        <div key={starId} className="star" />
    )}
  </>
 );
const PlayNumber = (props) => (
   <button className="number" style={{ backgroundColor : colors[props.status]}} onClick={() => props.onClick(props.number,props.status)}>
    {props.number}
   </button>
);
// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };
// Math science
const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
  
    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
  
    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
  
    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = utils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[utils.random(0, sums.length - 1)];
    },
  };
  

  export default StarMatch;