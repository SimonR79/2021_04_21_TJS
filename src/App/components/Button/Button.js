import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button(props){
    console.log(props);
    return <div onClick={()=>{props.onclickbutton('dfgfd')}} className="Button" style={{backgroundColor:props.bgColor,...props.style}}>{props.title}</div>
}

Button.propTypes={
    title:PropTypes.string.isRequired,
    bgColor:PropTypes.string,
    onclickbutton:PropTypes.func.isRequired
}

Button.defaultProps={
    bgColor:'green',
    onclickbutton:()=>{console.log('perdu')}
}
export default Button;