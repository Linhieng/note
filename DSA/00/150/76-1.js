/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * BFS
 *
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
    if (!root) return false

    node_queue = [root]
    val_queue = [root.val]

    while (node_queue.length > 0) {
        let node = node_queue.shift()
        let curSumVal = val_queue.shift()

        if (!node.left && !node.right) {
            if (curSumVal === targetSum) return true
            continue
        }

        if (node.left) {
            node_queue.push(node.left)
            val_queue.push(curSumVal + node.left.val)
        }
        if (node.right) {
            node_queue.push(node.right)
            val_queue.push(curSumVal + node.right.val)
        }
    }
    return false
}
