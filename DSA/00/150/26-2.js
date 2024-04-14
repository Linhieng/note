/**
 * 虽然该方法的时间复杂度是 m+n
 * 但如果有 10亿 个 s 需要判断，那么复杂度非常大！
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
    let i = 0
    for (const char of t) {
        if (char === s[i]) {
            i++
        }
    }
    return i === s.length
}
