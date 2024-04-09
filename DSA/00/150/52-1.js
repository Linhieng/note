/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    // 当我看到“左括号必须以正确的顺序闭合”这句话时，
    // 我就应该找出一个案例，应该指的是 [{(]}) 这种情况是错误的
    const leftStack = []
    const mapping = { '(': ')', '[': ']', '{': '}' }
    for (let ch of s) {
        if (['(', '[', '{'].includes(ch)) {
            leftStack.push(ch)
            continue
        }
        if (ch !== mapping[leftStack.pop()]) {
            return false
        }
    }
    return leftStack.length === 0
}
