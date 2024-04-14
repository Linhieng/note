/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {

    let rootIndex = ~~((nums.length - 1) / 2)
    let root = new TreeNode(nums[rootIndex])

    const stack = [[root, 0, nums.length - 1]]

    while (stack.length > 0) {

        // leftIndex 和 rightIndex 表示当前 node 所能处理的下标边界（包含）
        const [node, leftIndex, rightIndex] = stack.pop()

        // 当 node 发现自己能控制的只有一个节点时，说明它就是叶子节点
        // 这里的情况后面其实处理了。所以这里可以省略
        // if (leftIndex >= rightIndex) continue

        // node 本身的下标
        const headIndex = ~~((rightIndex + leftIndex) / 2)

        // 处理 node 的左子树
        if (leftIndex < headIndex) {
            // 左子树下标
            const leftHeadIndex = ~~((leftIndex + headIndex-1) / 2)
            node.left = new TreeNode(nums[leftHeadIndex])
            stack.push([node.left, leftIndex, headIndex - 1])
        }

        // 处理 node 的右子树
        if (headIndex < rightIndex) {
            // 右子树下标
            const rightHeadIndex = ~~((headIndex+1 + rightIndex) / 2)
            node.right = new TreeNode(nums[rightHeadIndex])
            stack.push([node.right, headIndex + 1, rightIndex])
        }
    }

    return root
}
