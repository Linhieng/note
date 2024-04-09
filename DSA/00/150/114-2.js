/**
 * 这里是根据自己思路写的，虽不如答案简洁，但重点在于理解！
 * 熟悉后自然可以合并成答案的那样子
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let leftIndex = 0,
        rightIndex = nums.length - 1


    while (leftIndex < rightIndex) {
        // 还可以继续二分

        const mid = ~~((leftIndex + rightIndex) / 2)
        if (nums[mid] === target) {
            return mid
        }
        if (nums[mid] < target) {
            leftIndex = mid + 1
        } else {
            rightIndex = mid - 1
        }
    }

    // 找到尽头了，现在只剩下一个值还没匹配
    if (nums[leftIndex] === target) {
        return leftIndex
    }
    if (target < nums[leftIndex]) {
        return leftIndex
    }
    if (nums[leftIndex] < target) {
        return leftIndex + 1
    }
}
