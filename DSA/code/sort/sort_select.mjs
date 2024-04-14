/**
 * 选择排序
 * @param {number[]} nums
 * @returns {number[]}
 */
export default function selectSort(nums) {
    const n = nums.length
    for (let i = 0; i < n - 1; i++) {
        let minVal = nums[i]
        let minIndex = i
        for (let j = i + 1; j < n; j++) {
            if (nums[j] < minVal) {
                // 也可以每次都直接与 nums[i] 交换
                minVal = nums[j]
                minIndex = j
            }
        }
        [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
    }
    return nums
}
