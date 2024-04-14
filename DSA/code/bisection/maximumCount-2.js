/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumCount = function(nums) {
    let neg = lowerBound(nums, 0)
    let pos = lowerBound(nums, 1)
    // 因为是长度 - 下标，所以不需要加 1
    return Math.max(neg, nums.length - pos)
};

/**
 * 这个函数的代码本身很简单，重点在于理解该函数的返回值
 * 的含义是什么！
 * 当 arr 中存在 val 时，返回的是 val 在其中的最左边界
 * 当 arr 中不存在 val 时，返回的是 val 应该插入的位置下标
 * 比如，val 是 arr 中的最小值，那么它应该插入的位置下标就是 0
 * 再比如，val 是最大值，那么它应该插入的位置下标就是 arr.length
 */
function lowerBound(arr, val) {
    if (arr.length < 1) return 0
    let l = 0
    // 这里的 r 不是下标，而是长度
    // 因为我们后面的二分模版，可能的取值是 [l, r]
    // 而我们的答案确实可能取到长度值 length
    // 所以这里的 r 初始值为 length ！
    let r = arr.length
    while (l < r) {
        const m = l + r >> 1
        if (arr[m] >= val) {
            r = m
        } else {
            l = m + 1
        }
    }
    return l
}
