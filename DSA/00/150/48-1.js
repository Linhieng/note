/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
    const ret = []
    let i = 0
    const len = nums.length
    while (i < len) {
        const low = i
        i++
        // 搜索连续
        while (i < len && nums[i] - 1 === nums[i - 1]) {
            i++
        }

        const high = i - 1
        if (low === high) {
            ret.push(nums[low].toString())
        } else {
            ret.push(nums[low] + '->' + nums[high])
        }
    }
    return ret
}
