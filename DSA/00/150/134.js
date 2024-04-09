/**
 * 没事就看看
 *
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    if (x <= 1) return x

    let left = 0,
        right = (x >> 1) + 1
    res = 0

    while (left < right) {
        let middle = (left + right) >> 1
        if (middle ** 2 <= x) {
            res = middle
            left = middle + 1
        } else {
            right = middle
        }
    }
    return res
}
