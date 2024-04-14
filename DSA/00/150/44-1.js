/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const map = new Map()
    for (const [i, num] of nums.entries()) {
        if (map.has(num)) {
            return [map.get(num), i]
        } else {
            map.set(target - num, i)
        }
    }
    return []
}
