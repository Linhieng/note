/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    // 或者
    // let filterStr =
    //      (s.match(/[a-z0-9]+/ig) || ['']).join('').toUpperCase()
    let filterStr = Array.from(s)
        .map(v => v.toUpperCase())
        .filter(v => {
            const code = v.charCodeAt()
            return (
                (0x41 <= code && code <= 0x5A)
                ||
                (0x30 <= code && code <= 0x39)
            )
        })
    let left = 0,
        right = filterStr.length - 1
    while (left <= right) {
        if (filterStr[left] === filterStr[right]) {
            left++
            right--
        } else {
            return false
        }
    }
    return true
}
