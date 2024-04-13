/**
 * 冒泡排序
 * @param {number[]} nums
 * @returns {number[]}
 */
export default function bubbleSort(nums) {
    const n = nums.length
    for (let i = n; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (nums[j-1] > nums[j]) {
                [nums[j-1], nums[j]] = [nums[j], nums[j-1]]
            }
        }
    }
    return nums
}
