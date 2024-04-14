/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * morris 中序遍历
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function (root) {
    if (!root) return false

    let cur = root
    let count = 0
    while (cur) {

        if (cur.left) {
            // 这里的 while 目的找到左←子树上的最右节点
            let mostRight = cur.left
            while (mostRight.right && mostRight.right !== cur) {
                mostRight = mostRight.right
            }

            if (!mostRight.right) {
                // 第一次到达尽头，于是搭建一条桥梁
                mostRight.right = cur
                // 然后直接跳到左子树上，等会我们可以通过刚刚搭建的桥梁
                // 重新回到头节点
                cur = cur.left
                continue
            }
            // 第二次到达尽头，我们需要把桥梁拆掉，不打扰到原结构。
            mostRight.right = null
        }
        count++
        cur = cur.right // 这里可能是是在走我们的刚刚搭建的桥梁
    }
    return count
}
