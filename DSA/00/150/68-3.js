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
 * @return {number}
 */
var maxDepth = function(root, curDepth=1) {
    if (!root) {
        // 当前是空节点，不算入深度，所以 - 1
        return curDepth - 1
    }
    let leftMaxDepth = maxDepth(root.left, curDepth + 1)
    let rightMaxDepth = maxDepth(root.right, curDepth + 1)
    return Math.max(leftMaxDepth, rightMaxDepth)
}
