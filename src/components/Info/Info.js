import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import axios from 'axios';

const info = (props) => {

    function getCompanies() {
        console.log('Getting comapnies...');
        axios.get("http://localhost:3001/get-companies").then(response => {
            console.log('response', response);
        })
    }

    return(
        <Aux>jnkjnjk
            <button onClick={getCompanies}>
                Get companies
            </button>
        </Aux>
    );
}

export default info;