/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    s = s.toUpperCase()
    let left = 0,
        right = s.length - 1
    while (left <= right) {
        while (left <= right && !/[a-z0-9]/i.test(s[left])) {
            left++
        }
        while (left <= right && !/[a-z0-9]/i.test(s[right])) {
            right--
        }
        if (left > right) return true // 处理空字符串
        if (s[left] === s[right]) {
            left++
            right--
        } else {
            return false
        }
    }
    return true
}
