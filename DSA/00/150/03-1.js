/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let set = new Set()
    let slow = 0,
        fast= 0
    while(fast < nums.length) {
        if (!set.has(nums[fast])) {
            nums[slow] = nums[fast]
            slow++
        }
        set.add(nums[fast])
        fast++ // 注意这个不要写在 add 前面
    }

    return slow // 注意这里不要加 1
};
