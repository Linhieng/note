function quick_sort(arr, left, right) {
    if (left >= right) return

    // 2. 那么这个 x 就不能选取 arr[right]
    // 4. 那么这里的 x 就应该是 arr[left + right + 1 >>> 1]
    let x = arr[left]
    let i = left - 1
    let j = right + 1

    while (i < j) {
        do i++; while (arr[i] < x)
        do j--; while (arr[j] > x)
        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    // 1. 这里如果使用的是 j 和 j + 1
    // 3. 同理，如果这里取 i - 1 和 i
    quick_sort(arr, left, j)
    quick_sort(arr, j + 1, right)
}

function resolve(arr) {

    quick_sort(arr, 0, arr.length - 1)

    return arr
}
