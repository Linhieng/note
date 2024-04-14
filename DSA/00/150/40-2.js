/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    if (s.length !== t.length) {
        return false
    }
    let len = s.length
    let base1 = [],
        base2 = []
    let baseChar = 0
    let mapping = {}
    for (const char of s) {
        if (!(char in mapping)) {
            mapping[char] = baseChar
            baseChar++
        }
        base1.push(mapping[char])
    }
    mapping = {}
    baseChar = 0
    for (const char of t) {
        if (!(char in mapping)) {
            mapping[char] = baseChar
            baseChar++
        }
        base2.push(mapping[char])
    }
    for (let i = 0; i < len; i++) {
        if (base1[i] !== base2[i]) {
            return false
        }
    }
    return true

}
