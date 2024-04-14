/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const window = []
    let left = 0
    let ans = 0
    const map = new Map()
    for (const [i, ch] of s.split('').entries()) {

        if (map.has(ch)) {
            // 窗口需要收缩
            const index = map.get(ch)
            while (left <= index) {
                const c = window.shift()
                map.delete(c)
                left++
            }
        }

        // 不管如何，右侧只能往前移
        window.push(ch)
        map.set(ch, i)
        ans = Math.max(ans, window.length)
    }

    return ans
};
