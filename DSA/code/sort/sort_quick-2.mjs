/**
 * 三段划分，速度较快
 *
 * @param {number[]} nums
 * @return {number[]}
 */
export default function quickSort(nums) {
    quick_sort(nums, 0, nums.length - 1)
    return nums
};

function quick_sort(arr, left, right) {
    if (left >= right) return

    // 这里的下标可以随便取
    let pivotIndex = left + ~~(Math.random() * (right - left + 1))

    // 这里的 lessIndex 所在值，表示的是小于 pivot 的最右边那个值
    // 这里的 moreIndex 所在值，表示的是大于 pivot 的最左边那个值
    const [lessIndex, moreIndex] =
        partition(arr, left, right, arr[pivotIndex])

    quick_sort(arr, left, lessIndex)
    quick_sort(arr, moreIndex, right)
}
function partition(arr, left, right, pivot) {
    // 这里注意初始值直接就是下标，因为后面会直接赋值
    let lessIndex = left
    let moreIndex = right
    let p = left

    // 为什么这里要加等号呢？
    // 当 point 和 moreIndex 相等时
    // point 所在值还未进行比较。原因是 point 和 moreIndex
    // 都是在 if 比较后才变化的！
    while (p <= moreIndex) {
        if (arr[p] === pivot) {
            p++
        } else if (arr[p] < pivot) {
            [arr[p], arr[lessIndex]] = [arr[lessIndex], arr[p]]
            p++
            lessIndex++
        } else {
            [arr[p], arr[moreIndex]] = [arr[moreIndex], arr[p]]
            moreIndex--
        }
    }

    // 为什么这里要 - 1 和 + 1 呢？
    // 当循环中没有改变 lessIndex 和 moreIndex 时，
    // 说明当前 [left, right] 区间都是等于 pivot 的
    // 那么小于 pivot 和大于 pivot 的自然就是 left-1 和 right+1 了
    // 当循环中有改变 lessIndex 和 moreIndex 时，
    // 因为是在交换后再 +1 / -1 的，所以这里肯定需要消掉 +1/-1 的影响
    return [lessIndex - 1, moreIndex + 1]
}
