/**
 * @file 二项划分
 */
function swap(arr, i, j) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}

function quick_sort_partition (arr, num, leftIndex, rightIndex) {
    let lessAreaIndex = leftIndex - 1
    const partition_len = rightIndex - leftIndex + 1

    for (let i = 0; i < partition_len; i++) {
        if (arr[leftIndex + i] <= num) {
            lessAreaIndex += 1
            swap(arr, lessAreaIndex, leftIndex + i)
        }
    }
    return lessAreaIndex
}

function quick_sort(arr, leftIndex, rightIndex) {
    if (leftIndex >= rightIndex) return

    const x = arr[rightIndex]
    const lessAreaIndex = quick_sort_partition(arr, x, leftIndex,
        // 注意这里同样要再次 - 1，
        rightIndex - 1)

    swap(arr, lessAreaIndex + 1, rightIndex)

    quick_sort(arr, leftIndex, lessAreaIndex)
    quick_sort(arr, lessAreaIndex + 1, rightIndex)

}

function resolve(arr) {
    quick_sort(arr, 0, arr.length - 1)
    return arr
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
    console.log(resolve(inputs[1]).join(' '))
})
