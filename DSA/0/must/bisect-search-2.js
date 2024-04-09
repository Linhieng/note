/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    return [
        left_boundary(nums, target),
        right_boundary(nums, target)
    ]
}

function left_boundary(nums, target) {
    const len = nums.length
    if (len < 1) return -1

    let leftIndex = 0
    let rightIndex = len - 1

    // 要相等，因为当只有一个元素时，也需要让他们
    // 进入一次循环
    while (leftIndex <= rightIndex) {
        let mid = leftIndex + rightIndex >>> 1
        if (nums[mid] >= target) {
            rightIndex = mid - 1
        } else {
            leftIndex = mid + 1
        }
    }

    // 因为循环判断中的相等情况处理的是 rightindex
    // 所以这里使用 leftIndex
    return nums[leftIndex] === target ? leftIndex : -1
}

function right_boundary(nums, target) {
    const len = nums.length
    if (len < 1) return -1

    let leftIndex = 0
    let rightIndex = len - 1

    while (leftIndex <= rightIndex) {
        let mid = leftIndex + rightIndex >>> 1
        if (nums[mid] <= target) {
            leftIndex = mid + 1
        } else {
            rightIndex = mid - 1
        }
    }
    return nums[rightIndex] === target ? rightIndex : -1
}
