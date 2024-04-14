/**
 * 用中间和右边进行比较，比用左边和中间进行比较好。
 * 因为当出现重复元素时，直接添加一个判断即可。
 * 详见 154 题
 *
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

    // 2. 不需要 +1
    while (leftIndex < rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)
        // 1. 这里用中间和右边比较时，
        if (nums[mid] < nums[rightIndex]) {
            rightIndex = mid
        } else {
            leftIndex = mid + 1
        }
    }

    return nums[rightIndex]
}
