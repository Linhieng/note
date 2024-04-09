/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
    let len = nums.length
    let leftIndex = 0,
        rightIndex = len - 1

    while (leftIndex < rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)

        // 哪边高往哪边走。
        // 注意，因为 leftIndex 不会等于 rightIndex，
        // 所以这里 mid 不会等于最右下标，所以不需要判断是否可能越界
        if (nums[mid] < nums[mid + 1]) {
            leftIndex = mid + 1
        } else {
            rightIndex = mid
        }
    }

    return leftIndex
}
