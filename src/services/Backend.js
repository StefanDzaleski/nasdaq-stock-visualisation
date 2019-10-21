import axios from 'axios';
import { BASE_URL } from '../config';

export function getSingleCompanyDataLocal(company, interval, timeSeries, values, arearange) {
    return Promise.resolve(axios.get(BASE_URL + '/single-company?company=' + company + '&interval=' + interval + '&timeSeries=' + timeSeries + '&values=' + values + '&arearange=' + arearange).then(response => {
        console.log('single response', response);
        return response;
    })
    )
}

export function getMultiCompanyDataLocal(companies, interval, timeSeries, values) {
    const companiesString = companies.join();
    return Promise.resolve(axios.get(BASE_URL + '/multi-company?companies=' + companiesString + '&interval=' + interval + '&timeSeries=' + timeSeries + '&values=' + values).then(response => {
        console.log('multi response', response);
        return response;
    })
    )
}

export function getStockChartData(company, interval, timeSeries, values) {
    return Promise.resolve(axios.get(BASE_URL + '/stock-chart?company=' + company + '&interval=' + interval + '&timeSeries=' + timeSeries + '&values=' + values).then(response => {
        console.log('stock response', response);
        return response;
    })
    )
}

export function getCurrencyData(fromSymbol, toSymbol, timeSeries, interval) {
    return Promise.resolve(axios.get(BASE_URL + '/currency?fromSymbol=' + fromSymbol + '&toSymbol=' + toSymbol + '&timeSeries=' + timeSeries + '&interval=' + interval).then(response => {
        console.log('currency response', response);
        return response;
    })
    )
}
