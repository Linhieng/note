/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 递归
 *
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    if (nums.length < 1) return null

    let rootIndex = ~~((nums.length - 1) / 2)
    let root = new TreeNode(nums[rootIndex])

    root.left = sortedArrayToBST(nums.slice(0, rootIndex))
    root.right = sortedArrayToBST(nums.slice(rootIndex + 1))

    return root
}
