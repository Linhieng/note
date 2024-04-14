/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
    let len = nums.length
    let leftIndex = 0,
        rightIndex = len - 1
    // 如果整个数组本身就是有序的，那么直接返回
    if (nums[0] < nums[rightIndex]) {
        return nums[0]
    }

    // 1. 需要 + 1
    while (leftIndex + 1 < rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)

        // 2. 然后这里才可以使用左边和中间比较
        if (nums[leftIndex] < nums[mid]) {
            leftIndex = mid
        } else {
            rightIndex = mid
        }
    }

    return nums[rightIndex]
}
