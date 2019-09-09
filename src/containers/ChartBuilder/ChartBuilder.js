import React, { Component } from 'react';
import { lineChartOptions, stockChartOptions } from '../../components/Chart/ChartOptions';
import * as Backend from './../../services/Backend';
import Aux from '../../hoc/Aux/Aux';
import Chart from './../../components/Chart/Chart';
import './ChartBuilder.scss';
import QueueAnim from 'rc-queue-anim';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import { CompanyLineNumberEnum } from '../../enums/CompanyLineNumber';

const lineOptions = [
    { label: 'Open', value: '1. open' },
    { label: 'High', value: '2. high' },
    { label: 'Low', value: '3. low' },
    { label: 'Close', value: '4. close' }
    // { label: 'Volume', value: '5. volume' },
    // { label: 'All', value: 'all'}
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
            generatingChart: false,
            stockChart: false,
            lineChart: false
        }
    }

    componentDidMount() {
    }

    // shouldComponentUpdate(nextProps, nextState) {
    // }

    companyLineNumberHandler = (type) => {
        if (type === CompanyLineNumberEnum.MultipleCompanies) {
            this.setState({ 
                [type]: true,
                lineChart: true
            });
        } else {
            this.setState({ [type]: true });
        }
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

    chartChosenHandler = (type) => {
        if (type === 'lineChart') {
            this.setState({
                lineChart: true,
                stockChart: false
            })
        } else {
            this.setState({
                lineChart: false,
                stockChart: true
            })
        }
    }

    resetForm = () => {
        this.setState({
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
        });
    }

    generateChart = () => {
        this.setState({
            generatingChart: true
        });
        if ((this.state.company === null && this.state.companies === null) || this.state.timeSeries === null) {
            return;
        }

        if (this.state.stockChart) {
            Backend.getStockChartData(this.state.company, this.state.interval, this.state.timeSeries, this.state.lineOption ? this.state.lineOption : this.state.lineOptions)
                .then(response => {
                    let newOptions = { ...stockChartOptions };
                    // let series = [];
                    // for (let i = 0; i < response.data.length; i++) {
                    //     let lineData =
                    //     {
                    //         name: 'Test series ' + i,
                    //         data: response.data[i],
                    //         tooltip: {
                    //             valueDecimals: 2
                    //         }
                    //     }
                    //     series.push(lineData);
                    // }
                    newOptions.series[0].data = response.data.values;
                    newOptions.series[1].data = response.data.volume;
                    this.setState({ chartOptions: newOptions });
                });
        }
        else if (this.state.singleCompany) {
            Backend.getSingleCompanyDataLocal(this.state.company, this.state.interval, this.state.timeSeries, this.state.lineOption ? this.state.lineOption : this.state.lineOptions)
                .then(response => {
                    let newOptions = { ...lineChartOptions };
                    let series = [];
                    for (let i = 0; i < response.data.length; i++) {
                        let lineData =
                        {
                            name: 'Test series ' + i,
                            data: response.data[i],
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
            Backend.getMultiCompanyDataLocal(this.state.companies, this.state.interval, this.state.timeSeries, this.state.lineOption).then(response => {
                let newOptions = { ...lineChartOptions };
                let series = [];
                for (let i = 0; i < response.data.length; i++) {
                    let lineData =
                    {
                        name: 'Test series ' + i,
                        data: response.data[i],
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
                    lineChart={this.state.lineChart}
                    stockChart={this.state.stockChart}
                    chartChosenHandler={this.chartChosenHandler}
                />
                <QueueAnim
                    className="fade-out-content"
                    key="fade-out-key"
                    type={['right', 'left']}
                    ease={['easeOutQuart', 'easeInOutQuart']}
                    duration={1000}>
                    {
                        (this.state.company || this.state.companies) && this.state.timeSeries && (this.state.lineOption || this.state.lineOptions || this.state.stockChart) ?
                            <div className="Generate-button-div" key="button-key">
                                <div className="Generate-button" onClick={this.generateChart}>Generate chart</div>
                            </div> :
                            null
                    }
                </QueueAnim>
                {
                    this.state.chartOptions ?
                        <Aux>
                            <div className="Chart-wrapper">
                                <Chart
                                    options={this.state.chartOptions}
                                    url={this.state.url}
                                />
                            </div>
                            <div className="Reset-button-wrapper">
                                <div className="Reset-button" onClick={this.resetForm}>Reset form</div>
                            </div>
                        </Aux> :
                        null
                }
            </Aux>
        );
    }
}

export default ChartBuilder;