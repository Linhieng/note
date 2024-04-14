/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let leftIndex = 0,
        rightIndex = nums.length - 1
    let insertIndex = nums.length
    while (leftIndex <= rightIndex) {
        const mid = (rightIndex + leftIndex) >> 1
        if (target <= nums[mid]) {
            insertIndex = mid
            rightIndex = mid - 1
        } else {
            leftIndex = mid + 1
        }
    }
    return insertIndex
}
