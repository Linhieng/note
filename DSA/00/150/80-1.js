/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * BFS 非递归
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
    if (!root) return 0

    let queue = [root]
    let count = 0
    while (queue.length > 0) {
        let curLevelSize = queue.length

        while (curLevelSize > 0) {
            curLevelSize--

            const node = queue.shift()
            count++

            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
    }
    return count
}
