// export const chartOptions = {
//     chart: {
//         type: 'line'
//     },
//     title: {
//         text: 'Monthly Average Temperature'
//     },
//     subtitle: {
//         text: 'Source: WorldClimate.com'
//     },
//     xAxis: {
//         // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//     },
//     yAxis: {
//         title: {
//             text: 'Temperature (°C)'
//         }
//     },
//     plotOptions: {
//         line: {
//             dataLabels: {
//                 enabled: true
//             },
//             enableMouseTracking: true
//         }
//     },
//     series: [{
//         name: 'Tokyo',
//         data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
//     }, {
//         name: 'London',
//         data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
//     }]
// };

const data = [
    [
        1501680600000,
        157.14
        ],
        [
        1501767000000,
        155.57
        ],
        [
        1501853400000,
        156.39
        ],
        [
        1502112600000,
        158.81
        ],
        [
        1502199000000,
        160.08
        ],
        [
        1502285400000,
        161.06
        ],
        [
        1502371800000,
        155.32
        ],
        [
        1502458200000,
        157.48
        ],
        [
        1502717400000,
        159.85
        ],
        [
        1502803800000,
        161.6
        ],
        [
        1502890200000,
        160.95
        ],
        [
        1502976600000,
        157.86
        ],
        [
        1503063000000,
        157.5
        ],
        [
        1503322200000,
        157.21
        ],
        [
        1503408600000,
        159.78
        ],
        [
        1503495000000,
        159.98
        ],
        [
        1503581400000,
        159.27
        ],
        [
        1503667800000,
        159.86
        ],
        [
        1503927000000,
        161.47
        ],
        [
        1504013400000,
        162.91
        ],
        [
        1504099800000,
        163.35
        ]
]

export const chartOptions = {
    rangeSelector: {
        selected: 1
    },

    title: {
        text: 'AAPL Stock Price'
    },

    series: [{
        name: 'AAPL',
        data: data,
        tooltip: {
            valueDecimals: 2
        },
        turboThreshold: 100
    }]
}