/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    let repeat_map = new Map()
    for (const [i, num] of nums.entries())
    {
        if (repeat_map.has(num)) {
            if (i - repeat_map.get(num) <= k) {
                return true
            }
        }
        repeat_map.set(num, i)
    }
    return false
};
