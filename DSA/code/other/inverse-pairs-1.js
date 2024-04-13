/**
 * 这个算法看似是归并，但实际上却会超时
 *
 * @param {number[]} record
 * @return {number}
 */
var reversePairs = function(record) {
    return mergeSortAndCountInverse(record, 0, record.length - 1)
};
function mergeSortAndCountInverse(nums, leftIndex, rightIndex) {
    if (leftIndex >= rightIndex) {
        return 0
    }

    const mid = leftIndex + rightIndex >> 1
    return (
        mergeSortAndCountInverse(nums, leftIndex, mid) +
        mergeSortAndCountInverse(nums, mid + 1, rightIndex) +
        countInMerge(nums, leftIndex, mid, rightIndex)
    )
}

function countInMerge(nums, leftIndex, mid, rightIndex) {
    let i = leftIndex
    let j = mid + 1
    let tmp = []
    let count = 0
    for (let t = leftIndex; t <= rightIndex; t++) {
        if (
            (j > rightIndex) ||
            (i <= mid && nums[i] <= nums[j])
        ) {
            tmp[t] = nums[ i++ ]
        } else {
            tmp[t] = nums[ j++ ]
            count += mid - i + 1
        }
    }
    for (let t = leftIndex; t <= rightIndex; t++) {
        nums[t] = tmp[t]
    }
    return count
}
