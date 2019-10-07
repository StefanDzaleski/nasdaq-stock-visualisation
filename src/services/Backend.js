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

// export function getSingleCompanyData(company, interval, timeSeries, values) {
//     if (timeSeries === TimeSeriesEnum.Intraday) {
//         return Promise.resolve(
//             axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + company + '&interval=' + interval + '&apikey=' + API_KEY).then(response => {
//                 const filteredResponse = {url: response.config.url, data: response.data['Time Series (' + interval + ')']};
//                 if (Array.isArray(values)) {
//                     return getMultipleLines(filteredResponse.data, values).then(response => {
//                         return response;
//                     });
//                 } else {
//                     return getSingleLine(filteredResponse.data, values, CompanyLineNumberEnum.SingleCompany).then(response => {
//                         return response;
//                     })
//                 }
//             })
//         );
//     } else {
//         return Promise.resolve(
//             axios.get('https://www.alphavantage.co/query?function=' + timeSeries + '&symbol=' + company + '&apikey=' + API_KEY).then(response => {
//                 const filteredResponse = {
//                     url: response.config.url, 
//                     data: response.data[timeSeries === TimeSeriesEnum.Daily ? 'Time Series (' + TimeSeriesLabel[timeSeries] + ')' : TimeSeriesLabel[timeSeries] + ' Time Series']
//                 };
//                 if (Array.isArray(values)) {
//                     return getMultipleLines(filteredResponse.data, values).then(response => {
//                         return response;
//                     });
//                 } else {
//                     return getSingleLine(filteredResponse.data, values, CompanyLineNumberEnum.SingleCompany).then(response => {
//                         return response;
//                     })
//                 }
//             })
//         );
//     }
// }

// export function getMultiCompanyData(companies, interval, timeSeries, values) {
//     let promises = [];
//     if (timeSeries === TimeSeriesEnum.Intraday) {
//         companies.forEach(company => {
//             promises.push(new Promise((resolve, reject) => {
//                 axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + company + '&interval=' + interval + '&apikey=' + API_KEY).then(response => {
//                     const filteredResponse = {url: response.config.url, data: response.data['Time Series (' + interval + ')']};
//                         getSingleLine(filteredResponse.data, values, CompanyLineNumberEnum.MultipleCompanies).then(response => {
//                             resolve(response);
//                         })               
//                 })
//             }))
//         });
//         return Promise.all(promises);
//     } else {
//         companies.forEach(company => {
//             promises.push(new Promise((resolve, reject) => {
//                 axios.get('https://www.alphavantage.co/query?function=' + timeSeries + '&symbol=' + company + '&apikey=' + API_KEY).then(response => {
//                 const filteredResponse = {
//                         url: response.config.url, 
//                         data: response.data[timeSeries === TimeSeriesEnum.Daily ? 'Time Series (' + TimeSeriesLabel[timeSeries] + ')' : TimeSeriesLabel[timeSeries] + ' Time Series']
//                     };
//                         getSingleLine(filteredResponse.data, values, CompanyLineNumberEnum.MultipleCompanies).then(response => {
//                             resolve(response);
//                         })               
//                 })
//             }))
//         });
//         return Promise.all(promises);
//     }
// }

