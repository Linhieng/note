/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function (nums, k) {
    let left = 0

    let right = nums.reduce((pre, cur) => {
        // 1. 不能省，错误案例 [1,4,4] 3
        left = Math.max(left, cur)
        return pre + cur
    }, 0)

    // 2. 因为这里的二分，求的是答案，也就是子数组之和的最小最大值
    // 而又因为子数组不允许为空，所以子数组之和的最大值，至少比
    // 数组中的元素的最大值大！这就是为什么前面会先计算 left 为数组的最大值！
    // 同时计算 right 为数组的总和（当子数组只有一个时，子数组之和，不就是原始
    // 数组之和嘛）
    while (left < right) {
        let mid = left + (right - left >> 1)

        if (splitSubArrNumber(nums, mid) <= k) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    return left
}

/**
 * 返回一个数值，表示在满足非空子数组的最大值不超过 allowMaxSum 的情况下
 * 最多能将 nums 划分为多少个子数组
 */
function splitSubArrNumber(nums, allowMaxSum) {
    const len = nums.length
    let subArrCount = 1,
        curArrSum = 0
    for (let i = 0; i < len; i++) {
        if (curArrSum + nums[i] <= allowMaxSum) {
            curArrSum += nums[i]
        } else {
            curArrSum = nums[i]
            subArrCount++
        }
    }
    return subArrCount
}
