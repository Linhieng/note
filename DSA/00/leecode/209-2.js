/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    const len = nums.length
    if (len < 1) {
        return nums[0] && nums[0] >= target ? 1 : 0
    }

    let leftIndex = 0
    // 这里设置成 -1 是不合适的。但在不合适的情况下同样能 AC，也是一种锻炼！
    let rightIndex = -1
    let curSum = 0
    let minLen = Infinity

    // 2. 因为 rightIndex 是作为下标，所以肯定不可以相等！
    // 这里也同理，答案不对时，不要想着改成 <= 。而是应该重新思考
    // 逻辑是否正确，或者哪里的条件没考虑到。
    while (rightIndex < len) {
        if (curSum >= target) {
            // 1. 既然这里是根据两个下标计算长度，那么肯定就是要 +1 的
            // 如果 +1 后答案不对，那应该重新检查逻辑，而不是取消
            // 这里的 +1
            minLen = Math.min(minLen, rightIndex - leftIndex + 1)

            // 4. 因为 leftIndex 是下标，而且是从 0 开始的，
            // 所以这里应该先减去下标对应值，然后再让左边界移动
            curSum -= nums[leftIndex]
            leftIndex++
        } else {
            rightIndex++
            // 3. 于是我们发现是这里错误了。
            // 因为 ++ 在前面，会导致这里越界，所以我们这里需要判断一下
            if (rightIndex < len) {
                curSum += nums[rightIndex]
            }
        }
    }


    // 这一段代码是第一次 AC 后残留下来的，当时没注意
    // 当重新理清一遍思路后回看这段代码，就会发现这段代码是不合适的。
    // 首先，这里的 while 一定是需要等号的，因为就是 curSum 是在 minLen 后面
    // 更新的，所以当 curSum 更新后，我们还需要再次更新 minLen 的值
    // 那么这里就一定是需要添加等号的！
    // 然后，当我发现不添加等号时也能成功 AC，那是不是说明刚刚的推理是错误的呢？
    // 不不不，这切切说明这一段代码无用的！因为 curSum 和 target 相等的情况
    // 已经被前面处理好了，所以这里的处理完全是多余的！将其注释掉
    // 后就会发现同样可以 AC！
    // while (curSum > target) {
    //     minLen = Math.min(minLen, rightIndex - leftIndex + 1)
    //     curSum -= nums[leftIndex]
    //     leftIndex++
    // }

    return minLen === Infinity ? 0 : minLen
}
