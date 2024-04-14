/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    return check(root, root)

};

function check (root1, root2) {
    const queue = [root1, root2]

    while (queue.length > 0) {
        root1 = queue.shift()
        root2 = queue.shift()

        if (!root1 && !root2) continue
        if (!root1 || !root2) return false
        if (root1.val !== root2.val) return false

        queue.push(root1.left)
        queue.push(root2.right)


        queue.push(root1.right)
        queue.push(root2.left)
    }

    return true
}
