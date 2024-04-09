function quick_sort(nums, leftIndex, rightIndex) {
    if (!(leftIndex < rightIndex)) {
        return
    }

    let i = leftIndex - 1
    let j = rightIndex + 1
    let pivot = nums[leftIndex]
    while (i < j) {
        do i++; while (nums[i] < pivot)
        do j--; while (nums[j] > pivot)
        if (i < j) {
            [nums[i], nums[j]] = [nums[j], nums[i]]
        }
    }

    quick_sort(nums, leftIndex, j)
    quick_sort(nums, j + 1, rightIndex)
}

function resolve(nums) {
    quick_sort(nums, 0, nums.length - 1)
    return nums
}

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const inputs = []
rl.on('line', (line) => {
    inputs.push(line.split(' ').map(v => Number(v)))
})
rl.on('close', () => {
    const res = resolve(inputs[1])
    console.log(res.join(' '))
})
