/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 有点杀鸡焉用牛刀了，因为二叉树也最多就两个“出度”
 *
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
    if (!root) return 0

    const stack = [root]
    const seen = new Set([root])
    let count = 1
    while (stack.length > 0) {
        const node = stack.pop()

        if (node.left && !seen.has(node.left)) {
            count++
            stack.push(node, node.left)
            seen.add(node.left)
            continue
        }
        if (node.right && !seen.has(node.right)) {
            count++
            stack.push(node, node.right)
            seen.add(node.right)
            continue
        }
    }
    return count
}
