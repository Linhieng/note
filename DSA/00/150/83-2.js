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
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function (root) {
    const queue = [root]
    const ans = []
    while (queue.length > 0) {
        let size = queue.length
        let average = 0
        let averageLen = size
        while (size > 0) {
            size--
            const node = queue.shift()
            average += node.val

            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        ans.push((average / averageLen).toFixed(5))
    }
    return ans
}
