/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 二分查找
 *
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
    if (!root) return 0

    let depth = 0
    let node = root
    // 获取深度
    while (node.left) {
        depth++
        node = node.left
    }

    let low = 1 << depth, // 最底层的最左侧
        high = (1 << (depth + 1)) - 1 // 最底层的最右侧
    while (low < high) {
        // 二分查找，判断第 mid 个节点是否存在
        const mid = low + Math.floor((high - low + 1) / 2)
        if (exists(root, depth, mid)) {
            low = mid
        } else {
            high = mid - 1
        }
    }
    return low

};

/**
 * 判断第 k 个节点是否在 depth 层中
 * 注意：调用 exists 时已经确保了 k 的范围是在 depth 层的有效范围
 */
function exists (root, depth, k) {
    // 第 depth 层有效的范围，即节点数量
    let bits = 1 << (depth - 1)
    let node = root
    while (node && bits > 0) {
        if (!(bits & k)) {
            node = node.left
        } else {
            node = node.right
        }
        bits >>= 1
    }
    return node !== null
}
