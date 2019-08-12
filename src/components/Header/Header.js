import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const header = (props) => {
    return (
        <div className="Header-wrapper">
            <div className="Header-info">
                NASDAQ Stock Visualisation
            </div>
            <div className="Header-buttons-wrapper">
                <Link to="/"><div className="Header-button">Chart Generator</div></Link>
                <Link to="/nasdaq-info"><div className="Header-button Coral">NASDAQ Info</div></Link>
            </div>
        </div>
    );
}

export default header;