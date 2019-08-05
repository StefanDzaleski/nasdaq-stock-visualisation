export function getSingleLine(data, value) {
    //Replaces the key with a timestamp and gets only one value from the object 
    let newData = [];
        newData = Object.entries(data).map(item => {
            let itemData = {};
            let itemDate = new Date(item[0]).getTime();
            let itemValue = parseFloat(item[1][value]);
            itemData = [itemDate, itemValue];
            return itemData;
        });

        newData = newData.sort((a, b) => {
            return a[0] - b[0];
        });

        return Promise.resolve(newData);

}