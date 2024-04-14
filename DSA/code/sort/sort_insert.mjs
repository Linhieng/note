/**
 * 插入排序
 * @param {number[]} nums
 * @returns {number[]}
 */
export default function insertSort(nums) {
    const n = nums.length
    for (let i = 1; i < n; i++) {
        for (let j = i; j > 0; j--) {
            if (nums[j] < nums[j-1]) {
                [nums[j], nums[j-1]] = [nums[j-1], nums[j]]
            } else {
                break
            }
        }
    }
    return nums
}
