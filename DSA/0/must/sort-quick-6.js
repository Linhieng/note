/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    // 这里记得是 len - 1
    quick_sort(nums, 0, nums.length - 1)
    return nums
}

function quick_sort(arr, left, right) {
    // 递归时永远要记得设置终止条件！
    if (left >= right) {
        return
    }

    let pivot = arr[left]
    let i = left - 1
    let j = right + 1

    while (i < j) {
        do i++; while (arr[i] < pivot)
        do j--; while (arr[j] > pivot)
        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    // 此处的 i 和 j 不一定相同
    // 能保证的是 left..=j 或 left..i) 是小于等于 pivot 的
    // i..=right 或 (j..=right 是大于等于 pivot 的
    quick_sort(arr, left, j)
    quick_sort(arr, j + 1, right)
}
