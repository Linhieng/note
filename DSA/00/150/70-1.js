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
 * @return {TreeNode}
 */
var invertTree = function (root) {
    // 4. 不要忘了递归肯定要有终止条件
    if (!root) return null

    // 1. 先翻转当前子节点
    let tmp = root.left
    root.left = root.right
    root.right = tmp

    // 2. 孙子节点交给后面的去翻转
    invertTree(root.left)
    invertTree(root.right)

    // 3. 然后返回翻转后的节点
    return root
}
