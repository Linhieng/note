/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    const ans = []

    let left = 0
    let right = nums.length - 1
    while (left < right) {
        let mid = left + right >> 1
        if (nums[mid] >= target) {
            right = mid
        } else {
            left = mid + 1
        }
    }

    if (nums[left] !== target) {
        return [-1, -1]
    }
    ans.push(left)

    left = 0
    right = nums.length - 1
    while (left < right) {
        let mid = left + right + 1 >> 1
        if (nums[mid] <= target) {
            left = mid
        } else {
            right = mid - 1
        }
    }
    ans.push(left)
    return ans
}
