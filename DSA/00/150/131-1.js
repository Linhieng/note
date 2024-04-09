/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
    x = x.toString()
    let leftIndex = 0,
        rightIndex = x.length - 1
    while (leftIndex < rightIndex) {
        if (x[leftIndex] !== x[rightIndex]) {
            return false
        }
        leftIndex++
        rightIndex--
    }
    return true
}
