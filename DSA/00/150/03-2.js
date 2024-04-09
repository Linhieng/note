
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let set = new Set(nums)
    let notRepeat = Array.from(set)
    nums.forEach((_, i) => {
        nums[i] = notRepeat[i]
    })
    return notRepeat.length
};
