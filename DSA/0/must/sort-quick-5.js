function partition(nums, leftIndex, rightIndex, pivot) {
    let lessIndex = leftIndex
    let moreIndex = rightIndex
    let point = leftIndex

    // 这里要等号，因为相等时的情况还没判断过
    while (point <= moreIndex) {
        if (nums[point] === pivot) {
            point++
        } else if (nums[point] < pivot) {
            // 这里不要写错啊，写成了 leftIndex
            [nums[point], nums[lessIndex]] = [nums[lessIndex], nums[point]]
            lessIndex++
            point++
        } else {
            [nums[point], nums[moreIndex]] = [nums[moreIndex], nums[point]]
            moreIndex--
        }
    }
    return [lessIndex - 1, moreIndex + 1]
}

function quick_sort(nums, leftIndex, rightIndex) {
    if (leftIndex >= rightIndex) {
        return
    }

    let randomIndex = leftIndex + ~~(Math.random() * (rightIndex - leftIndex + 1))
    const [lessIndex, moreIndex] = partition(nums, leftIndex, rightIndex, nums[randomIndex])
    quick_sort(nums, leftIndex, lessIndex)
    quick_sort(nums, moreIndex, rightIndex)
}

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const inputs = []
rl.on('line', line => {
    // 输入这里，不要写错写成了 Number() 啊！
    inputs.push(line.split(' ').map(v => Number(v)))
})
rl.on('close', () => {
    const arr = inputs[1]
    quick_sort(arr, 0, arr.length - 1)
    console.log(arr.join(' '))
})
