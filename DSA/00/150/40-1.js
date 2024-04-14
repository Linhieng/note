/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
    if (s.length !== t.length) {
        return false
    }
    const len = s.length
    const s2t = {}
    const t2s = {}
    for (let i = 0; i < len; i++) {
        const sChar = s[i]
        const tChar = t[i]
        if ((s2t[sChar] && s2t[sChar] !== tChar)
            ||
            (t2s[tChar] && t2s[tChar] !== sChar)
        ) {
            return false
        }
        s2t[sChar] = tChar
        t2s[tChar] = sChar
    }
    return true
}
