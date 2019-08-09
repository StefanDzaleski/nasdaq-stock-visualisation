import React, { Component } from 'react';
import { chartOptions } from '../../components/Chart/ChartOptions';
import * as Backend from './../../services/Backend';
import Aux from '../../hoc/Aux/Aux';
import Chart from './../../components/Chart/Chart';
import './ChartBuilder.css';
import { Button } from 'antd';
import FormWrapper from '../../components/FormWrapper/FormWrapper';

const lineOptions = [
    { label: 'Open', value: '1. open' },
    { label: 'High', value: '2. high' },
    { label: 'Low', value: '3. low' },
    { label: 'Close', value: '4. close' },
    { label: 'Volume', value: '5. volume' }
];

class ChartBuilder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartOptions: null,
            url: null,
            singleCompany: false,
            multipleCompanies: false,
            singleLine: false,
            multiLine: false,
            company: null,
            companies: null,
            timeSeries: null,
            interval: null,
            lineOption: null,
            lineOptions: null,
            generatingChart: false
        }
    }

    componentDidMount() {
    }

    // shouldComponentUpdate(nextProps, nextState) {
    // }

    companyLineNumberHandler = (type) => {
        this.setState({ [type]: true });
    }

    companyChangedHandler = (value) => {
        this.setState({ company: value });
    }

    timeSeriesChangedHandler = (value) => {
        this.setState({ timeSeries: value });
    }

    intervalChangedHandler = (value) => {
        this.setState({ interval: value });
    }

    lineOptionsChosen = (values) => {
        console.log('values', values);
        this.setState({
            lineOptions: values
        });
    }

    lineOptionChosen = (event) => {
        this.setState({
            lineOption: event.target.value
        });
    }

    multipleComapniesChangedHandler = (values) => {
        this.setState({
            companies: values
        });
    }

    generateChart = () => {
        console.log('state', this.state);
        this.setState({
            generatingChart: true
        });
        if ((this.state.company === null && this.state.companies === null) || this.state.timeSeries === null) {
            return;
        }

        if (this.state.singleCompany) {
            Backend.getSingleCompanyData(this.state.company, this.state.interval, this.state.timeSeries, this.state.lineOption ? this.state.lineOption : this.state.lineOptions)
                .then(response => {
                    let newOptions = { ...chartOptions };
                    let series = [];
                    for (let i = 0; i < response.length; i++) {
                        let lineData =
                        {
                            name: 'Test series ' + i,
                            data: response[i],
                            tooltip: {
                                valueDecimals: 2
                            }
                        }
                        series.push(lineData);
                    }
                    newOptions.series = series;
                    this.setState({ chartOptions: newOptions });
                });
        } else {
            Backend.getMultiCompanyData(this.state.companies, this.state.interval, this.state.timeSeries, this.state.lineOption).then(response => {
                let newOptions = { ...chartOptions };
                let series = [];
                for (let i = 0; i < response.length; i++) {
                    let lineData =
                    {
                        name: 'Test series ' + i,
                        data: response[i],
                        tooltip: {
                            valueDecimals: 2
                        }
                    }
                    series.push(lineData);
                }
                newOptions.series = series;
                this.setState({ chartOptions: newOptions });
            })
        }
    }

    render() {
        return (
            <Aux>
                <FormWrapper
                    companyChanged={this.companyChangedHandler}
                    timeSeriesChanged={this.timeSeriesChangedHandler}
                    intervalChanged={this.intervalChangedHandler}
                    singleCompany={this.state.singleCompany}
                    multipleCompanies={this.state.multipleCompanies}
                    singleLine={this.state.singleLine}
                    multiLine={this.state.multiLine}
                    companyLineNumber={this.companyLineNumberHandler}
                    timeSeries={this.state.timeSeries}
                    lineOptions={lineOptions}
                    lineOptionChosen={this.lineOptionChosen}
                    lineOptionsChosen={this.lineOptionsChosen}
                    multipleCompaniesChanged={this.multipleComapniesChangedHandler}
                    generatingChart={this.state.generatingChart}
                />
                <div className="Generate-button-div">
                    <Button type="primary" onClick={this.generateChart}>Generate chart</Button>
                </div>
                <Chart
                    options={this.state.chartOptions}
                    url={this.state.url}
                />
            </Aux>
        );
    }
}

export default ChartBuilder;
