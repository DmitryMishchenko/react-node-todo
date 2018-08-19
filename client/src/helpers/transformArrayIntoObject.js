export default (arr, key) => {
    if (arr && Array.isArray(arr) && arr.length) {
        return arr.reduce((acc, item) => {
            acc[item[key]] = item;

            return acc;
        }, {});
    }

    return {};
};