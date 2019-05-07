import React from 'react';

const style=({position})=>{

    return {
        width: 10+'px',
        height: 10+'px',
        backgroundColor: position.color,
        position: 'absolute',
        top: position.top + 'px',
        left: position.left + 'px',
        transition: 'all 0.1s ease',
    };
};

export default (props)=><div style={style(props)}/>
