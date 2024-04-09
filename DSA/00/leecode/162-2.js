/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
    let len = nums.length
    let leftIndex = 0,
        rightIndex = len - 1

    while (leftIndex + 1 < rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)

        if (mid + 1 < len && nums[mid] < nums[mid + 1]) {
            leftIndex = mid
        } else {
            rightIndex = mid
        }
    }

    return nums[leftIndex] < nums[rightIndex] ?
        rightIndex :
        leftIndex
}
