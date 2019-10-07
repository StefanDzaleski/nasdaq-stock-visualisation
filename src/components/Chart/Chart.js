import React, {Component} from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HC_more from 'highcharts/highcharts-more';
import './Chart.scss';
HC_more(Highcharts);

class Chart extends Component{

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