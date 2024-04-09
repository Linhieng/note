/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 *
 * @param nums int整型一维数组
 * @return int整型
 */
function minNumberInRotateArray(nums) {
    const len = nums.length
    let leftIndex = 0
    let rightIndex = len - 1

    while (leftIndex < rightIndex) {
        let mid = leftIndex + rightIndex >> 1
        // 为什么这里是与 rightIndex 进行判断呢？
        // 可以使用 leftIndex 进行判断吗？答案是不推荐！
        // 原因在于数组是非降序的，那我们就当成是升序
        // 由于是对升序数组进行旋转，在纸上画一下就知道
        // 升序的数组进行旋转时，数组会被分为左右两段，而最低点就在
        // 右端的左边！当 nums[leftIndex] < nums[mid] 的时候，考虑下面这两种情况
        //  - 当 leftIndex 和 mid 都在左段，此时我们需要让 leftIndex 往右移动。
        //  - 当 leftIndex 和 mid 都在右端时，此时需要让 rightIndex 往左移动。
        // 可以看到，同样的一个条件，却有不同的处理方式，这样子写出来的代码是很复杂的！
        if (nums[mid] === nums[rightIndex]) {
            // 这里应该是让 rightIndex--
            // 因为我们并不知道 leftIndex 的值是什么情况
            // 所以肯定不能操作 leftIndex
            rightIndex--
        } else if (nums[mid] < nums[rightIndex]) {
            // 我们这里先进行小于判断，是为了和我们的模版
            // 保持一致，因为当 mid 小于右边时，mid 可能是答案
            // 那么我们这里就可以直接等于 mid
            rightIndex = mid
        } else {
            leftIndex = mid + 1
        }
    }
    return nums[leftIndex]
}
module.exports = {
    minNumberInRotateArray: minNumberInRotateArray
}
