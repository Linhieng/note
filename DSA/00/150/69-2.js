/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * DFS 非递归。代码长无所谓，重点是不要出错，而且易懂！
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (!p && !q) return true
    if (!p || !q) return false

    let p_queue = [p],
        q_queue = [q]

    while (p_queue.length > 0 && q_queue.length > 0) {

        let p_size = p_queue.length
        let q_size = q_queue.length

        if (p_size !== q_size) return false

        while (p_size > 0) {
            p_size -= 1

            let p_node = p_queue.shift()
            let q_node = q_queue.shift()

            // 节点值要相同
            if (p_node.val !== q_node.val) return false

            // 都 有/没有 左节点
            if (p_node.left && q_node.left) {
                p_queue.push(p_node.left)
                q_queue.push(q_node.left)
            } else if (p_node.left || q_node.left) {
                return false
            }

            // 都 有/没有 右节点
            if (p_node.right && q_node.right) {
                p_queue.push(p_node.right)
                q_queue.push(q_node.right)
            } else if (p_node.right || q_node.right) {
                return false
            }
        }
    }
    return true
};
