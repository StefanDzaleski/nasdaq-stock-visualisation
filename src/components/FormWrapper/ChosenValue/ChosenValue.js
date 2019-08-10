import React from 'react';
import './ChosenValue.scss';

const chosenValue = (props) => {
    return(
        <div className="Chosen-value-wrapper">
            {props.children}
        </div>
    );
}

export default chosenValue;