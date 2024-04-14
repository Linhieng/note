/**
 * 这道题倒是和力扣的 33 题不同，可以使用左边和中间判断。
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {boolean}
 */
var search = function (nums, target) {
    let len = nums.length
    let leftIndex = 0,
        rightIndex = len - 1

    while (leftIndex <= rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)
        if (nums[mid] === target) {
            return true
        }

        if (nums[leftIndex] === nums[mid]) {
            leftIndex++
        } else if (nums[leftIndex] < nums[mid]) {
            if (nums[leftIndex] <= target && target < nums[mid]) {
                rightIndex = mid - 1
            } else {
                leftIndex = mid + 1
            }
        } else {
            if (nums[mid] < target && target <= nums[rightIndex]) {
                leftIndex = mid + 1
            } else {
                rightIndex = mid - 1
            }
        }
    }
    return false
}
