import React from 'react';
import './ChosenValue.css';

const chosenValue = (props) => {
    return(
        <div className="Chosen-value-wrapper">
            {props.children}
        </div>
    );
}

export default chosenValue;