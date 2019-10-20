import { Highcharts } from 'highcharts';

export const lineChartOptions = {
    chart: {
        type: 'column'
    },

    rangeSelector: {
        selected: 1
    },

    title: {
        text: 'Stock Price Comparison'
    },

    legend: {
        enabled: true,
        itemStyle: {
          fontWeight: '500'
        }
      },

    series: []
}

export const stockChartOptions = {
    yAxis: [{
        labels: {
            align: 'left'
        },
        height: '80%',
        resize: {
            enabled: true
        }
    }, {
        labels: {
            align: 'left'
        },
        top: '80%',
        height: '20%',
        offset: 0
    }],
    tooltip: {
        shape: 'square',
        headerShape: 'callout',
        borderWidth: 0,
        shadow: false,
        positioner: function (width, height, point) {
            var chart = this.chart,
                position;

            if (point.isHeader) {
                position = {
                    x: Math.max(
                        // Left side limit
                        chart.plotLeft,
                        Math.min(
                            point.plotX + chart.plotLeft - width / 2,
                            // Right side limit
                            chart.chartWidth - width - chart.marginRight
                        )
                    ),
                    y: point.plotY
                };
            } else {
                position = {
                    x: point.series.chart.plotLeft,
                    y: point.series.yAxis.top - chart.plotTop
                };
            }

            return position;
        }
    },
    series: [{
        type: 'ohlc',
        id: 'aapl-ohlc',
        name: 'Stock Price',
        data: []
    }, {
        type: 'column',
        id: 'aapl-volume',
        name: 'Volume',
        data: [],
        yAxis: 1
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 800
            },
            chartOptions: {
                rangeSelector: {
                    inputEnabled: false
                }
            }
        }]
    }
}

export const currencyChartOptions = {
    chart: {
        zoomType: 'x'
    },
    title: {
        text: 'USD to EUR exchange rate over time'
    },
    subtitle: {
        text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
    },
    xAxis: {
        type: 'datetime'
    },
    yAxis: {
        title: {
            text: 'Exchange rate'
        }
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                stops: [
                    [0, "#7cb5ec"],
                    [1, "#ffffff"]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },

    series: [{
        type: 'area',
        name: 'USD to EUR',
        data: []
    }]
}