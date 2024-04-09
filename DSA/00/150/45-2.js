/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    const str_square = { '0': 0 }
    for (let i = 0; i < 10; i++) {
        str_square[i.toString()] = i ** 2
    }

    const seen = new Set()
    while (n !== 1 && !seen.has(n)) {
        seen.add(n)
        n = getNext(n)
    }
    return n === 1

    function getNext(n) {
        let ans = 0
        strArr = Array.from(n.toString())
        strArr.forEach(str => {
            ans += str_square[str]
        })
        return ans
    }
}
