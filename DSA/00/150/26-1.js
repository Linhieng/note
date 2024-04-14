/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
    let searchLen = s.length,
        targetLen = t.length

    // dp[i][char] 表示字符串 t 中
    // 从位置 i 开始往后字符 char 第一次出现的位置下标
    // 此处要注意 js 创建二维数组的方法！
    let dp = Array(targetLen).fill().map(() => Array(26).fill(0))
    // 很明显，在 targetLen 位置（越界）上所有字母都是越界的，所以将它们置为 targetLen
    dp.push(Array(26).fill(targetLen))

    for (let i = targetLen - 1; i > -1; i--) {
        for (let c = 0; c < 26; c++) {
            dp[i][c] =
                c === t[i].charCodeAt() - 0x61 ?
                    i :
                    dp[i + 1][c] // 注意这里有 [c]
        }
    }

    // 现在，我们就不需要一步一步地在 t 中搜索 s 中的下一个字符了
    // 可以直接通过 dp 获取下一个字符所在位置！
    let nextIndex = 0
    for (const sChar of s) {
        const code = sChar.charCodeAt() - 0x61
        if (targetLen === dp[nextIndex][code]) {
            return false
        }
        nextIndex = dp[nextIndex][code] +1 // 注意这里要 +1
    }
    return true
}
