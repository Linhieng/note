/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
    let lastIndex = digits.length - 1
    // 初识时直接设置为 1，因为要加 1
    let carry = 1
    for (; lastIndex >= 0; lastIndex--) {
        if (digits[lastIndex] + carry <= 9) {
            digits[lastIndex]++
            return digits
        } else {
            digits[lastIndex] = 0
            carry = 1
        }
    }
    if (carry) {
        digits.unshift(1)
    }
    return digits
}
