import React from 'react';
import  Game  from './Game';
//import Board  from './components/Board';

function GameOver(playerScore) {
  return (
    <Modal.Dialog>
        <Modal.Header closeButton>
            <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>Player Score: {playerScore}</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={this.resetGame}>Restart</Button>
            <Button variant="primary">Close</Button>
        </Modal.Footer>
    </Modal.Dialog>
  );
}

export default GameOver;