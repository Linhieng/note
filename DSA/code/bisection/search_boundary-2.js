/**
 * 这个，是用来检验你的学习成果的！
 *
 * @param {number[]} arr
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(arr, target) {
    let left = 0
    let right = arr.length

    while (left < right) {
        const mid = left + right >> 1
        if (arr[mid] >= target) {
            right = mid
        } else {
            left = mid + 1
        }
    }

    if (arr[left] !== target) return [-1, -1]
    const ans = [left]

    // 第一个注意点，这里只需要变更 right
    right = arr.length
    while (left < right) {
        // 第二个注意点，这里记得向上取整
        const mid = 1 + left + right >> 1

        // 第三个注意点，这里只需要判断等于的情况
        if (arr[mid] === target) {
            left = mid
        } else {
            // 第五个注意点，这里肯定是大于的情况
            right = mid - 1
        }
    }

    ans.push(left)
    return ans
};
