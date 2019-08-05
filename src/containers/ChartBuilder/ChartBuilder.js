import React, { Component } from 'react';
import { chartOptions } from '../../components/Chart/ChartOptions';
import * as Backend from './../../services/Backend';
import { getSingleLine } from '../../services/ParseData';
import Aux from '../../hoc/Aux/Aux';
import Dropdowns from '../../components/UI/Dropdowns/Dropdowns';
import Chart from './../../components/Chart/Chart';
import { TimeSeriesEnum, TimeSeriesLabel } from '../../enums/TimeSeries';
import './ChartBuilder.css';
import { Button } from 'antd';

class ChartBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartOptions: null,
            url: null,
            company: null,
            timeSeries: null,
            interval: null
        }
    }

    componentDidMount() {
    }

    companyChangedHandler = (value) => {
        this.setState({ company: value })
    }

    timeSeriesChangedHandler = (value) => {
        this.setState({ timeSeries: value })
    }

    intervalChangedHandler = (value) => {
        this.setState({ interval: value })
    }

    generateChart = () => {
        console.log('state', this.state);
        if (this.state.company === null || this.state.timeSeries === null) {
            return;
        }
        if (this.state.timeSeries !== TimeSeriesEnum.Intraday) {
            Backend.getSeriesData(this.state.company, this.state.timeSeries).then(response => {
                console.log('response', response);
                let data = response.data['Time Series (' + TimeSeriesLabel[this.state.timeSeries]+ ')'];
                console.log('data', data);
                const url = response.config.url;
                if (this.state.chartOptions === null || this.state.url !== url) {
                getSingleLine(data, '1. open').then(response => {
                    chartOptions.series[0].data = response;
                        let newOptions = chartOptions;
                        newOptions.series[0].data = response;
                        this.setState({ chartOptions: newOptions, url: url });
                    
                });
            }
            })
        } else {
            Backend.getIntradayData(this.state.company, this.state.interval).then(response => {
                let data = response.data['Time Series (' + this.state.interval + ')'];
                const url = response.config.url;
                if (this.state.chartOptions === null || this.state.url !== url) {
                getSingleLine(data, '1. open').then(response => {
                    chartOptions.series[0].data = response;
                        let newOptions = chartOptions;
                        newOptions.series[0].data = response;
                        this.setState({ chartOptions: newOptions, url: url });
                    
                });
            }
            })
        }
    }

    render() {
        return (
            <Aux>
                <Dropdowns
                    companyChanged={this.companyChangedHandler}
                    timeSeriesChanged={this.timeSeriesChangedHandler}
                    intervalChanged={this.intervalChangedHandler} />
                <div className="Generate-button-div">
                    <Button type="primary" onClick={this.generateChart}>Generate chart</Button>
                </div>
                <Chart options={this.state.chartOptions} />
            </Aux>
        );
    }
}

export default ChartBuilder;
