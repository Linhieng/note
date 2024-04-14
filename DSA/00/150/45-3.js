/**
 * 这是根据数据证明得到的题解
 * 对于所有数字，如何会进入循环，则一定会进入这条路：
 *  4, 16, 37, 58, 89, 145, 42, 20
 *
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

    const cycle_members = new Set([
        4, 16, 37, 58, 89, 145, 42, 20
    ])
    while (n !== 1 && !cycle_members.has(n)) {
        n = getNext(n)
    }
    return n === 1
}
