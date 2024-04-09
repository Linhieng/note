/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    return [
        leftBoundary(nums, target),
        rightBoundary(nums, target),
    ]
}

function leftBoundary(arr, target) {
    const len = arr.length
    if (len < 1) return -1

    let leftIndex = 0
    let rightIndex = len - 1
    while (leftIndex < rightIndex) {
        let mid = leftIndex + rightIndex >> 1
        // 如果不熟悉是小于还出大于，那就不要直接简写，
        // 先把三种情况写出来，然后再合并
        if (arr[mid] === target) {
            rightIndex = mid
        } else if (arr[mid] < target) {
            leftIndex = mid + 1
        } else {
            rightIndex = mid
        }
    }
    return arr[leftIndex] === target ? leftIndex : -1
}

function rightBoundary(arr, target) {
    const len = arr.length
    if (len < 1) return -1

    let leftIndex = 0
    let rightIndex = len - 1
    while (leftIndex < rightIndex) {
        let mid = 1 + leftIndex + rightIndex >> 1
        if (arr[mid] === target) {
            leftIndex = mid
        } else if (arr[mid] < target) {
            // 这里加不加一都可以
            // 因为我们前面求 mid 时向上取整了
            // 所以不怕死循环
            leftIndex = mid + 1
        } else {
            rightIndex = mid - 1
        }
    }
    return arr[leftIndex] === target ? leftIndex : -1
}
