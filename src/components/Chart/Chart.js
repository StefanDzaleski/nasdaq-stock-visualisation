import React, {Component} from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import './Chart.scss';

class Chart extends Component{

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.url !== this.props.url) {
    //         return true;
    //     }
    //     return false;
    // }

    render() {    
        return (
            <HighchartsReact
            highcharts={Highcharts}
            options={this.props.options}
            constructorType = { 'stockChart' }
            />
            );
        }
}

export default Chart;