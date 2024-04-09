function quick_sort(arr, leftIndex, rightIndex) {
    if (leftIndex >= rightIndex) return

    let x = arr[leftIndex]
    let leftPoint = leftIndex - 1
    let rightPoint = rightIndex + 1

    while (leftPoint < rightPoint) {
        do leftPoint++; while (arr[leftPoint] < x)
        do rightPoint--; while (x < arr[rightPoint])
        if (leftPoint < rightPoint) {
            let tmp = arr[leftPoint]
            arr[leftPoint] = arr[rightPoint]
            arr[rightPoint] = tmp
        }
    }

    quick_sort(arr, leftIndex, rightPoint)
    quick_sort(arr, rightPoint + 1, rightIndex)
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
