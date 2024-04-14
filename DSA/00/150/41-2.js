/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
    // 哈希表，该用 map 就用 map，
    // 不然会被特殊的字符串所迷惑，比如 constructor
    const p2s = new Map()
    const s2p = new Map()
    let sPoint = 0,
        pPoint = 0
    const sLen = s.length
    const pLen = pattern.length
    for (; pPoint < pLen; pPoint++) {
        const pChar = pattern[pPoint]
        let sStr = ''
        while (sPoint < sLen && s[sPoint] !== ' ') {
            sStr += s[sPoint]
            sPoint++
        }
        // 跳过空格
        while (sPoint < sLen && s[sPoint] === ' ') {
            sPoint++
        }
        if (sStr === '') {
            return false
        }
        // ~~此时 sStr 可能是空字符串，但 p 不可能是空字符串，所以比较时肯定为 false~~
        // 错啦，sStr 为空字符串时，根本不会进行判断！
        if (
            (s2p.has(sStr) && s2p.get(sStr) !== pChar)
            ||
            (p2s.has(pChar) && p2s.get(pChar) !== sStr)
        ) {
            return false
        }
        s2p.set(sStr, pChar)
        p2s.set(pChar, sStr)
    }
    // pattern 走完了，s 还有余
    if (sPoint < sLen) return false
    return true
}
