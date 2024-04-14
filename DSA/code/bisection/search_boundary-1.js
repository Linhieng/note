/**
 * 使用二分模版
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    return [
        lowerBound(nums, target),
        higherBound(nums, target),
    ]
};

// 也可以是 leftBoundary
function lowerBound(arr, target) {
    let left = 0
    let right = arr.length

    while (left < right) {
        const mid = left + right >> 1
        // 虽然这里是将 大于和等于 的情况简写了
        // 但实际敲中，还是要先分三种情况，然后再合并！
        if (arr[mid] >= target) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    return arr[left] === target ? left : -1
}

// 也可以是 rightBoundary
function higherBound(arr, target) {
    let left = 0
    let right = arr.length

    while (left < right) {
        const mid = 1 + left + right >> 1
        // 虽然这里是将 小于和等于 的情况简写了
        // 但实际敲中，还是要先分三种情况，然后再合并！
        if (arr[mid] <= target) {
            left = mid
        } else {
            right = mid - 1
        }
    }
    return arr[left] === target ? left : -1
}
