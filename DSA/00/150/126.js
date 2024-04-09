/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
    let len = Math.max(a.length, b.length)
    a = a.padStart(len, '0')
    b = b.padStart(len, '0')

    let ans = ''
    let carry = 0

    while (len > 0) {
        len--
        const tmp = add(a[len], b[len], carry)
        carry = tmp[0]
        ans = tmp[1] + ans
    }

    return (carry === 1 ? '1' : '') + ans

}

function add(bit1, bit2, carry) {
    let sum = Number(bit1) + Number(bit2) + Number(carry)

    switch (sum) {
        case 0: return [0, 0]
        case 1: return [0, 1]
        case 2: return [1, 0]
        case 3: return [1, 1]
    }
}
