/**
 * 优化2
 * 解释参考 https://www.cnblogs.com/maples7/p/4472208.html
 *
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
    n = (n & 0x55555555) + ((n >> 1) & 0x55555555)
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
    n = (n & 0x0f0f0f0f) + ((n >> 4) & 0x0f0f0f0f)
    n = (n & 0x00ff00ff) + ((n >> 8) & 0x00ff00ff)
    n = (n & 0x0000ffff) + ((n >> 16) & 0x0000ffff)
    return n
}
