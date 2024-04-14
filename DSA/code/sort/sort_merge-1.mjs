/**
 * @param {number[]} nums
 * @return {number[]}
 */
export default function mergeSort(nums) {
    merge_sort(nums, 0, nums.length - 1)
    return nums
};

function merge_sort(arr, left, right) {
    if (left >= right) {
        return
    }

    // 二分
    const mid = left + right >> 1
    merge_sort(arr, left, mid)
    merge_sort(arr, mid+1, right)

    // 此时保证 [left, mid]
    // 和 [mid+1, right] 各自是有序的

    const tmp = []
    let l = left
    let r = mid + 1
    while (l <= mid && r <= right) {
        if (arr[l] <= arr[r]) {
            tmp.push(arr[l++])
        } else {
            tmp.push(arr[r++])
        }
    }
    while (l <= mid) tmp.push(arr[l++])
    while (r <= right) tmp.push(arr[r++])

    // 合并好后拷贝到原数组
    tmp.forEach((v, i) => {
        arr[left + i] = v
    })
}
