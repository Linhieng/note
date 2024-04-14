/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
    const ransomMap = {}
    for (const char of ransomNote) {
        if (char in ransomMap) {
            ransomMap[char]++
        } else {
            ransomMap[char] = 1
        }
    }

    const magazineMap = {}
    for (const char of magazine) {
        if (char in magazineMap) {
            magazineMap[char]++
        } else {
            magazineMap[char] = 1
        }
    }

    for (const [char, count] of Object.entries(ransomMap)) {
        if (!(char in magazineMap) || magazineMap[char] < count) {
            return false
        }
    }

    return true


}
