import React from 'react';
import { Select } from 'antd';
import { CompanyList } from '../../../enums/CompanyList';
import { TimeSeries } from '../../../enums/TimeSeries';
import { Interval } from '../../../enums/Interval';
import './Dropdowns.css';

const { Option } = Select;

const dropdowns = (props) => {

    return (
        <div className="Dropdowns-div">
            <Select className="Dropdown" placeholder="Select a company" onChange={props.companyChanged} name="company">
                {CompanyList.map(element => {
                    return (
                        <Option key={element.value} value={element.value}>{element.label}</Option>
                    );
                })}
            </Select>
            <Select className="Dropdown" placeholder="Select a time series" onChange={props.timeSeriesChanged} name="timeSeries">
                {TimeSeries.map(element => {
                    return (
                        <Option key={element.value} value={element.value}>{element.label}</Option>
                    );
                })}
            </Select>
            <Select className="Dropdown" placeholder="Select an interval" onChange={props.intervalChanged} name="interval">
                {Interval.map(element => {
                    return (
                        <Option key={element.value} value={element.value}>{element.label}</Option>
                    );
                })}
            </Select>
        </div>
    );
}

export default dropdowns;