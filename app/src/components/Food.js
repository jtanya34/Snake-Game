import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

class Food extends Component {
    componentDidUpdate() {
        const { size,position, food: { top, left }} = this.props;
        if ( position.left < (left + size) && 
        position.top  < (top + size)  &&
       (position.left + size) > left &&
       (position.top  + size) > top) {
           
       this.props.onCollide()
   }
    }

    render(){
        const {  food: { top, left,color }} = this.props;
    return (
       
        <Square 
       position={{ top, left ,color}} />
    );
}
}

Food.propTypes={
    food:PropTypes.shape({
        top:PropTypes.number.isRequired,
        left:PropTypes.number.isRequired,
        color:PropTypes.string.isRequired,
    })
}

export default Food;