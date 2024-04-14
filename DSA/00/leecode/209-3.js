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

    let leftIndex = 0,
    rightIndex = 0 // 1. 我们这里改成了从 0 开始
    let curSum = 0
    let minLen = Infinity
    while (rightIndex < len) {
        if (curSum >= target) {
            // 3. 同时要注意的是，此时的 rightIndex 是比 curSum 的
            // 右边界提前一格子的，因为 rightIndex++ 是在我们计算 minLen
            // 之后才变化的，所以这里不需要加 1
            minLen = Math.min(minLen, rightIndex - leftIndex)

            curSum -= nums[leftIndex]
            leftIndex++
        } else {
            // 2. 那么这里就可以先计算下标所在值
            // 然后再对下标 ++
            curSum += nums[rightIndex]
            rightIndex++
        }
    }

    // 5. 因为 while 循环中的 curSum 是在计算 minLen 后面更新的
    // 所以需要添加等号，这样当 curSum 更新后，才可以获得
    // 新的 minLen 值
    while (curSum >= target) {
        // 4. 同理，当前面的循环出来后，这里的 rightIndex 其实等于 len
        // 的大小，所以不需要 +1
        minLen = Math.min(minLen, rightIndex - leftIndex)

        curSum -= nums[leftIndex]
        leftIndex++
    }

    return minLen === Infinity ? 0 : minLen
}
