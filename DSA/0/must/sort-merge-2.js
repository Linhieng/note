function merge_sort(nums, leftIndex, rightIndex) {
    if (leftIndex >= rightIndex) {
        return
    }

    // 先二分划分。确保左右两半是有序的
    let mid = leftIndex + rightIndex >> 1
    let p1 = leftIndex
    let p2 = mid + 1
    merge_sort(nums, p1, mid)
    merge_sort(nums, p2, rightIndex)

    // 然后将两个有序的进行合并，这里借助额外的空间进行合并
    let tmp = []
    let tmpPoint = 0
    while (p1 <= mid && p2 <= rightIndex) {
        if (nums[p1] <= nums[p2]) {
            tmp[tmpPoint++] = nums[p1++]
        } else {
            tmp[tmpPoint++] = nums[p2++]
        }
    }
    while (p1 <= mid) {
        tmp[tmpPoint++] = nums[p1++]
    }
    // 这里拷贝粘贴时，记得修改 mid 为 rightindex
    while (p2 <= rightIndex) {
        tmp[tmpPoint++] = nums[p2++]
    }

    // 然后将合并好的数组填充到原数组中
    let p = leftIndex
    tmpPoint = 0
    while (p <= rightIndex) {
        nums[p++] = tmp[tmpPoint++]
    }

}

let buf = ''
process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (chunk) buf += chunk.toString()
})
process.stdin.on('end', () => {
    const inputs = []
    buf.split('\n').forEach(line => {
        inputs.push(line.split(' ').map(v => Number(v)))
    })
    const arr = inputs[1]
    merge_sort(arr, 0, arr.length - 1)
    console.log(arr.join(' '))

})
