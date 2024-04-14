/**
 * 选择排序
 * @param {number[]} nums
 * @returns {number[]}
 */
export default function selectSort(nums) {
    const n = nums.length
    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[j] < nums[i]) {
                [nums[i], nums[j]] = [nums[j], nums[i]]
            }
        }
    }
    return nums
}
