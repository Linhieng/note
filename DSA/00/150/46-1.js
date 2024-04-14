/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
    let had = new Set()
    const len = nums.length
    for (let i = 0; i < len; i++) {
        if (i > k) {
            // 删掉最左边，其下标是 i - k - 1
            had.delete(nums[i - k - 1])
        }
        if (had.has(nums[i])) {
            return true
        }
        had.add(nums[i])
    }
    return false
}
