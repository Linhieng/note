function mergeArray(arr, left, mid, right) {
    let i = left
    let j = mid + 1
    let tmp = []
    let count = 0
    while (i <= mid && j <= right) {
        // 这里记得加等号
        if (arr[i] <= arr[j]) {
            tmp.push(arr[i++])
        } else {
            tmp.push(arr[j++])
            // 由于 i..=mid 是递增的，所以当 nums[i] 大于
            // nums[j] 时，i..=mid 就都能和 nums[j] 组成逆序对
            count += mid - i + 1
        }
    }
    while (i <= mid) {
        tmp.push(arr[i++])
    }
    while (j <= right) {
        tmp.push(arr[j++])
    }

    // 在洛谷 OJ 中这里如果使用
    // arr.splice(left, right - left + 1, ...tmp)
    // 会报错
    tmp.forEach((v, i) => {
        arr[left + i] = v
    })
    return count
}

function reversePairs(record, left, right) {
    if (left >= right) {
        return 0
    }

    const mid = left + right >> 1
    return (
        reversePairs(record, left, mid) +
        reversePairs(record, mid + 1, right) +
        mergeArray(record, left, mid, right)
    )
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
    const arr = inputs[1]
    console.log(reversePairs(arr, 0, arr.length - 1))
})
