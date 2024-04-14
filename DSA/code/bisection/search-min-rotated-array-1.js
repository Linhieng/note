/**
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
        // 由于是对升序数组进行旋转，在纸上画一下就知道形状是下面这样的：
        //                  /
        //                 /
        //             -------------
        //                      /
        //                     /
        // 升序的数组进行旋转时，数组会被分为左右两段，而最低点就在
        // 右端的左边！当 nums[leftIndex] < nums[mid] 的时候，考虑下面这两种情况
        //  - 当 leftIndex 和 mid 都在左段时，我们需要让 leftIndex 往右移动。
        //  - 当 leftIndex 和 mid 都在右端时，却是让 rightIndex 往左移动。
        // 可以看到，同样的一个条件，却有不同的处理方式，这样子写出来的代码是很复杂的！
        if (nums[mid] === nums[rightIndex]) {
            // 这里应该是让 rightIndex--
            // 因为我们并不知道 leftIndex 的值是什么情况
            // 所以肯定不能操作 leftIndex
            rightIndex--
        } else if (nums[mid] < nums[rightIndex]) {
            // 我们这里先进行小于判断，是为了和我们的模版保持一致。
            // 这里的 mid 更小，说明 mid 肯定是目标值
            // 所以必须等于 mid，这是为了确保答案还在我们
            // 的 [left, right] 区间内！
            rightIndex = mid
        } else {
            // mid 更大，说明 mid 肯定不是最小值，
            // 所以可以直接 mid + 1
            leftIndex = mid + 1
        }
    }
    return nums[leftIndex]
}
module.exports = {
    minNumberInRotateArray: minNumberInRotateArray
}
