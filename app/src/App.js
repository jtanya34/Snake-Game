import React from 'react';
import  Game  from './Game';
//import Board  from './components/Board';

function App() {
  return (
    <div className="App">
    <Game boardSize ={500} color={'black'} >
    </Game>
    </div>
  );
}

export default App;
