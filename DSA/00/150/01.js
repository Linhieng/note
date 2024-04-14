/*
给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，
另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
*/
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let point1 = 0,
        point2 = 0,
        nums1Length = m,
        lastIndex = m+n-1
    while (point1 < m + n && point2 < n) {
        if (point1 < nums1Length && nums1[point1] < nums2[point2]) {
            point1 ++
        } else {
            nums1.splice(lastIndex, 1)
            nums1.splice(point1, 0, nums2[point2])
            nums1Length++
            point1 ++
            point2 ++
        }
    }
}
