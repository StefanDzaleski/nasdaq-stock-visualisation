import React, {Component} from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

class Chart extends Component{

    shouldComponentUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options)) {
            return true;
        }
        return false;
    }
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