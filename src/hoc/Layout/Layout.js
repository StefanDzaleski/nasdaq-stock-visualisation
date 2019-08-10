import React from 'react';

import Aux from '../Aux/Aux';
import ChartBuilder from '../../containers/ChartBuilder/ChartBuilder';
import { Route } from 'react-router-dom';

const layout = (props) => {

    return (
        <Aux>
            <ChartBuilder />
        </Aux>
    );
}

export default layout;