/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    // 思路：双指针，把后面的元素移到前面。
    let left = 0,
        right = nums.length - 1,
        len = 0
    while (left <= right) {
        if (nums[left] !== val && nums[right] === val) {
            left++
            right--
            len++
        } else if (nums[left] === val && nums[right] === val) {
            right--
        } else if (nums[left] !== val && nums[right] !== val) {
            left++
            len++ // 注意这里是只加一个，因为 right 没有动
        } else { // nums[left] === val) && nums[right] !== val
            nums[left] = nums[right]
            left++
            right--
            len++
        }
    }
    return len
};
