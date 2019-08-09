import { CompanyLineNumberEnum } from '../enums/CompanyLineNumber';

export function getSingleLine(data, value, companyLineNumber) {
    //Replaces the key with a timestamp and gets only one value from the object 
    let newData = [];
    let singleLineData = Object.entries(data).map(item => {
        let itemData = {};
        let itemDate = new Date(item[0]).getTime();
        let itemValue = parseFloat(item[1][value]);
        itemData = [itemDate, itemValue];
        return itemData;
    });

    singleLineData = singleLineData.sort((a, b) => {
        return a[0] - b[0];
    });
    if (companyLineNumber === CompanyLineNumberEnum.SingleCompany) {
        newData.push(singleLineData);
        return Promise.resolve(newData);
    } 
    return Promise.resolve(singleLineData);
}

export function getMultipleLines(data, values) {
    let newData = [];
    values.forEach(value => {
        let singleLineData = Object.entries(data).map(item => {
            let itemData = {};
            let itemDate = new Date(item[0]).getTime();
            let itemValue = parseFloat(item[1][value]);
            itemData = [itemDate, itemValue];
            return itemData;
        });

        singleLineData = singleLineData.sort((a, b) => {
            return a[0] - b[0];
        });
        newData.push(singleLineData);
    });

    return Promise.resolve(newData);
}

// export function getSingleLineForCompanies(data, value) {
//     let singleLineData = Object.entries(data).map(item => {
//         let itemData = {};
//         let itemDate = new Date(item[0]).getTime();
//         let itemValue = parseFloat(item[1][value]);
//         itemData = [itemDate, itemValue];
//         return itemData;
//     });

//     singleLineData = singleLineData.sort((a, b) => {
//         return a[0] - b[0];
//     });
//     return Promise.resolve(singleLineData);
// }

export function formatData(data) {

}