/**
 * 常规
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    let countSetBits = 0
    while (n !== 0) {
        countSetBits += n & 1
        n >>>= 1
    }
    return countSetBits
}
