function findPeakElement( nums ) {
    let left = 0
    let right = nums.length - 1

    // 长度小于 2 时直接不会进入
    while (left < right) {
        const mid = left + right >> 1
        // 找峰值
        if (nums[mid] > nums[mid + 1]) {
            // 哪边高往哪边走
            right = mid
        } else {
            // 此时 mid 肯定不满足峰值，所以直接 +1
            left = mid + 1
        }
    }
    return left
}




function findPeakElement( nums ) {
    let left = 0
    let right = nums.length - 1

    while (left < right) {
        // 换成向上取整
        const mid = 1 + left + right >> 1
        // 那么 mid 就可以等于右边界
        // 所以这里要 - 1
        if (nums[mid] > nums[mid - 1]) {
            // 哪边高往哪边走
            left = mid
        } else {
            // 此时 mid 肯定不满足峰值，所以直接 +1
            right = mid - 1
        }
    }
    return left
}
