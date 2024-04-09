function merge_sort(arr, leftIndex, rightIndex) {
    if (!(leftIndex < rightIndex)) {
        return
    }

    // 二分划分
    let mid = leftIndex + rightIndex >> 1

    let p1 = leftIndex
    let p2 = mid + 1
    merge_sort(arr, p1, mid)
    merge_sort(arr, p2, rightIndex)

    // 合并，2 -- 4 -- 8 -- 16 ...
    const tmp = []
    let tmpPoint = 0
    while (p1 <= mid && p2 <= rightIndex) {
        // 下标要写对，不要写成了 2 🚨
        // 这么看来，下标变量最好不要带数字，不然错了都不知道……
        if (arr[p1] <= arr[p2]) {
            tmp[tmpPoint++] = arr[p1++]
        } else {
            tmp[tmpPoint++] = arr[p2++]
        }
    }
    while (p1 <= mid) {
        tmp[tmpPoint++] = arr[p1++]
    }
    while (p2 <= rightIndex) {
        tmp[tmpPoint++] = arr[p2++]
    }

    // 合并好后拷贝到原数组
    for (p1 = leftIndex, tmpPoint = 0; p1 <= rightIndex;) {
        arr[p1++] = tmp[tmpPoint++]
    }

}

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const inputs = []
rl.on('line', line => {
    inputs.push(line.split(' ').map(v => Number(v)))
})
rl.on('close', () => {

    merge_sort(inputs[1], 0, inputs[1].length - 1)

    console.log(inputs[1].join(' '))
})
