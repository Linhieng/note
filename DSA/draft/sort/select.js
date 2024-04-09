/**
 * 选择排序，每次选最大/最小
 *
 * @param {number[]} data
 */
module.exports = function select(data) {
    const length = data.length
    for (let i = 0; i < length; i++) {
        let max = data[0]
        let maxIndex = 0
        for (let j = 0; j < length - i; j++) {
            if (data[j] > max) {
                max = data[j]
                maxIndex = j
            }
        }
        const tmp = data[length - i - 1]
        data[length - i - 1] = max
        data[maxIndex] = tmp
    }
    return data
}
