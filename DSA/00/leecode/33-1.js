/**
 * 旋转点将数组一分为二，长的那部分旋转后占据一半长度，这一半长度就是有序的。
 * 所以，二分时就是判断哪一半是有序的。
 *
 * 不要想着直接不用判断左右哪边有序，试试测试用例：
 *  [6,7,1,2,3,4,5]、[5, 1, 3] 就知道了
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    let len = nums.length
    let leftIndex = 0,
        rightIndex = len - 1

    while (leftIndex <= rightIndex) {
        let mid = leftIndex + (rightIndex - leftIndex >> 1)
        if (target === nums[mid]) {
            return mid
        }
        if (nums[mid] <= nums[rightIndex]) { // 右边有序
            if (nums[mid] < target && target <= nums[rightIndex]) {
                leftIndex = mid + 1
            } else {
                rightIndex = mid - 1
            }
        } else { // 左边有序。
            if (nums[leftIndex] <= target && target < nums[mid]) {
                rightIndex = mid - 1
            } else {
                leftIndex = mid + 1
            }
        }
    }
    return -1
}
