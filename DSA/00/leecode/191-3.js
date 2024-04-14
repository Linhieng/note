/**
 * 优化 1
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    let countSetBits = 0
    while (n !== 0) {
        n &= n - 1 // 清除最右侧的第一个 1
        countSetBits++
    }
    return countSetBits
}
