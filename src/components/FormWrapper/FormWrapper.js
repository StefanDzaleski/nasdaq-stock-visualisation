import React from 'react';
import './FormWrapper.css';
import Dropdowns from './Dropdowns/Dropdowns';
import OptionButtons from './OptionsButtons/OptionButtons';
import Checkboxes from './Checkboxes/Checkboxes';
import RadioButtons from './RadioButtons/RadioButtons';
import Aux from '../../hoc/Aux/Aux';
import { CompanyLineNumberEnum } from '../../enums/CompanyLineNumber';

const formWrapper = (props) => {

    const options = (
        props.singleLine || props.multipleCompanies ?
            <RadioButtons
                lineOptions={props.lineOptions}
                lineOptionChosen={props.lineOptionChosen}
            /> :
            <Checkboxes
                lineOptions={props.lineOptions}
                lineOptionsChosen={props.lineOptionsChosen} />
    )

    return (
        <div className="Form-wrapper">
            <OptionButtons
                showButtons={props.singleCompany || props.multipleCompanies}
                click={props.companyLineNumber}
                values={
                    [{ textValue: 'Single Company', clickValue: CompanyLineNumberEnum.SingleCompany },
                    { textValue: 'Multiple Companies', clickValue: CompanyLineNumberEnum.MultipleCompanies }]
                }
                firstValueTrue={props.singleCompany}
            />
            {
                props.singleCompany ?
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
                props.singleLine || props.multiLine || props.multipleCompanies ?
                    <Aux>
                        {options}
                        <Dropdowns
                            companyChanged={props.companyChanged}
                            timeSeriesChanged={props.timeSeriesChanged}
                            intervalChanged={props.intervalChanged}
                            timeSeries={props.timeSeries}
                            multipleCompanies={props.multipleCompanies}
                            multipleCompaniesChanged={props.multipleCompaniesChanged}
                        />
                    </Aux> :
                    null
            }
        </div>
    );
}

export default formWrapper;