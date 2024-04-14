/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let i, j,
        len = nums.length
    for (i = 0; i < len - 1; i++) {
        for (j = 1; j < len; j++) {
            if (i !== j && nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
    return []
}
