/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
    const ans = []

    for (const [i, num] of nums.entries()) {
        if (i === 0) {
            ans.push([num])
            continue
        }
        if (num - 1 === nums[i - 1]) {
            ans.push(
                [...ans.pop(), num]
            )
        } else {
            ans.push(
                [num]
            )
        }
    }
    return ans.map(arr => {
        if (arr.length === 1) {
            return arr[0].toString()
        } else {
            return arr[0] + '->' + arr.slice(-1)
        }
    })
}
