export const TimeSeriesEnum = {
    Intraday: 'TIME_SERIES_INTRADAY',
    Daily: 'TIME_SERIES_DAILY',
    Weekly: 'TIME_SERIES_WEEKLY',
    Monthly: 'TIME_SERIES_MONTHLY'
}

export const CurrencyEnum = {
    'TIME_SERIES_INTRADAY': 'FX_INTRADAY',
    'TIME_SERIES_DAILY': 'FX_DAILY',
    'TIME_SERIES_WEEKLY': 'FX_WEEKLY',
    'TIME_SERIES_MONTHLY': 'FX_MONTHLY'
}

export const TimeSeries = [
    {label: 'Intraday', value: TimeSeriesEnum.Intraday},
    {label: 'Daily', value: TimeSeriesEnum.Daily},
    {label: 'Weekly', value: TimeSeriesEnum.Weekly},
    {label: 'Monthly', value: TimeSeriesEnum.Monthly},
]

export const TimeSeriesLabel = {
    'TIME_SERIES_DAILY': 'Daily',
    'TIME_SERIES_WEEKLY': 'Weekly',
    'TIME_SERIES_MONTHLY': 'Monthly'
}

