/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
    if (ransomNote.length > magazine.length) {
        return false
    }

    const count = new Array(26).fill(0)
    for (const char of magazine) {
        const code = char.charCodeAt() - 0x61
        count[code]++
    }
    for (const char of ransomNote) {
        const code = char.charCodeAt() - 0x61
        count[code]--
        if (count[code] < 0) {
            return false
        }
    }
    return true
}
