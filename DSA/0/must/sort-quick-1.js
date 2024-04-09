/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
    quick_sort(nums, 0, nums.length - 1)
    return nums
}

function quick_sort(nums, leftIndex, rightIndex) {
    if (!(leftIndex < rightIndex)) {
        return
    }

    const randomIndex = leftIndex + ~~(Math.random() * (rightIndex - leftIndex + 1))
    const [lessIndex, moreIndex] =
        partition(nums, leftIndex, rightIndex, nums[randomIndex])

    quick_sort(nums, leftIndex, lessIndex)
    quick_sort(nums, moreIndex, rightIndex)
}

function partition(nums, leftIndex, rightIndex, pivot) {
    let lessIndex = leftIndex
    let moreIndex = rightIndex
    let point = leftIndex

    // 为什么这里要加等号呢？
    // 是因为当 point 和 moreIndex 相同时
    // 我们还没有对当前 point 所在值进行比较，所以需要再进循环
    while (point <= moreIndex) {
        if (nums[point] === pivot) {
            point++
        } else if (nums[point] < pivot) {
            [nums[point], nums[lessIndex]] = [nums[lessIndex], nums[point]]
            lessIndex++
            point++
        } else {
            [nums[point], nums[moreIndex]] = [nums[moreIndex], nums[point]]
            moreIndex--
        }
    }
    // 因为在循环中是交换完后，再 ++ 或 -- 的
    // 所以除了循环后，要在最后一次的 ++ 和 -- 消除掉。
    return [lessIndex - 1, moreIndex + 1]

}
