/**
 * 力扣 2529 正整数和负整数的最大计数
 *
 * @param {number[]} nums
 * @return {number}
 */
var maximumCount = function (nums) {
    let neg = 0,
        pos = 0
    const len = nums.length

    let left = 0
    let right = len - 1

    // 我们后面的代码少考虑了这么一种情况 —— 全零
    // 此时后面的代码会输出 1，导致答案错误
    // 我们可以选择在后面代码中添加判断
    // 但我更推荐直接在开头排除掉全零的情况
    if (nums[left] === nums[right] && nums[left] === 0) {
        return 0
    }


    // 二分不难，但要明确我们的目标
    // 在这里，我们要找的是最大的负数
    // 而不是最左边的 0，也不是最大的负数的下一个数字
    // 因为可能没有 0，可能没有非负数！
    while (left < right) {
        // 始终记得，left = 时这里要加 1，向上取整！
        const mid = 1 + left + right >> 1
        if (nums[mid] < 0) {
            left = mid
        } else {
            right = mid - 1
        }
    }
    // 此时，left 下标所在值就是最大的负数
    neg = left + 1

    // 注意在找右侧时，我们不需要修改 left，只需要修改 right
    right = len - 1
    // 现在，我们要找的是最小的正数！
    // 不是最右边的 0，也不是最大的最小的正数的前一个数字
    // 原因同上：它们可能不存在！
    while (left < right) {
        const mid = left + right >> 1
        if (nums[mid] > 0) {
            right = mid
        } else { // 这里其实只能是等于 0
            left = mid + 1
        }
    }
    // 我们这里使用长度减下标，所以不需要 + 1
    pos = len - left

    return Math.max(neg, pos)
}
