/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param nums int整型一维数组
 * @return int整型
 */
function findPeakElement(nums) {
    const len = nums.length

    let leftIndex = 0
    let rightIndex = len - 1

    while (leftIndex < rightIndex) {
        let mid = leftIndex + rightIndex >> 1

        // 哪边高往哪边走
        if (nums[mid] > nums[mid + 1]) {
            rightIndex = mid
        } else {
            leftIndex = mid + 1
        }
    }

    return rightIndex
}
module.exports = {
    findPeakElement: findPeakElement
}
