/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 非递归中序遍历
 *
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
    if (!root) return

    const stack = []
    let point = root
    let minDiff = Infinity
    let pre
    // 当 point 不为空时，也可以继续进入！
    while (stack.length > 0 || point) {
        if (point) {
            // 不断地将左边界入栈
            stack.push(point)
            point = point.left
        } else {
            // 一个节点即是左节点，同时也是头结点。
            // 由于最左节点是最后入栈的，头节点是晚入栈的，
            // 所以出栈时,先出的是左节点
            point = stack.pop()

            if (pre !== undefined) {
                minDiff = Math.min(minDiff, Math.abs(pre - point.val))
            }
            pre = point.val

            // 左节点和头结点都处理后,才可以处理右节点
            point = point.right
        }
    }
    return minDiff
}
