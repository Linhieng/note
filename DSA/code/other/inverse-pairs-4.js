/* 没想到今天洛谷一把 AC 我真🎈 */
let buf = ''
process.stdin.on('readable', () => {
    const chunk = process.stdin.read()
    if (chunk) buf += chunk.toString()
})
process.stdin.on('end', () => {
    const arr = buf.split('\n')[1].split(' ').map(v => Number(v))
    let ans = 0
    merge_sort(arr, 0, arr.length - 1)
    console.log(ans)

    function merge_sort(arr, leftIndex, rightIndex) {
        if (!(leftIndex < rightIndex)) return

        let mid = leftIndex + rightIndex >> 1
        let startLeft = leftIndex
        let startRight = mid + 1
        merge_sort(arr, startLeft, mid)
        merge_sort(arr, startRight, rightIndex)

        let tmp = []
        while (startLeft <= mid && startRight <= rightIndex) {
            if (arr[startLeft] <= arr[startRight]) {
                // 不要忘记++
                tmp.push(arr[startLeft++])
            } else {
                // 当 arr[startLeft] 与 arr[startRight] 是一对逆序对时
                // 能够能够保证 startLeft..=mid 之间的所有元素和
                // arr[startRight] 也是一对逆序对，所以直接加上这个数量
                ans += mid - startLeft + 1
                tmp.push(arr[startRight++])
            }
        }
        while (startLeft <= mid) tmp.push(arr[startLeft++])
        while (startRight <= rightIndex) tmp.push(arr[startRight++])

        tmp.forEach((v, i) => {
            arr[i + leftIndex] = v
        })
    }
})
