/**
 * 冒泡排序，两两交换
 *
 * @param {number[]} data
 */
module.exports = function bubble(data) {
    const length = data.length
    for (let i = 0; i < length; i++) {
        for (let j = 1; j < length - i; j++) {
            if (data[j-1] > data[j]) {
                const tmp = data[j]
                data[j] = data[j-1]
                data[j-1] = tmp
            }
        }
    }
    return data
}
