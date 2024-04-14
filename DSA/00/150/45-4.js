/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    const nums_square = { '0': 0 }
    for (let i = 1; i < 10; i++) {
        nums_square[i.toString()] = i ** 2
    }
    let numberArr
    while (n > 9) {
        numberArr = Array.from(n.toString())
        n = 0
        numberArr.forEach(str => {
            n += nums_square[str]
        })
    }
    return n === 1 || n === 7
}
