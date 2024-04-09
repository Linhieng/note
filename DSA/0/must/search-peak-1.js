/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
    let len = nums.length
    let leftIndex = 0,
        rightIndex = len - 1

    while (leftIndex < rightIndex) {
        let mid = leftIndex + rightIndex + 1 >> 1

        // 哪边高往哪边走
        if (nums[mid] > nums[mid - 1]) {
            leftIndex = mid
        } else {
            rightIndex = mid - 1
        }
    }

    return leftIndex
}
