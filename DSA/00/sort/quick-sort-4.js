/**
 * @file 三项划分
 */
function quick_sort_partition(arr, num, leftIndex, rightIndex) {
    let lessIndex = leftIndex - 1
    let moreIndex = rightIndex + 1
    let point = leftIndex
    while (point < moreIndex) {
        if (arr[point] < num) {
            lessIndex++
            swap(arr, lessIndex, point)
            point++
        } else if (num < arr[point]) {
            moreIndex--
            swap(arr, moreIndex, point)
        } else {
            point++
        }
    }
    return [lessIndex, moreIndex]
}
function swap(arr, i, j) {
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
}
function quick_sort(arr, leftIndex, rightIndex) {
    if (leftIndex >= rightIndex) return

    let x = arr[rightIndex]
    let [lessIndex, moreIndex] = quick_sort_partition(arr, x, leftIndex, rightIndex - 1)

    swap(arr, lessIndex + 1, rightIndex)

    quick_sort(arr, leftIndex, lessIndex)
    quick_sort(arr, moreIndex, rightIndex)

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
