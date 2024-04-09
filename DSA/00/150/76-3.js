/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    if (!root) return false
    // 注意题目要求的是根节点到叶子节点，而不是存在这么一条路径
    if (!root.left && !root.right && root.val === targetSum) return true

    return (
        hasPathSum(root.left, targetSum - root.val)
        ||
        hasPathSum(root.right, targetSum - root.val)
    )
};
