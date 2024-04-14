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
    for (let i = 0; i < 26; i++) {
        map.set(String.fromCharCode(i + 0x61), 0)
    }
    const len = s.length
    for (let i = 0; i < len; i++) {
        const sChar = s[i]
        const tChar = t[i]
        if (sChar === tChar) continue
        map.set(sChar, map.get(sChar) + 1)
        map.set(tChar, map.get(tChar) - 1)
    }
    for (let i = 0; i < 26; i++) {
        if (map.get(String.fromCharCode(i + 0x61)) !== 0) {
            return false
        }
    }
    return true
}
