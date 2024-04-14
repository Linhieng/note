/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    const str_square = {'0': 0}
    for (let i = 0; i < 10; i++) {
        str_square[i.toString()] = i**2
    }

    const getNext = (n) => {
        let ans = 0
        strArr = Array.from(n.toString())
        strArr.forEach(str => {
            ans += str_square[str]
        })
        return ans
    }

    let slow = n
    let fast = getNext(n)
    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow)
        fast = getNext(getNext(fast))
    }
    return fast === 1
}
