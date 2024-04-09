/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
    s = s.trim()
    // 这里如果设置为 1 的话，情况会很麻烦。
    // 因为 'ab' 和 'x ab' 这两种情况需要你自己去区分
    let i = 0
    let len = s.length
    for (; i < len; i++) {
        if (s[len - i - 1] === ' ') { break }
    }
    return i
}
