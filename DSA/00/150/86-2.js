/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 二叉搜索树，中序遍历！
 *
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function(root) {

    const inOrder = (root) => {
        if (!root) return
        if (root.left) {
            inOrder(root.left)
        }
        if (pre !== undefined) {
            minDiff = Math.min(minDiff, Math.abs(root.val - pre))
        }
        pre = root.val
        inOrder(root.right)
    }
    let pre
    let minDiff = Infinity
    inOrder(root)
    return minDiff
};
