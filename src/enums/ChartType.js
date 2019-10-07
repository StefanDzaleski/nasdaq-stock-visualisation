export const ChartType = {
    splineChart: 'Spline Chart',
    stockChart: 'Stock Chart',
    columnChart: 'Column Chart',
    areaSplineRangeChart: 'Area Spline Range Chart',
    candlestickChart: 'Candlestick Chart'
}

export const ChartTypeLabels = [
    {label: ChartType.SplineChart, value: 'lineChart'},
    {label: ChartType.StockChart, value: 'stockChart'},
    {label: ChartType.ColumnChart, value: 'columnChart'},
]

export const ChartTypeMap = new Map([
    [ChartType.splineChart, {
        type: 'spline'
    }],
    [ChartType.stockChart, {
        type: 'ohlc'
    }],
    [ChartType.columnChart, {
        type: 'column'
    }],
    [ChartType.areaSplineRangeChart, {
        type: 'areasplinerange'
    }],
    [ChartType.candlestickChart, {
        type: 'candlestick'
    }]
])