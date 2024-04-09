/**
 * 暴力
 *
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
    let matchIndex = 0
    let len = haystack.length
    while (matchIndex < len) {
        if (haystack[matchIndex] === needle[0]) {
            if (Array.from(needle).every((char, index) => {
                return char === haystack[matchIndex + index]
            })) {
                return matchIndex
            }
        }
        matchIndex++
    }
    return -1
}
