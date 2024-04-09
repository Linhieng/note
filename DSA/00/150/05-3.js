
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    nums.sort((a, b) => b-a)
    let len = nums.length
    return nums[~~(len/2)]
};
