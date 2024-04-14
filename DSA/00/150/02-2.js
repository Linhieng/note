
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    // 思路：将匹配到的元素一个一个往后移到最后，然后返回下标
    let i = 0
    for(; i < nums.length;) {
        if (nums[i] === val) {
            nums.splice(i, 1)
        } else {
            i++
        }
    }
    return nums.length
};
