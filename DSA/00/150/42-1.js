/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    if (s.length !== t.length) {
        return false
    }
    // 因为只有两个，可以直接只使用一个哈希表，两两相减即可

    const map = new Map()
    for (const ch of s) {
        map.set(ch, (map.get(ch) || 0) + 1)
    }
    for (const ch of t) {
        map.set(ch, (map.get(ch) || 0) - 1)
        if (map.get(ch) < 0) {
            return false
        }
    }
    return true
}
