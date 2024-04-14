/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    const len = nums.length

    let slow = 0,
        fast = 0
    let curSum = 0
    let minLen = Infinity
    while (fast < len) {
        curSum += nums[fast]
        while (curSum >= target) {
            minLen = Math.min(minLen, fast - slow + 1)
            curSum -= nums[slow]
            slow++
        }
        fast++
    }

    return minLen === Infinity ? 0 : minLen
}
