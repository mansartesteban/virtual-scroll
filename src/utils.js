export const findAllIndex = (arr, cb) => {
    let ids = []
    for (let i = arr.length - 1; i >= 0; i--) {
        if (cb(arr[i])) {
            ids.unshift(i)
        }
    }
    return ids
}