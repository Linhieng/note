/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 简单的想法，并不代表差，能一次 AC 就是好的！
 * 想要优化，那也得 AC 后再去优化！
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    // 创建出一个翻转后的二叉树
    const newRoot = new TreeNode(root.val)
    invert(root, newRoot)

    // 然后判断两棵树是否相同
    if (isSame(root, newRoot)) {
        return true
    } else {
        return false
    }
};

function isSame(root1, root2) {
    if (!root1 && !root2) return true
    if (!root1 || !root2) return false

    if (root1.val !== root2.val) return false

    return (
        isSame(root1.left, root2.left)
        &&
        isSame(root1.right, root2.right)
    )
}

function invert(root, newRoot) {
    if (!root) return null

    if (root.right) {
        newRoot.left = new TreeNode(root.right.val)
    }
    if (root.left) {
        newRoot.right = new TreeNode(root.left.val)
    }

    invert(root.left, newRoot.right)
    invert(root.right, newRoot.left)
}
