import './App.css';
import { useState } from 'react';
function Display(props){
  return (
  <h1>result : {props.msg}</h1>
    );
}
function Button(props) {	
	return <button onClick={() => props.clickFunc(props.increment)}>+{props.increment}</button>;
}
function App() {
  const [counter, setCounter] = useState(5);
  const clickHandler = (incrementCount) => setCounter(counter+incrementCount);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src="Octocat.png" className="App-logo" alt="logo" />
        <p>
          GitHub Codespaces <span className="heart">♥️</span> React
        </p>
        <div> */}
       <header>Click on button values to get the summed up result</header><br></br>
       <Button clickFunc={clickHandler} increment = {1}/>
       <Button clickFunc={clickHandler}  increment = {5}/>
       <Button clickFunc={clickHandler}  increment = {10}/>
       <Button clickFunc={clickHandler}  increment = {100}/>
       <Display msg= {counter}/>
    {/* </div>
        <p className="small">
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </header>*/}
    </div> 
  );
}

export default App;
