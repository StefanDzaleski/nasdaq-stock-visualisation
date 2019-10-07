import React from 'react';
import './FormWrapper.css';
import Dropdowns from './Dropdowns/Dropdowns';
import OptionButtons from './OptionsButtons/OptionButtons';
import Checkboxes from './Checkboxes/Checkboxes';
import RadioButtons from './RadioButtons/RadioButtons';
import Aux from '../../hoc/Aux/Aux';
import { CompanyLineNumberEnum } from '../../enums/CompanyLineNumber';
import { ChartType } from '../../enums/ChartType';

const formWrapper = (props) => {

    const options = (
        props.chartType !== ChartType.stockChart && props.chartType !== ChartType.candlestickChart && props.chartType !== ChartType.areaSplineRangeChart ?
        props.singleLine || props.multipleCompanies ?
            <RadioButtons
                lineOptions={props.lineOptions}
                lineOptionChosen={props.lineOptionChosen}
            /> :
            <Checkboxes
                lineOptions={props.lineOptions}
                lineOptionsChosen={props.lineOptionsChosen} />
        : null
    )

    return (
        <div className="Form-wrapper">
            <OptionButtons
                showButtons={props.stock || props.currency}
                click={props.dataTypeHandler}
                values={
                    [{ textValue: 'Stock data', clickValue: 'stock' },
                    { textValue: 'Forex data', clickValue: 'currency' }]
                }
                firstValueTrue={props.stock}
            />
            {
                props.stock ?
            <OptionButtons
                showButtons={props.singleCompany || props.multipleCompanies}
                click={props.companyLineNumber}
                values={
                    [{ textValue: 'Single Company', clickValue: CompanyLineNumberEnum.SingleCompany },
                    { textValue: 'Multiple Companies', clickValue: CompanyLineNumberEnum.MultipleCompanies }]
                }
                firstValueTrue={props.singleCompany}
            /> :
            null
            }
            {
               props.singleCompany ?
               <OptionButtons
                   showButtons={props.chartType}
                   click={props.chartChosenHandler}
                   values={
                       [{ textValue: ChartType.splineChart, clickValue: ChartType.splineChart },
                       { textValue: ChartType.stockChart, clickValue: ChartType.stockChart },
                       { textValue: ChartType.columnChart, clickValue: ChartType.columnChart },
                       { textValue: ChartType.areaSplineRangeChart, clickValue: ChartType.areaSplineRangeChart },
                       { textValue: ChartType.candlestickChart, clickValue: ChartType.candlestickChart }
                    ]
                   }
                   chosenValue={props.chartType}
               /> :
               null 
            }
            {
               props.multipleCompanies ?
               <OptionButtons
                   showButtons={props.chartType}
                   click={props.chartChosenHandler}
                   values={
                       [{ textValue: ChartType.splineChart, clickValue: ChartType.splineChart },
                       { textValue: ChartType.columnChart, clickValue: ChartType.columnChart }]
                   }
                   chosenValue={props.chartType}
               /> :
               null 
            }
            {
                props.chartType === ChartType.splineChart && props.singleCompany ?
                    <OptionButtons
                        showButtons={props.singleLine || props.multiLine}
                        click={props.companyLineNumber}
                        values={
                            [{ textValue: 'Single Line', clickValue: CompanyLineNumberEnum.SingleLine },
                            { textValue: 'Multiple Lines', clickValue: CompanyLineNumberEnum.MultiLine }]
                        }
                        firstValueTrue={props.singleLine}
                    /> :
                    null
            }
            {
                props.chartType === ChartType.areaSplineRangeChart ?
                    <OptionButtons
                        showButtons={props.areaSplineOptions}
                        click={props.areaSplineOptionsHandler}
                        values={
                            [{ textValue: 'High vs Low', clickValue: 'High vs Low' },
                            { textValue: 'Open vs Close', clickValue:  'Open vs Close'}]
                        }
                        chosenValue={props.areaSplineOptions}
                    /> :
                    null
            }
            {
                (props.singleLine || props.multiLine) || (props.chartType && props.chartType !== ChartType.splineChart && props.chartType !== ChartType.areaSplineRangeChart) || props.areaSplineOptions || (props.multipleCompanies && props.chartType) || (props.currency)?
                    <Aux>
                        {options}
                        <Dropdowns
                            companyChanged={props.companyChanged}
                            timeSeriesChanged={props.timeSeriesChanged}
                            intervalChanged={props.intervalChanged}
                            timeSeries={props.timeSeries}
                            multipleCompanies={props.multipleCompanies}
                            multipleCompaniesChanged={props.multipleCompaniesChanged}
                            stock={props.stock}
                            currency={props.currency}
                            fromCurrencyChanged={props.fromCurrencyChanged}
                            toCurrencyChanged={props.toCurrencyChanged}
                        />
                    </Aux> :
                    null
            }
        </div>
    );
}

export default formWrapper;