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

    // 这里为什么要相等呢？是因为相等的时候，
    // 他们所计算出的 mid 还未参与计算。
    while (leftIndex <= rightIndex) {
        let mid = leftIndex + rightIndex >>> 1
        // 这里要等号，是因为当相等时，我们同样需要
        // 让 leftIndex 左移
        if (target <= nums[mid]) {
            rightIndex = mid - 1
        } else if (nums[mid] < target) {
            leftIndex = mid + 1
        }
    }
    // 这里也可以返回 rightIndex + 1
    // 但当元素只有一个时，+1 会越界
    // 所以这里返回 leftIndex 比较好
    return nums[leftIndex] === target ? leftIndex : -1
}

function right_boundary(nums, target) {
    const len = nums.length
    if (nums.length < 1) return -1

    let leftIndex = 0
    let rightIndex = len - 1

    // 这里要等号的原因同上
    while (leftIndex <= rightIndex) {
        const mid = leftIndex + rightIndex >>> 1
        // 这里为什么要相等呢？是因为当相等时，我们同样需要
        // 将 leftIndex 右移
        if (nums[mid] <= target) {
            leftIndex = mid + 1
        } else if (target < nums[mid]) {
            rightIndex = mid - 1
        }
    }

    // 这里也可以使用 leftIndex - 1
    // 因为当相等时，leftIndex 始终会再次往右偏移一位
    // 但是当元素只有一个时，leftIndex - 1 会越界
    // 所以使用 rightIndex 比较好。
    return nums[rightIndex] === target ? rightIndex : -1
}
