/**
 * 从左往右遍历，每遇到一个数字就将其插入到前面合适的位置上
 * @param {number[]} data
 */
module.exports = function insert(data) {
    const length = data.length
    for (let i = 1; i < length; i++) {
        let tmpI = i
        for (j = i - 1; j >= 0; j--) {
            if (data[tmpI] < data[j]) {
                const tmp = data[j]
                data[j] = data[tmpI]
                data[tmpI] = tmp
                tmpI = j
            } else {
                break
            }
        }
    }
    return data
}
