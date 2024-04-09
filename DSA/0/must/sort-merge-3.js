function merge_sort(arr, leftIndex, rightIndex) {
    // 注意这里是要有等号的！所以还是使用 !(leftIndex < rightIndex) 比较好！
    if (rightIndex <= leftIndex) {
        return
    }

    let mid = leftIndex + rightIndex >> 1
    let p1 = leftIndex
    let p2 = mid + 1
    // p1 和 p2 指的是两端各自的起点。所以命名时
    // 还是使用 leftStart 和 rightStart 比较好！
    merge_sort(arr, p1, mid)
    merge_sort(arr, p2, rightIndex)

    const tmp = []
    let t = 0
    while (p1 <= mid && p2 <= rightIndex) {
        if (arr[p1] <= arr[p2]) {
            tmp[t++] = arr[p1++]
        } else {
            tmp[t++] = arr[p2++]
        }
    }
    while (p1 <= mid) {
        tmp[t++] = arr[p1++]
    }
    while (p2 <= rightIndex) {
        tmp[t++] = arr[p2++]
    }

    tmp.forEach((v, t) => {
        arr[t + leftIndex] = v
    })

}

let buf = ''
process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (chunk) buf += chunk.toString()
})
process.stdin.on('end', () => {
    const arr = buf.split('\n')[1].split(' ').map(v => Number(v))
    merge_sort(arr, 0, arr.length - 1)
    console.log(arr.join(' '))
})
