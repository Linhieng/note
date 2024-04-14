/**
 * ❌ 未通过
 * @param {number[]} nums
 * @return {number}
 */
// var findMin = function (nums) {
//     let len = nums.length
//     let leftIndex = 0,
//         rightIndex = len - 1
//     if (nums[0] < nums[len - 1]) {
//         return nums[0]
//     }

//     while (leftIndex + 1 < rightIndex) {
//         let mid = leftIndex + (rightIndex - leftIndex >> 1)
//         if (nums[leftIndex] === nums[mid]) {
//             leftIndex++
//         } else if (nums[leftIndex] < nums[mid]) {
//             leftIndex = mid
//         } else {
//             rightIndex = mid
//         }
//     }
//     return Math.min(nums[leftIndex], nums[rightIndex])
// }
