/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    let answer = ''
    let i = 0
    for (; i <= 200; i++) {
        let curChar
        for (const str of strs) {
            // 刚开始我写的是
            // curChar && (i >= str.length || str[i] != curChar)
            // 我本以为这样是正确的，但当输入的是 [''] 时候，这里就永远进不去了
            // 所以，永远不要真正写一个死循环的函数！
            if (i >= str.length || (
                curChar && str[i] != curChar
            )) {
                return answer
            }
            curChar = str[i]
        }
        answer += curChar
    }
    return answer
}
