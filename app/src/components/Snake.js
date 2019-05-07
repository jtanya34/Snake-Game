import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { UP, DOWN, LEFT, RIGHT } from '../helpers/constants';

class Snake extends Component{
    handleKeyDown = (e) => {
        let newDirection;
        
        switch(e.keyCode) {
            case 37:
                newDirection = { top: 0, left: -1 , dir: LEFT};
                break;
            case 38:
                newDirection = { top: -1, left: 0 , dir: UP};
                break;
            case 39:
                newDirection = { top: 0, left: 1, dir: RIGHT};
                break;
            case 40:
                newDirection = { top: 1, left: 0, dir: DOWN };
                break;
            default:
                return;
        }

        this.props.handleSnakePositions(newDirection);
    }
    
        render(){
            const {  info: { top, left,color }} = this.props;
        return (
           
            <Square 
           position={{ top, left,color }} />
        );
    }
    componentDidMount() {
        window.onkeydown = this.handleKeyDown;
    }
}


Snake.propTypes = {
  
    info: PropTypes.shape({
        top: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
      
    })
};


export default Snake;
