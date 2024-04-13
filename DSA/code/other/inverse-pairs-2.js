function reversePairs(record) {
    let ans = 0
    mergeSort(record, 0, record.length - 1)
    return ans


    function mergeSort(arr, left, right) {
        if (left >= right) {
            return
        }

        const mid = left + right >> 1
        mergeSort(arr, left, mid)
        mergeSort(arr, mid + 1, right)
        mergeArray(arr, left, mid, right)
    }

    function mergeArray(arr, left, mid, right) {
        let i = left
        let j = mid + 1
        let tmp = []
        while (i <= mid && j <= right) {
            // 这里记得加等号
            if (arr[i] <= arr[j]) {
                tmp.push(arr[i++])
            } else {
                tmp.push(arr[j++])
                // 由于 i..=mid 是递增的，所以当 nums[i] 大于
                // nums[j] 时，i..=mid 就都能和 nums[j] 组成逆序对
                ans += mid - i + 1
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
    const arr = inputs[1]
    console.log(reversePairs(arr))
})
