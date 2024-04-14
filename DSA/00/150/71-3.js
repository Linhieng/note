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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    return isSymmetric2(root, root)
};

function isSymmetric2(root1, root2) {
    // 只有当传入是根节点时，root1 和 root2 才想通
    // 根节点之后，root1 和 root2 就是不同的子树了。
    if (!root1 && !root2) return true
    if (!root1 || !root2) return false
    // 现在，root1 和 root2 肯定都不为空

    // 错误优先
    if (root1.val !== root2.val) return false

    return (
        isSymmetric2(root1.left, root2.right)
        &&
        isSymmetric2(root1.right, root2.left)
    )

}
