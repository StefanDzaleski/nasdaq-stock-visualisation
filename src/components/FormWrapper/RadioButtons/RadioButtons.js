import React from 'react';
import { Radio } from 'antd';
import './RadioButtons.scss'

const radioButtons = (props) => {
    return (
        <div className="Radio-buttons-wrapper">
            <Radio.Group options={props.lineOptions} onChange={props.lineOptionChosen} />
        </div>
    );
}

export default radioButtons;