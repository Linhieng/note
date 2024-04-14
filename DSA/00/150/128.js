/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function(n) {
    const str = n.toString(2)
    let ans = 0
    for (const ch of str) {
        if (ch === '1') ans++
    }
    return ans
};
