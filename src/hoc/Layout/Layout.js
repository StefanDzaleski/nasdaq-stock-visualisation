import React from 'react';

import Aux from '../Aux/Aux';
import Chart from '../../components/Chart/Chart';
import { chartOptions } from '../../components/Chart/ChartOptions';
import ChartBuilder from '../../containers/ChartBuilder/ChartBuilder';

const layout = (props) => {

    const options = {

    }

    return (
        <Aux>
            <ChartBuilder />
        </Aux>
    );
}

export default layout;