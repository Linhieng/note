/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
var findRadius = function (houses, heaters) {
    let minRadius = 0
    houses.sort((a, b) => a - b)
    heaters.sort((a, b) => a - b)

    let distance = Infinity
    let heaterLen = heaters.length
    houses.forEach(house => {
        // 二分找到每一个房子的最近供暖器

        const closeIndex = left_boundary(heaters, house)
        let preHeater = closeIndex - 1 >= 0 ?
            house - heaters[closeIndex - 1] :
            Infinity
        let nextHeater = closeIndex < heaterLen ?
            heaters[closeIndex] - house :
            Infinity
        distance = Math.min(preHeater, nextHeater)
        minRadius = Math.max(minRadius, distance)
    })
    return minRadius
}

function left_boundary(nums, target) {
    let leftIndex = 0,
        rightIndex = nums.length - 1
    while (leftIndex <= rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)
        if (nums[mid] === target) {
            leftIndex = mid
            break
        } else if (target < nums[mid]) {
            rightIndex = mid - 1
        } else {
            leftIndex = mid + 1
        }
    }
    return leftIndex
}
