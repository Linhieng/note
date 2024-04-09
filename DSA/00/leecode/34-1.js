/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {

    return [
        left_boundary(nums, target),
        right_boundary(nums, target),
    ]
}

function left_boundary(nums, target) {
    const len = nums.length
    if (len < 1) return -1

    let leftIndex = 0,
        rightIndex = len - 1

    while (leftIndex <= rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)

        // 2. 为什么这里要有等号呢？
        // 原因是：当 target < nums[mid] 时，我们会让 rightIndex 左移
        // 当 target === nums[mid] 时，由于我们要找的是左边界，
        // 所以同样会让他们左移，所以这里就将这两种情况合并了！
        if (target <= nums[mid]) {
            rightIndex = mid - 1
        } else {
            leftIndex = mid + 1
        }
    }
    // 当出循环时，leftIndex 和 rightInd 交叉了的
    // 即 rightIndex < leftIndex，此时如果要相等，
    // 肯定是 leftIndex 所在值等于 target
    // 因为前面 while 判断中，当相等时，直接是让 rightIndex 移动了。
    // 所以不可能是 rightIndex
    return nums[leftIndex] === target ? leftIndex : -1
}

function right_boundary(nums, target) {
    const len = nums.length
    if (len < 1) return -1

    let leftIndex = 0,
        rightIndex = len - 1

    while (leftIndex <= rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)

        // 1. 代码和前面一样，不同点在于这里不会有等号
        // 为什么呢？很简单，首先你去看看前面计算左边界时为什么可以有等号
        // 然后你就知道为什么这里不可能有等号了。
        if (target < nums[mid]) {
            rightIndex = mid - 1
        } else {
            leftIndex = mid + 1
        }
    }

    // 同理，到达这里时，leftIndex 和 rightIndex 也是交叉了的
    // 而因为前面 while 循环中，当 nums[mid] 和 target 时，
    // 我们移动的是 leftIndex，这就意味着，leftIndex 始终比
    // target 所在下标大 1，所以这里就直接使用 rightIndex 了
    // （明白了原理后，你应该也知道，这里也可以使用 leftIndex-1）
    return nums[rightIndex] === target ? rightIndex : -1
}
