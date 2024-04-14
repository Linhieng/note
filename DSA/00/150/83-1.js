/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * DFS
 * @param {TreeNode} root
 * @return {number[]}
 */
var averageOfLevels = function(root) {

    const dfs = (root, level) => {
        if (!root) return

        if (level < totals.length) {
            totals[level] += root.val
            counts[level] += 1
        } else {
            totals.push(root.val)
            counts.push(1)
        }
        dfs(root.left, level + 1)
        dfs(root.right, level + 1)
    }

    // 第 i 个元素，代表第 i 层的节点数量、第 i 层的数值总和
    const counts = []
    const totals = []
    dfs(root, 0)
    return counts.map((count, i) => (totals[i] / count).toFixed(5))
};
