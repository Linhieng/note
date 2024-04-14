/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
    let len = nums.length
    let leftIndex = 0,
        rightIndex = len - 1
    if (nums[0] < nums[len - 1]) {
        return nums[0]
    }

    while (leftIndex < rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)
        if (nums[mid] === nums[rightIndex]) {
            rightIndex--
        } else if (nums[mid] < nums[rightIndex]) {
            rightIndex = mid
        } else {
            leftIndex = mid + 1
        }
    }
    return nums[leftIndex]
}
