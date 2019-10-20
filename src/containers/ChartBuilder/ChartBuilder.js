import React, { Component } from 'react';
import { lineChartOptions, stockChartOptions, currencyChartOptions } from '../../components/Chart/ChartOptions';
import * as Backend from './../../services/Backend';
import Aux from '../../hoc/Aux/Aux';
import Chart from './../../components/Chart/Chart';
import './ChartBuilder.scss';
import QueueAnim from 'rc-queue-anim';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import { CompanyLineNumberEnum } from '../../enums/CompanyLineNumber';
import { ChartType, ChartTypeMap } from '../../enums/ChartType';
import { CurrencyEnum, TimeSeriesEnum } from '../../enums/TimeSeries';

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
            chartType: '',
            areaSplineOptions: '',
            currency: false,
            stock: false,
            fromCurrency: '',
            toCurrency: ''
        }
    }

    dataTypeHandler = (type) => {
        this.setState({
            [type]: true
        });
    }

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

    fromCurrencyChangedHanlder = (value) => {
        this.setState({ fromCurrency: value });
    }

    toCurrencyChangedHandler = (value) => {
        this.setState({ toCurrency: value });
    }

    timeSeriesChangedHandler = (value) => {
        if (value === TimeSeriesEnum.Intraday) {
            if (!this.state.interval) {
                this.setState({
                    timeSeries: value,
                    interval: '1min'
                });
            } else {
                this.setState({ timeSeries: value });
            }
        } else {
            this.setState({ timeSeries: value });
        }
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

    areaSplineOptionsHandler = (values) => {
        this.setState({
            areaSplineOptions: values
        })
    }

    chartChosenHandler = (type) => {
        this.setState({
            chartType: type
        });
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
            generatingChart: false,
            chartType: '',
            areaSplineOptions: '',
            currency: false,
            stock: false,
            fromCurrency: '',
            toCurrency: ''
        });
    }

    generateChart = () => {
        this.setState({
            generatingChart: true
        });
        if ((this.state.company === null && this.state.companies === null && !this.state.currency) || this.state.timeSeries === null) {
            return;
        }
        if (this.state.currency) {
            const timeSeriesNew = CurrencyEnum[this.state.timeSeries];
            Backend.getCurrencyData(this.state.fromCurrency, this.state.toCurrency, timeSeriesNew, this.state.interval)
                .then(response => {
                    let newOptions = { ...currencyChartOptions };
                    let series = [];
                    for (let i = 0; i < response.data.length; i++) {
                        let lineData =
                        {
                            type: 'area',
                            name: this.state.fromCurrency + ' to ' + this.state.toCurrency,
                            data: response.data[i],
                            tooltip: {
                                valueDecimals: 2
                            }
                        }
                        series.push(lineData);
                    }
                    newOptions.series = series;
                    newOptions.title.text = this.state.fromCurrency + ' to ' + this.state.toCurrency + ' exchange rate over time'
                    // newOptions.chart.type = ChartTypeMap.get(this.state.chartType).type;
                    this.setState({ chartOptions: newOptions });
                });
        } else {
            if (this.state.chartType === ChartType.stockChart || this.state.chartType === ChartType.candlestickChart) {
                Backend.getStockChartData(this.state.company, this.state.interval, this.state.timeSeries, this.state.lineOption ? this.state.lineOption : this.state.lineOptions)
                    .then(response => {
                        let newOptions = { ...stockChartOptions };
                        newOptions.series[0].data = response.data.values;
                        newOptions.series[1].data = response.data.volume;
                        stockChartOptions.series[0].type = ChartTypeMap.get(this.state.chartType).type;
                        this.setState({ chartOptions: newOptions });
                    });
            }
            else if (this.state.singleCompany) {
                let values;
                if (this.state.chartType === ChartType.areaSplineRangeChart) {
                    this.state.areaSplineOptions === 'High vs Low' ? values = ['2. high', '3. low'] : values = ['1. open', '4. close'];
                } else {
                    this.state.lineOption ? values = this.state.lineOption : values = this.state.lineOptions;
                }
                Backend.getSingleCompanyDataLocal(this.state.company, this.state.interval, this.state.timeSeries, values, this.state.chartType === ChartType.areaSplineRangeChart)
                    .then(response => {
                        let newOptions = { ...lineChartOptions };
                        let series = [];
                        for (let i = 0; i < response.data.length; i++) {
                            let lineData =
                            {
                                name: this.state.lineOptions ? this.state.lineOptions[i] : this.state.lineOption,
                                data: response.data[i],
                                tooltip: {
                                    valueDecimals: 2
                                }
                            }
                            series.push(lineData);
                        }
                        newOptions.series = series;
                        newOptions.chart.type = ChartTypeMap.get(this.state.chartType).type;
                        this.setState({ chartOptions: newOptions });
                    });
            } else {
                Backend.getMultiCompanyDataLocal(this.state.companies, this.state.interval, this.state.timeSeries, this.state.lineOption).then(response => {
                    let newOptions = { ...lineChartOptions };
                    let series = [];
                    for (let i = 0; i < response.data.length; i++) {
                        let lineData =
                        {
                            name: this.state.companies[i],
                            data: response.data[i],
                            tooltip: {
                                valueDecimals: 2
                            }
                        }
                        series.push(lineData);
                    }
                    newOptions.series = series;
                    newOptions.chart.type = ChartTypeMap.get(this.state.chartType).type;
                    this.setState({ chartOptions: newOptions });
                })
            }
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
                    chartType={this.state.chartType}
                    chartChosenHandler={this.chartChosenHandler}
                    areaSplineOptionsHandler={this.areaSplineOptionsHandler}
                    areaSplineOptions={this.state.areaSplineOptions}
                    currency={this.state.currency}
                    stock={this.state.stock}
                    fromCurrency={this.state.fromCurrency}
                    toCurrency={this.state.toCurrency}
                    dataTypeHandler={this.dataTypeHandler}
                    fromCurrencyChanged={this.fromCurrencyChangedHanlder}
                    toCurrencyChanged={this.toCurrencyChangedHandler}
                />
                <QueueAnim
                    className="fade-out-content"
                    key="fade-out-key"
                    type={['right', 'left']}
                    ease={['easeOutQuart', 'easeInOutQuart']}
                    duration={1000}>
                    {
                        (this.state.company || this.state.companies || this.state.currency) && this.state.timeSeries && (this.state.lineOption || this.state.lineOptions || this.state.chartType === ChartType.stockChart || this.state.chartType === ChartType.candlestickChart || this.state.chartType === ChartType.areaSplineRangeChart || (this.state.fromCurrency && this.state.toCurrency)) ?
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
