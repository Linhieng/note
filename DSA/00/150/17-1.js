/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    let i = 0
    let sLen = s.length
    let ans = 0
    for (; i < sLen;) {
        const [offset, num] = roman_int(s.slice(i))
        i += offset
        ans += num
    }
    return ans
};

function roman_int (str) {
    if (str.startsWith('CM')) return [2, 900]
    if (str.startsWith('CD')) return [2, 400]
    if (str.startsWith('XC')) return [2, 90]
    if (str.startsWith('XL')) return [2, 40]
    if (str.startsWith('IX')) return [2, 9]
    if (str.startsWith('IV')) return [2, 4]
    if (str.startsWith('I'))  return [1, 1]
    if (str.startsWith('V'))  return [1, 5]
    if (str.startsWith('X'))  return [1, 10]
    if (str.startsWith('L'))  return [1, 50]
    if (str.startsWith('C'))  return [1, 100]
    if (str.startsWith('D'))  return [1, 500]
    if (str.startsWith('M'))  return [1, 1000]
}
