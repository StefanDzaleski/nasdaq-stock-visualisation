import axios from 'axios';
import { API_KEY } from '../config';

export function getSeriesData(company, timeSeries) {
    console.log('company', company);
    console.log('timeSeries', timeSeries);
    return Promise.resolve(
        axios.get('https://www.alphavantage.co/query?function=' + timeSeries + '&symbol=' + company + '&apikey=' + API_KEY).then(response => {
            return response;
        })
    );
}

export function getIntradayData(company, interval) {
    return Promise.resolve(
        axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + company + '&interval=' + interval + '&apikey=' + API_KEY).then(response => {
            return response;
        })
    );
}