import React from 'react';
import { Checkbox } from 'antd';
import './Checkboxes.css';

const checkboxes = (props) => {
    return (
        <div className="Checkboxes-wrapper">
            <Checkbox.Group options={props.lineOptions} onChange={props.lineOptionsChosen} />
        </div>
    );
}

export default checkboxes;