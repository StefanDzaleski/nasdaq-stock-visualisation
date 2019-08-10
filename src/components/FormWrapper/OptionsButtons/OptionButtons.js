import React from 'react';
import './OptionButtons.scss';
import Aux from '../../../hoc/Aux/Aux';
import QueueAnim from 'rc-queue-anim';
import ChosenValue from '../ChosenValue/ChosenValue';

const optionButtons = (props) => {

    const buttons = (
        props.showButtons ?
            null :
            <div className="Option-buttons-wrapper" key="firstKey">
                {props.values.map(value => {
                    return (
                            <div className="Custom-button" key={value.textValue} onClick={() => props.click(value.clickValue)}>
                                {value.textValue}
                                <div className="Button-line"></div>
                            </div>
                    );
                })}
            </div>
    );

    const placeholder = (
        props.showButtons ?
            <ChosenValue key="secondKey">
                {props.firstValueTrue ? props.values[0].textValue : props.values[1].textValue}
            </ChosenValue> :
            null
    );

    return (
        <Aux>
            <QueueAnim
                className="fade-out-content"
                key="fade-out-key"
                type={['right', 'left']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                duration={1000}>
                {
                    buttons
                }
            </QueueAnim>
            <QueueAnim className="fade-in-content"
                key="fade-in-key"
                type={['right', 'left']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                delay={1000}
                duration={1000}>
                {
                    placeholder
                }
            </QueueAnim>
        </Aux>
    );
}

export default optionButtons;