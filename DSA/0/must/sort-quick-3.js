function partition(nums, leftIndex, rightIndex, pivot) {
    let lessIndex = leftIndex
    let moreIndex = rightIndex
    let point = leftIndex

    // 这里记得要相等。当 point 和 moreIndex 相等时
    // point 所在值还未进行比较。原因是 point 和 moreIndex
    // 是在比较后才变化的！
    while (point <= moreIndex) {
        if (nums[point] === pivot) {
            point++
        } else if (nums[point] < pivot) {
            [nums[point], nums[lessIndex]] = [nums[lessIndex], nums[point]]
            point++
            lessIndex++
        } else {
            [nums[point], nums[moreIndex]] = [nums[moreIndex], nums[point]]
            moreIndex--
        }
    }
    return [lessIndex - 1, moreIndex + 1]
}

function quick_sort(nums, leftIndex, rightIndex) {
    if (!(leftIndex < rightIndex)) {
        return
    }

    let randomIndex = leftIndex + ~~(Math.random() * (rightIndex - leftIndex + 1))
    // 划分返回的边界，应该是包含小于或大于 pivot 的
    const [lessIndex, moreIndex] = partition(nums, leftIndex, rightIndex, nums[randomIndex])
    quick_sort(nums, leftIndex, lessIndex)
    quick_sort(nums, moreIndex, rightIndex)
}

function resolve(nums) {
    // 这里传递的第二个参数是下标，不是长度！
    quick_sort(nums, 0, nums.length - 1)
    return nums
}

// 创建readline接口
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
let inputs = []
rl.on('line', (input) => {
    inputs.push(input.split(' ').map(v => Number(v)))
})
rl.on('close', () => {
    const res = resolve(inputs[1])
    console.log(res.join(' '))
})
