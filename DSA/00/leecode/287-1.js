/**
 * 二分。
 *
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
    let left = 1,
        right = nums.length

    while (left < right) {
        let mid = left + right >>> 1
        let count = 0
        nums.forEach(num => {
            if (num <= mid) count++
        })
        if (count <= mid) {
            left = mid + 1
        } else {
            right = mid
        }
    }
    return left

}
