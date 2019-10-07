import React from 'react';
import { Select } from 'antd';
import { CompanyList, Currencies } from '../../../enums/CompanyList';
import { TimeSeries, TimeSeriesEnum } from '../../../enums/TimeSeries';
import { Interval } from '../../../enums/Interval';
import './Dropdowns.scss';
import Aux from '../../../hoc/Aux/Aux';

const { Option } = Select;

const dropdowns = (props) => {
    return (
        <div className="Dropdowns-div">
            {props.stock ?
                props.multipleCompanies ?
                    <Select className="Dropdown" mode="multiple" placeholder="Select a company" onChange={props.multipleCompaniesChanged} name="company">
                        {CompanyList.map(element => {
                            return (
                                <Option className="Option" key={element.value} value={element.value}>{element.label}</Option>
                            );
                        })}
                    </Select> :
                    <Select className="Dropdown" placeholder="Select a company" onChange={props.companyChanged} name="company">
                        {CompanyList.map(element => {
                            return (
                                <Option key={element.value} value={element.value}>{element.label}</Option>
                            );
                        })}
                    </Select> :
                null
            }

            {
                props.currency ?
                    <Aux>
                        <Select className="Dropdown" placeholder="From currency" onChange={props.fromCurrencyChanged} name="fromCurrency">
                            {Currencies.map(element => {
                                return (
                                    <Option key={element} value={element}>{element}</Option>
                                );
                            })}
                        </Select>
                        <Select className="Dropdown" placeholder="To currency" onChange={props.toCurrencyChanged} name="toCurrency">
                            {Currencies.map(element => {
                                return (
                                    <Option key={element} value={element}>{element}</Option>
                                );
                            })}
                        </Select>
                    </Aux> :
                    null
            }

            <Select className="Dropdown" placeholder="Select a time series" onChange={props.timeSeriesChanged} name="timeSeries">
                {TimeSeries.map(element => {
                    return (
                        <Option key={element.value} value={element.value}>{element.label}</Option>
                    );
                })}
            </Select>

            {
                props.timeSeries === TimeSeriesEnum.Intraday ?
                    <Select className="Dropdown" defaultValue="1min" placeholder="Select an interval" onChange={props.intervalChanged} name="interval">
                        {Interval.map(element => {
                            return (
                                <Option key={element.value} value={element.value}>{element.label}</Option>
                            );
                        })}
                    </Select> :
                    null
            }

        </div>
    );
}

export default dropdowns;