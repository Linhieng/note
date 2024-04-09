/** 忐忐忑忑地提交，一把 AC 🎈
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param nums int整型一维数组
 * @return int整型
 */
function minNumberInRotateArray( nums ) {
    const len = nums.length
    if (len < 2) return nums[0]

    let leftIndex = 0
    let rightIndex = len - 1
    while (leftIndex < rightIndex) {
        let mid = leftIndex + rightIndex >> 1
        // 这里为什么选择 rightIndex 呢？
        // 原因是数组是非降序的，所以最小值肯定是往
        // 左边找。那么优先想到的就应该是先从右边收缩
        if (nums[mid] === nums[rightIndex]) {
            rightIndex--
        } else if (nums[mid] < nums[rightIndex]) {
            rightIndex = mid
        } else {
            leftIndex = mid + 1
        }
    }
    return nums[leftIndex]
}
module.exports = {
    minNumberInRotateArray : minNumberInRotateArray
};
